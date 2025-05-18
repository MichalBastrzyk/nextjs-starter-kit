import { render } from "@react-email/components"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { admin as adminPlugin } from "better-auth/plugins"
import { eq } from "drizzle-orm"

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
import { stripe } from "./stripe"

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

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          // Create a Stripe customer for the user after they sign up
          // and store their Stripe customer ID in the database for later use
          const newCustomer = await stripe.customers.create({
            email: user.email,
            metadata: {
              userId: user.id,
            },
          })

          await db
            .update(usersTable)
            .set({ stripeCustomerId: newCustomer.id })
            .where(eq(usersTable.id, user.id))
        },
      },
    },
  },

  plugins: [
    // Toggle this if you want to use the anonymous plugin
    // It can be usefull when you want to allow users to use the app without signing in
    // Or for example, to allow users to add items to a cart without signing in
    // anonymousPlugin(),
    adminPlugin({
      ac,
      roles: {
        admin,
      },
    }),
  ],

  // User Specific Configuration
  user: {
    additionalFields: {
      stripeCustomerId: {
        type: "string",
        unique: true,
      },
    },
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
