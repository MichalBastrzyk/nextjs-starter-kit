"use client"

import * as React from "react"

import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import type { DataTableRowAction } from "@/components/data-table/types"
import { useDataTable } from "@/components/hooks/use-data-table"

import { getUsers } from "@/server/data/users"
import type { User } from "@/server/db/schema"

import { getUsersTableColumns } from "./columns"
import { DeleteUserDialog } from "./delete-user-dialog"
import { EditUserDrawer } from "./edit-user-drawer"
import { UsersTableToolbarActions } from "./users-table-toolbar-actions"

interface UserTableProps {
  promise: Promise<Awaited<ReturnType<typeof getUsers>>>
}

export function UsersTable(props: UserTableProps) {
  const { data, pageCount } = React.use(props.promise)

  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<User> | null>(null)

  const columns = React.useMemo(
    () => getUsersTableColumns({ setRowAction }),
    [setRowAction]
  )

  const { table } = useDataTable({
    data,
    columns,
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
      {rowAction?.variant === "update" && (
        <EditUserDrawer
          open={rowAction.variant === "update"}
          onOpenChange={() => setRowAction(null)}
          user={rowAction.row.original}
        />
      )}
      {rowAction?.variant === "delete" && (
        <DeleteUserDialog
          open={rowAction.variant === "delete"}
          onOpenChange={() => setRowAction(null)}
          users={rowAction?.row.original ? [rowAction?.row.original] : []}
          showTrigger={false}
          onSuccess={() => {
            rowAction?.row.toggleSelected(false)
            setRowAction(null)
          }}
        />
      )}
    </>
  )
}
