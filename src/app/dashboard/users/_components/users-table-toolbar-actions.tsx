"use client"

import * as React from "react"

import type { Table } from "@tanstack/react-table"
import { Download, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { exportTableToCSV } from "@/components/data-table/export"

import type { User } from "@/server/db/schema"

interface UsersTableToolbarActionsProps {
  table: Table<User>
}

export function UsersTableToolbarActions({
  table,
}: UsersTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <Button variant="destructive" size="sm">
          <Trash2 />
          Delete
        </Button>
      ) : null}
      <Button size="sm">
        <Plus />
        Add User
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
        <Download />
        Export
      </Button>
    </div>
  )
}
