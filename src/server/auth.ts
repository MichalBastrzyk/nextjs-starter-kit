import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { admin as adminPlugin } from "better-auth/plugins"
import { eq } from "drizzle-orm"

import { db } from "@/server/db"
import {
  accountsTable,
  sessionsTable,
  usersTable,
  verificationTable,
} from "@/server/db/schema"

import { env } from "@/env"

import { afterAuthMiddleware } from "./auth-middlware"
import { sendNotification } from "./notifications"
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

  hooks: {
    after: afterAuthMiddleware,
  },

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
      sendChangeEmailVerification: async ({ user, newEmail, url }) =>
        void (await sendNotification("CHANGE_EMAIL", {
          user,
          newEmail,
          verifyEmailLink: url,
        })),
    },
  },

  // Auth Providers configuration
  emailAndPassword: {
    enabled: true,
    sendResetPasswordEmail: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) =>
      void (await sendNotification("RESET_PASSWORD", {
        user,
        resetPasswordLink: url,
      })),
  },
  emailVerification: {
    enabled: true,
    sendVerificationEmail: async ({ user, url }) =>
      void (await sendNotification("VERIFY_EMAIL", {
        user,
        verifyEmailLink: url,
      })),
  },
})
