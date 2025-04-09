import { redirect } from "next/navigation"

import { getCurrentSession } from "@/lib/auth-server"
import { Shell } from "@/components/shell"

import { NewUserForm } from "./new-user-form"

export default async function NewUserPage() {
  const auth = await getCurrentSession()

  if (!auth) {
    redirect("/sign-in")
  }

  return (
    <Shell variant="sidebar">
      <h1>New User</h1>
      <NewUserForm />
    </Shell>
  )
}
