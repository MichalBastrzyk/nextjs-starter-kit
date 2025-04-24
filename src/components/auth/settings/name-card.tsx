"use client"

import * as React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

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

const formSchema = z.object({
  name: z.string().min(1),
})

export function NameCard() {
  const { data: sessionData, refetch: refetchSession } = authClient.useSession()
  const [isPending, startTransition] = React.useTransition()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: sessionData?.user.name,
    },
  })

  async function onSubmit(input: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const { error } = await authClient.updateUser({ name: input.name })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success("Name updated")
      refetchSession()
    })
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Name</CardTitle>
            <CardDescription>
              Your name is used to identify you in the system.
            </CardDescription>
          </CardHeader>
          <CardContent className="py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      disabled={isPending}
                      {...field}
                    />
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
