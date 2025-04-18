import { render } from "@react-email/components"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { admin as adminPlugin } from "better-auth/plugins"

import { tryCatch } from "@/lib/try-catch"

import { db } from "@/server/db"
import {
  accountsTable,
  sessionsTable,
  usersTable,
  verificationTable,
} from "@/server/db/schema"
import ResetPasswordEmail from "@/emails/reset-password-email"
import VerifyEmailEmail from "@/emails/verify-email-email"

import { env } from "@/env"

import { sendEmail } from "./mailer"
import { ac, admin } from "./permissions"

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  url: env.NEXT_PUBLIC_BETTER_AUTH_URL,

  // Database adapter
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: usersTable,
      session: sessionsTable,
      account: accountsTable,
      verification: verificationTable,
    },
  }),

  plugins: [
    adminPlugin({
      ac,
      roles: {
        admin,
      },
    }),
  ],

  // Auth Providers configuration
  emailAndPassword: {
    enabled: true,
    sendResetPasswordEmail: true,
    sendResetPassword: async ({ user, url }) => {
      const emailHtml = await render(
        <ResetPasswordEmail user={user} resetPasswordLink={url} />
      )

      const { data, error } = await tryCatch(
        sendEmail({
          to: user.email,
          subject: "Reset your password",
          html: emailHtml,
        })
      )

      if (error) {
        console.error("[AUTH] Error sending reset password email: ", error)
        return
      }

      console.log("[AUTH] Reset password email sent", data)
    },
    requireEmailVerification: true,
  },
  emailVerification: {
    enabled: true,
    sendVerificationEmail: async ({ user, url }) => {
      const emailHtml = await render(
        <VerifyEmailEmail user={user} verifyEmailLink={url} />
      )

      const { data, error } = await tryCatch(
        sendEmail({
          to: user.email,
          subject: "Verify your email address",
          html: emailHtml,
        })
      )

      if (error) {
        console.error("[AUTH] Error sending verification email: ", error)
        return
      }

      console.log("[AUTH] Verification email sent", data)
    },
  },
})
