import { createSafeActionClient } from "next-safe-action"
import { z } from "zod"

import { getCurrentSession } from "@/lib/auth-server"

export class ActionError extends Error {}

export const actionClient = createSafeActionClient({
  // This defines the metadata schema for the action
  defineMetadataSchema: () =>
    z.object({
      // Action name is used for logging purposes
      actionName: z.string(),
    }),
  // This handles errors that occur in the action
  handleServerError: (error, utils) => {
    console.error(
      `[ACTION] "${utils.metadata.actionName}"`,
      error.message,
      utils
    )

    if (error instanceof ActionError) {
      return error.message
    }

    return "An unknown error occurred"
  },
}).use(async ({ next, metadata }) => {
  const startTime = performance.now()

  const result = await next()

  const endTime = performance.now()

  console.log(
    `[ACTION] ${metadata.actionName} took ${endTime - startTime}ms to execute`
  )

  return result
})

export const authActionClient = actionClient.use(async ({ next }) => {
  const auth = await getCurrentSession()

  if (!auth) {
    throw new ActionError("You are not allowed to do this")
  }

  return next({ ctx: { auth } })
})
