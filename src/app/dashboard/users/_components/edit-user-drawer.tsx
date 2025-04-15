"use client"

import * as React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useIsMobile } from "@/components/hooks/use-mobile"

import { updateUserAction } from "@/server/actions/users"
import type { User } from "@/server/db/schema"
import { roles } from "@/server/permissions"
import { updateUserSchema } from "@/server/schema/users"

interface EditUserDrawerProps {
  user: User | null
}

export function EditUserDrawer({
  user,
  ...props
}: EditUserDrawerProps & React.ComponentProps<typeof Drawer>) {
  const [isPending, startTransition] = React.useTransition()
  const isMobile = useIsMobile()

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: user?.id ?? "",
      name: user?.name ?? "",
      email: user?.email,
      role: user?.role ?? roles.user,
    },
  })

  const onSubmit = async (data: z.infer<typeof updateUserSchema>) =>
    startTransition(async () => {
      if (!user?.id) return

      const result = await updateUserAction({
        id: user?.id,
        name: data.name,
        email: data.email,
        role: data.role,
      })

      if (!result) {
        toast.error("Failed to update user")
        return
      }

      if (result.serverError) {
        toast.error(result.serverError)
        return
      }

      toast.success(`User ${user.name} updated`)
      return
    })

  return (
    <Drawer direction={isMobile ? "bottom" : "right"} {...props}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit User</DrawerTitle>
        </DrawerHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 px-4 pt-4 md:h-full"
          >
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="User's name"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="User's email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={roles.admin}>
                          <span className="capitalize">{roles.admin}</span>
                        </SelectItem>
                        <SelectItem value={roles.user}>
                          <span className="capitalize">{roles.user}</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="mt-auto w-full"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </form>
        </Form>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
