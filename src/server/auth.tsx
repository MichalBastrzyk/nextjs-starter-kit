import ResetPasswordEmail from "@/emails/reset-password-email"
import { render } from "@react-email/components"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

import { tryCatch } from "@/lib/try-catch"

import { db } from "@/server/db"
import {
  accountsTable,
  sessionsTable,
  usersTable,
  verificationTable,
} from "@/server/db/schema"

import { env } from "@/env"

import { sendEmail } from "./mailer"

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
  },
})
