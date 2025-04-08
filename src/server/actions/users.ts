"use server"

import { revalidatePath } from "next/cache"

import { eq, inArray } from "drizzle-orm"

import { getCurrentSession } from "@/lib/auth-server"

import { auth } from "@/server/auth"
import { db } from "@/server/db"
import { usersTable } from "@/server/db/schema"
import {
  createUserSchema,
  deleteUsersSchema,
  updateUserSchema,
  type CreateUserSchema,
  type DeleteUsersSchema,
  type UpdateUserSchema,
} from "@/server/schema/users"

export async function createUserAction(input: CreateUserSchema) {
  const { data, error } = await createUserSchema.safeParseAsync(input)

  if (!data || error) {
    console.error(error)
    throw new Error("Invalid input")
  }

  const user = await auth.api.createUser({
    body: {
      email: data.email,
      name: data.name,
      password: data.password,
    },
  })

  if (!user) {
    throw new Error("Failed to create user")
  }

  revalidatePath("/dashboard/users")
}

export async function updateUserAction(input: UpdateUserSchema) {
  const { data, error } = await updateUserSchema.safeParseAsync(input)

  if (!data || error) {
    console.error(error)
    throw new Error("Invalid input")
  }

  const { id, name, email } = data

  const auth = await getCurrentSession()

  if (!auth) {
    throw new Error("Unauthorized")
  }

  await db
    .update(usersTable)
    .set({
      name,
      email,
    })
    .where(eq(usersTable.id, id))

  revalidatePath("/dashboard/users")
}

export async function deleteUsersAction(input: DeleteUsersSchema) {
  const { data, error } = await deleteUsersSchema.safeParseAsync(input)

  if (!data || error) {
    console.error(error)
    throw new Error("Invalid input")
  }

  const { ids } = data

  const auth = await getCurrentSession()

  if (!auth) {
    throw new Error("Unauthorized")
  }

  await db.delete(usersTable).where(inArray(usersTable.id, ids))

  revalidatePath("/dashboard/users")
}
