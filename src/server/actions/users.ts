"use server"

import { revalidatePath } from "next/cache"

import { eq, inArray } from "drizzle-orm"

import { auth } from "@/server/auth"
import { db } from "@/server/db"
import { usersTable } from "@/server/db/schema"
import {
  createUserSchema,
  deleteUsersSchema,
  updateUserSchema,
} from "@/server/schema/users"

import { adminActionClient } from "./action-client"

export const createUserAction = adminActionClient
  .metadata({ actionName: "createUserAction" })
  .schema(createUserSchema)
  .action(async ({ parsedInput: { email, name, password } }) => {
    const user = await auth.api.createUser({
      body: { email, name, password },
    })

    if (!user) {
      throw new Error("Failed to create user")
    }

    revalidatePath("/dashboard/users")
  })

export const updateUserAction = adminActionClient
  .metadata({ actionName: "updateUserAction" })
  .schema(updateUserSchema)
  .action(async ({ parsedInput: { id, name, email } }) => {
    await db
      .update(usersTable)
      .set({
        name,
        email,
      })
      .where(eq(usersTable.id, id))

    revalidatePath("/dashboard/users")
  })

export const deleteUsersAction = adminActionClient
  .metadata({ actionName: "deleteUsersAction" })
  .schema(deleteUsersSchema)
  .action(async ({ parsedInput: { ids } }) => {
    await db.delete(usersTable).where(inArray(usersTable.id, ids))

    revalidatePath("/dashboard/users")
  })
