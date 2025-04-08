"use client"

import * as React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

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
import { useIsMobile } from "@/components/hooks/use-mobile"

import { updateUserAction } from "@/server/actions/users"
import type { User } from "@/server/db/schema"

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

interface EditUserDrawerProps {
  user: User | null
}

export function EditUserDrawer({
  user,
  ...props
}: EditUserDrawerProps & React.ComponentProps<typeof Drawer>) {
  const isMobile = useIsMobile()

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email,
    },
  })

  const onSubmit = (data: z.infer<typeof userSchema>) => {
    if (!user?.id) return

    toast.promise(
      updateUserAction({
        id: user?.id,
        name: data.name,
        email: data.email,
      }),
      {
        loading: "Saving changes...",
        success: `User ${user.name} updated`,
        error: `Failed to update user ${user.name}`,
      }
    )
  }

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
            </div>
            <Button type="submit" className="mt-auto w-full">
              Save
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
