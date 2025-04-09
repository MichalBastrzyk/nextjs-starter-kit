"use server"

import { revalidatePath } from "next/cache"

import { eq, inArray } from "drizzle-orm"

import { checkUserPermission } from "@/lib/auth-server"

import { auth } from "@/server/auth"
import { db } from "@/server/db"
import { usersTable } from "@/server/db/schema"
import {
  createUserSchema,
  deleteUsersSchema,
  updateUserSchema,
} from "@/server/schema/users"

import { ActionError, authActionClient } from "./action-client"

export const createUserAction = authActionClient
  .metadata({ actionName: "createUserAction" })
  .schema(createUserSchema)
  .action(async ({ ctx, parsedInput }) => {
    const check = await checkUserPermission(ctx.auth.session.userId, {
      user: ["create"],
    })

    if (!check) {
      throw new ActionError("You are not allowed to create users")
    }

    const user = await auth.api.createUser({
      body: parsedInput,
    })

    if (!user) {
      throw new ActionError("Failed to create user")
    }

    revalidatePath("/dashboard/users")
  })

export const updateUserAction = authActionClient
  .metadata({ actionName: "updateUserAction" })
  .schema(updateUserSchema)
  .action(async ({ ctx, parsedInput }) => {
    const check = await checkUserPermission(ctx.auth.session.userId, {
      user: ["update"],
    })

    if (!check) {
      throw new ActionError("You are not allowed to update users")
    }

    await db
      .update(usersTable)
      .set(parsedInput)
      .where(eq(usersTable.id, parsedInput.id))

    revalidatePath("/dashboard/users")
  })

export const deleteUsersAction = authActionClient
  .metadata({ actionName: "deleteUsersAction" })
  .schema(deleteUsersSchema)
  .action(async ({ ctx, parsedInput: { ids } }) => {
    const check = await checkUserPermission(ctx.auth.session.userId, {
      user: ["delete"],
    })

    if (!check) {
      throw new ActionError("You are not allowed to delete users")
    }

    await db.delete(usersTable).where(inArray(usersTable.id, ids))

    revalidatePath("/dashboard/users")
  })
