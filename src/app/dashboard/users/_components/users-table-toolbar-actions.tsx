"use client"

import * as React from "react"
import Link from "next/link"

import type { Table } from "@tanstack/react-table"
import { DownloadIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { exportTableToCSV } from "@/components/data-table/export"

import type { User } from "@/server/db/schema"

import { DeleteUserDialog } from "./delete-user-dialog"

interface UsersTableToolbarActionsProps {
  table: Table<User>
}

export function UsersTableToolbarActions({
  table,
}: UsersTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteUserDialog
          users={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.setRowSelection({})}
          showTrigger
        />
      ) : null}
      <Button size="sm" asChild>
        <Link href="/dashboard/users/new">
          <PlusIcon />
          Add User
        </Link>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToCSV(table, {
            filename: "users",
            excludeColumns: ["select", "actions"],
          })
        }
      >
        <DownloadIcon />
        Export
      </Button>
    </div>
  )
}
