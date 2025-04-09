import { adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

import { ac, admin } from "@/server/permissions"

import { env } from "@/env"

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [adminClient({ ac, roles: { admin } })],
})
