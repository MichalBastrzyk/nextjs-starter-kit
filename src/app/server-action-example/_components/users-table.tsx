import { connection } from "next/server"

import { desc } from "drizzle-orm"

import { formatDate } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { db } from "@/server/db"
import { usersTable } from "@/server/db/schema"

export async function UsersTable() {
  await connection()

  const users = await db
    .select()
    .from(usersTable)
    .orderBy(desc(usersTable.createdAt))

  return (
    <Table>
      <TableCaption>A list of users that signed up</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Age</TableHead>
          <TableHead className="text-right">Created At</TableHead>
          <TableHead className="text-right">Updated At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.age}</TableCell>
            <TableCell className="text-right">
              {formatDate(user.createdAt)}
            </TableCell>
            <TableCell className="text-right">
              {user.updatedAt ? formatDate(user.updatedAt) : "N/A"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
