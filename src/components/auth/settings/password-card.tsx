"use client"

import * as React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { PasswordInput } from "@/components/auth/password-input"

import { setNewPasswordSchema } from "@/server/schema/auth"

export function PasswordCard() {
  const { data: sessionData, refetch: refetchSession } = authClient.useSession()

  const [isPending, startTransition] = React.useTransition()
  const form = useForm<z.infer<typeof setNewPasswordSchema>>({
    resolver: zodResolver(setNewPasswordSchema),
    disabled: !sessionData?.user.emailVerified,
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  })

  async function onSubmit(data: z.infer<typeof setNewPasswordSchema>) {
    startTransition(async () => {
      const { error } = await authClient.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })

      if (error) {
        toast.error(error.message ?? "Failed to update password")
        return
      }

      toast.success("Password updated")
      form.reset()
      refetchSession()
    })
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Your password is used to identify you in the system.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 py-2">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <PasswordInput disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
