import * as React from "react"
import { revalidatePath } from "next/cache"

import { eq } from "drizzle-orm"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shell } from "@/components/shell"

import { db } from "@/server/db"
import { InsertUser, usersTable } from "@/server/db/schema"

import { UsersTable } from "./_components/users-table"

async function addUser(formData: FormData) {
  "use server"

  // Validate form data
  if (!formData.get("name")) {
    throw new Error("Name is required")
  }

  if (!formData.get("age")) {
    throw new Error("Age is required")
  }

  if (!formData.get("email")) {
    throw new Error("Email is required")
  }

  const newUser: InsertUser = {
    name: formData.get("name") as string,
    age: Number(formData.get("age")),
    email: formData.get("email") as string,
  }

  // Check if user already exists
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, newUser.email))

  if (existingUser.length > 0) {
    throw new Error("User already exists")
  }

  console.log("Adding new user:", newUser)

  await db.insert(usersTable).values(newUser).execute()

  revalidatePath("/")
}

export const experimental_ppr = true

export default async function ServerActionExample() {
  return (
    <Shell>
      <form action={addUser}>
        <div className="grid gap-4">
          <h1 className="text-2xl font-bold">Add User</h1>
          <Input type="text" name="name" placeholder="Name" required />
          <Input type="number" name="age" placeholder="Age" required />
          <Input type="email" name="email" placeholder="Email" required />
          <Button type="submit">Add User</Button>
        </div>
      </form>
      <section className="grid gap-4">
        <h2 className="text-xl font-bold">Users</h2>
        <React.Suspense fallback={<p>Loading...</p>}>
          <UsersTable />
        </React.Suspense>
      </section>
    </Shell>
  )
}
