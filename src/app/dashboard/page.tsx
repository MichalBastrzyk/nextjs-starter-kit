import { redirect } from "next/navigation"

import { getCurrentSession } from "@/lib/auth-server"

export default async function DashboardMainPage() {
  const auth = await getCurrentSession()

  if (!auth) {
    redirect("/sign-in")
  }

  return (
    <div className="flex h-[200vh] flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <pre>{JSON.stringify(auth.user.stripeCustomerId, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
