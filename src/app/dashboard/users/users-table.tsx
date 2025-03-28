"use client"

import * as React from "react"

import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { useDataTable } from "@/components/hooks/use-data-table"

import type { api } from "@/trpc/server"

import { usersColumns } from "./columns"
import { UsersTableToolbarActions } from "./users-table-toolbar-actions"

interface UserTableProps {
  promise: Promise<Awaited<ReturnType<typeof api.user.getUsers>>>
}

export function UsersTable(props: UserTableProps) {
  const { data, pageCount } = React.use(props.promise)

  const { table } = useDataTable({
    data,
    columns: usersColumns,
    pageCount,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (row) => row.id,
    shallow: false,
    clearOnDefault: true,
  })

  return (
    <>
      <DataTable table={table}>
        <DataTableToolbar table={table}>
          <UsersTableToolbarActions table={table} />
        </DataTableToolbar>
      </DataTable>
    </>
  )
}
