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
import ChangeEmailMail from "@/emails/email-change-mail"
import ResetPasswordMail from "@/emails/reset-password-mail"
import VerifyEmailMail from "@/emails/verify-email-mail"

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

  // User Specific Configuration
  user: {
    deleteUser: { enabled: true },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url }) => {
        const emailHtml = await render(
          <ChangeEmailMail user={{ ...user, newEmail }} verifyEmailLink={url} />
        )

        const { data, error } = await tryCatch(
          sendEmail({
            to: user.email,
            subject: "Verify change of email address.",
            html: emailHtml,
          })
        )

        if (error) {
          console.error(
            "[AUTH] Error sending change email verification: ",
            error
          )
          return
        }

        console.log("[AUTH] Change email verification sent", data)
      },
    },
  },

  // Auth Providers configuration
  emailAndPassword: {
    enabled: true,
    sendResetPasswordEmail: true,
    sendResetPassword: async ({ user, url }) => {
      const emailHtml = await render(
        <ResetPasswordMail user={user} resetPasswordLink={url} />
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
        <VerifyEmailMail user={user} verifyEmailLink={url} />
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
