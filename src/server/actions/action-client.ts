import { createSafeActionClient } from "next-safe-action"
import { z } from "zod"

import { getCurrentSession } from "@/lib/auth-server"

export const actionClient = createSafeActionClient({
  defineMetadataSchema: () =>
    z.object({
      actionName: z.string(),
    }),
}).use(async ({ next, metadata }) => {
  const startTime = performance.now()

  const endTime = performance.now()

  console.log(
    `[ACTION] ${metadata.actionName} took ${endTime - startTime}ms to execute`
  )

  return next()
})

export const adminActionClient = actionClient.use(async ({ next }) => {
  const auth = await getCurrentSession()

  if (!auth) {
    throw new Error("Unauthorized")
  }

  if (auth.user.role !== "admin") {
    throw new Error("Unauthorized")
  }

  return next({ ctx: { auth } })
})
