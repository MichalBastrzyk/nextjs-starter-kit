import * as React from "react"

import { Shell } from "@/components/shell"

import { NewUserForm } from "./_components/new-user-form"
import { UsersTable } from "./_components/users-table"

export const experimental_ppr = true

export default async function ServerActionExample() {
  return (
    <Shell>
      <NewUserForm />
      <section className="grid gap-4">
        <h2 className="text-xl font-bold">Users</h2>
        <React.Suspense fallback={<p>Loading...</p>}>
          <UsersTable />
        </React.Suspense>
      </section>
    </Shell>
  )
}
