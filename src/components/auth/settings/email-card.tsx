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
import { Input } from "@/components/ui/input"

import { updateEmailSchema } from "@/server/schema/auth"

export function EmailCard() {
  const { data: sessionData, refetch: refetchSession } = authClient.useSession()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<z.infer<typeof updateEmailSchema>>({
    resolver: zodResolver(updateEmailSchema),
    disabled: !sessionData?.user.emailVerified,
    defaultValues: {
      email: sessionData?.user.email,
    },
  })

  async function onSubmit(input: z.infer<typeof updateEmailSchema>) {
    startTransition(async () => {
      const { error } = await authClient.changeEmail({
        newEmail: input.email,
        callbackURL: window.location.pathname,
      })

      if (error) {
        toast.error(error.message ?? "Failed to update email")
        return
      }

      if (sessionData?.user.emailVerified) {
        toast.success("Please check your email to verify the change.")
      } else {
        refetchSession()
        toast.success(`Email ${input.email} updated`)
      }
    })
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Email</CardTitle>
            <CardDescription>
              Your email is used to identify you in the system.
            </CardDescription>
          </CardHeader>
          <CardContent className="py-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!sessionData?.user.emailVerified && (
              <p className="text-muted-foreground pt-2 text-sm">
                Your current email is not verified. Please verify it first by
                clicking the link in the email we sent you.
              </p>
            )}
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
