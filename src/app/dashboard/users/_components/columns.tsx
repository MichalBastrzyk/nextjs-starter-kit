import { ColumnDef } from "@tanstack/react-table"
import {
  CalendarIcon,
  CheckCircleIcon,
  EllipsisIcon,
  MailIcon,
  Pencil,
  Trash,
  UserIcon,
} from "lucide-react"

import { formatDate } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { DataTableRowAction } from "@/components/data-table/types"

import { User } from "@/server/db/schema"

interface GetUsersTableColumnsProps {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<User> | null>
  >
}

export const getUsersTableColumns = ({
  setRowAction,
}: GetUsersTableColumnsProps): ColumnDef<User>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2 font-medium">
        <Avatar>
          <AvatarImage src={row.original.image ?? undefined} />
          <AvatarFallback>
            {row.original.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="capitalize">{row.original.name}</span>
      </div>
    ),
    meta: {
      label: "Name",
      placeholder: "Search names...",
      variant: "text",
      icon: UserIcon,
    },
    enableColumnFilter: true,
  },
  {
    id: "role",
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => (
      <Badge
        variant={row.original.role === "admin" ? "default" : "outline"}
        className="capitalize"
      >
        {row.original.role}
      </Badge>
    ),
    meta: {
      label: "Role",
      variant: "multiSelect",
      icon: UserIcon,
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "User",
          value: "user",
        },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: "email",
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="font-medium">{row.original.email}</div>,
    meta: {
      label: "Email",
      placeholder: "Search emails...",
      variant: "text",
      icon: MailIcon,
    },
    enableColumnFilter: true,
  },
  {
    id: "emailVerified",
    accessorKey: "emailVerified",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email Verified" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Checkbox
          checked={row.original.emailVerified}
          aria-label="Select row"
        />
        <span>{row.original.emailVerified ? "Yes" : "No"}</span>
      </div>
    ),
    meta: {
      label: "Email Verified",
      variant: "select",
      icon: CheckCircleIcon,
      options: [
        {
          label: "Yes",
          value: "true",
        },
        {
          label: "No",
          value: "false",
        },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: "banned",
    accessorKey: "banned",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Banned" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.original.banned ? "Yes" : "No"}</div>
    ),
    meta: {
      label: "Banned",
      variant: "select",
      options: [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">
        {row.original.createdAt ? formatDate(row.original.createdAt) : "N/A"}
      </div>
    ),
    meta: {
      label: "Created At",
      variant: "dateRange",
      icon: CalendarIcon,
    },
    enableColumnFilter: true,
  },
  {
    id: "updatedAt",
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">
        {row.original.updatedAt ? formatDate(row.original.updatedAt) : "N/A"}
      </div>
    ),
    meta: {
      label: "Updated At",
      variant: "dateRange",
      icon: CalendarIcon,
    },
    enableColumnFilter: true,
  },
  {
    id: "actions",
    enableHiding: false,
    size: 100,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onSelect={() =>
              setRowAction({
                row,
                variant: "update",
              })
            }
          >
            <Pencil />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() =>
              setRowAction({
                row,
                variant: "delete",
              })
            }
          >
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
