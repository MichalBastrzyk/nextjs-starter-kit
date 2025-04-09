import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { getCurrentSession } from "@/lib/auth-server"

import { auth } from "@/server/auth"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    const session = await getCurrentSession()
    if (!session) {
      return
    }

    const headersList = new Headers(await headers())
    headersList.set("Cache-Control", "no-store, no-cache, must-revalidate")
    headersList.set("Clear-Site-Data", '"cookies", "storage"')

    await auth.api.revokeSession({
      body: { token: session.session.token },
      method: "POST",
      headers: headersList,
    })

    return
  } catch (error) {
    console.error("[AUTH] [signOut] Error:", error)
  } finally {
    redirect("/sign-in")
  }
}
