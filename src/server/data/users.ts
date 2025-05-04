import "server-only"

import { and, asc, count, desc, eq, inArray, like } from "drizzle-orm"

import { getCurrentSession } from "@/lib/auth-server"

import { db } from "@/server/db"
import { dateRange } from "@/server/db/query-utils"
import { usersTable, type User } from "@/server/db/schema"
import { getUsersSchema, type GetUsersSchema } from "@/server/schema/users"

export const getUsers = async (input: GetUsersSchema) => {
  const auth = await getCurrentSession()

  if (!auth) {
    throw new Error("You are not allowed to do this")
  }

  const result = await getUsersSchema.safeParseAsync(input)

  if (!result.success) {
    throw new Error("Invalid input")
  }

  const {
    page,
    perPage,
    sort,
    name,
    email,
    emailVerified,
    role,
    createdAt,
    updatedAt,
  } = result.data

  const offset = (page - 1) * perPage
  const where = and(
    name ? like(usersTable.name, `%${name.toLowerCase()}%`) : undefined,
    email ? like(usersTable.email, `%${email.toLowerCase()}%`) : undefined,
    emailVerified ? eq(usersTable.emailVerified, emailVerified) : undefined,
    role.length > 0 ? inArray(usersTable.role, role) : undefined,
    createdAt.length > 0
      ? dateRange(createdAt, usersTable.createdAt)
      : undefined,
    updatedAt.length > 0
      ? dateRange(updatedAt, usersTable.updatedAt)
      : undefined
  )

  const orderBy =
    sort.length > 0
      ? sort.map((item) =>
          item.desc ? desc(usersTable[item.id]) : asc(usersTable[item.id])
        )
      : [asc(usersTable.createdAt)]

  const { data, total } = await db.transaction(async (tx) => {
    const data = await tx
      .select()
      .from(usersTable)
      .limit(perPage)
      .offset(offset)
      .where(where)
      .orderBy(...orderBy)

    const total = await tx
      .select({ count: count() })
      .from(usersTable)
      .where(where)
      .then((res) => res[0]?.count ?? 0)

    return { data, total }
  })

  const pageCount = Math.ceil(total / perPage)

  return { data, pageCount }
}

export const getUser = async (id: string): Promise<User> => {
  const auth = await getCurrentSession()

  if (!auth) {
    throw new Error("You are not allowed to do this")
  }

  const users = await db.select().from(usersTable).where(eq(usersTable.id, id))

  if (users?.[0] === undefined || users.length === 0) {
    throw new Error("User not found")
  }

  return users[0]
}
