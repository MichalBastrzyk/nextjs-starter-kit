"use server"

import { revalidatePath } from "next/cache"

import { eq } from "drizzle-orm"

import { db } from "@/server/db"
import { InsertUser, usersTable } from "@/server/db/schema"

export async function addUser(
  formData: FormData
): Promise<{ error: string } | void> {
  "use server"

  // Validate form data
  if (!formData.get("name")) {
    return { error: "Name is required" }
  }

  if (!formData.get("age")) {
    return { error: "Age is required" }
  }

  if (!formData.get("email")) {
    return { error: "Email is required" }
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
    return { error: "This email is already taken" }
  }

  await db.insert(usersTable).values(newUser).execute()

  revalidatePath("/")
}
