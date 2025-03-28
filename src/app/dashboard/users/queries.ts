import "server-only"

import { and, asc, count, desc, eq, like } from "drizzle-orm"

import { db } from "@/server/db"
import { dateRange } from "@/server/db/query-utils"
import { usersTable } from "@/server/db/schema"

import { UsersSearchParams } from "./search-params"

export async function getUsers(input: UsersSearchParams) {
  const offset = (input.page - 1) * input.perPage
  const where = and(
    input.name
      ? like(usersTable.name, `%${input.name.toLowerCase()}%`)
      : undefined,
    input.email
      ? like(usersTable.email, `%${input.email.toLowerCase()}%`)
      : undefined,
    input.emailVerified
      ? eq(usersTable.emailVerified, input.emailVerified)
      : undefined,
    input.createdAt.length > 0
      ? dateRange(input.createdAt, usersTable.createdAt)
      : undefined,
    input.updatedAt.length > 0
      ? dateRange(input.updatedAt, usersTable.updatedAt)
      : undefined
  )

  const orderBy =
    input.sort.length > 0
      ? input.sort.map((item) =>
          item.desc ? desc(usersTable[item.id]) : asc(usersTable[item.id])
        )
      : [asc(usersTable.createdAt)]

  const { data, total } = await db.transaction(async (tx) => {
    const data = await tx
      .select()
      .from(usersTable)
      .limit(input.perPage)
      .offset(offset)
      .where(where)
      .orderBy(...orderBy)

    const total = await tx
      .select({ count: count() })
      .from(usersTable)
      .where(where)
      .then((res) => res[0].count)

    return { data, total }
  })

  const pageCount = Math.ceil(total / input.perPage)

  return { data, pageCount }
}
