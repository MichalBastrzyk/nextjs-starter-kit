"use client"

import * as React from "react"

import type { Row } from "@tanstack/react-table"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { deleteUsersAction } from "@/server/actions/users"
import type { User } from "@/server/db/schema"

interface DeleteUserDialogProps extends React.ComponentProps<typeof Dialog> {
  users: Row<User>["original"][]
  showTrigger?: boolean
  onSuccess?: () => void
}

export function DeleteUserDialog({
  users,
  showTrigger = true,
  onSuccess,
  ...props
}: DeleteUserDialogProps) {
  const [isPending, startTransition] = React.useTransition()

  return (
    <Dialog {...props}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Trash2 className="size-4" />
            Delete ({users.length})
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            <span className="font-bold">{users.length}</span>
            {users.length === 1 ? " user" : " users"} from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            aria-label="Delete selected rows"
            variant="destructive"
            disabled={isPending}
            onClick={async () => {
              startTransition(async () => {
                const result = await deleteUsersAction({
                  ids: users.map((user) => user.id),
                })

                if (result?.serverError) {
                  toast.error(result.serverError)
                  return
                }

                toast.success(`${users.length} users deleted`)
                onSuccess?.()
              })
            }}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
