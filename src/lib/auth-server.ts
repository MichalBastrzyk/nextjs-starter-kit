import "server-only"

import { cache } from "react"
import { headers } from "next/headers"

import { auth } from "@/server/auth"
import { ac } from "@/server/permissions"

type Session = NonNullable<
  Awaited<ReturnType<typeof auth.api.getSession>>
> | null

type PermissionCheck = Partial<{
  [K in keyof typeof ac.statements]: (typeof ac.statements)[K][number][]
}>

/**
 * Retrieves the current user session using server-side context (headers).
 * Uses React cache for memoization within a request.
 * Handles errors during session fetching and returns null on failure.
 * @returns A promise that resolves to the Session object or null if no session exists or an error occurs.
 */
export const getCurrentSession = cache(async (): Promise<Session> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    return session ?? null
  } catch (error) {
    console.error(`[AUTH] [getCurrentSession] Error fetching session:`, error)
    return null
  }
})

/**
 * Checks if the currently authenticated user has the specified permission(s).
 * Uses React cache for memoization within a request.
 * @param permission - An object specifying the resource and action(s) to check (e.g., { user: ["delete"] }).
 * @returns A promise that resolves to true if the user has the permission, false otherwise.
 */
export const checkUserPermission = cache(
  async (userId: string, permission: PermissionCheck) => {
    try {
      const check = await auth.api.userHasPermission({
        body: {
          userId,
          permission,
        },
      })

      return check.success
    } catch (error) {
      console.error(
        "[AUTH] [checkCurrentUserPermission] Error checking permission:",
        error
      )
      return false
    }
  }
)
