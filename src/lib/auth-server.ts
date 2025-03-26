import "server-only"

import { headers } from "next/headers"

import { auth } from "@/server/auth"

export const getCurrentSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session
}
