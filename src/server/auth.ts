import { cache } from "react"
import { headers } from "next/headers"

import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

import { db } from "@/server/db"
import {
  accountsTable,
  sessionsTable,
  usersTable,
  verificationTable,
} from "@/server/db/schema"

import { env } from "@/env"

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
  },
})
