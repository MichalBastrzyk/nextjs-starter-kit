"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { authClient } from "@/lib/auth-client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { deleteAccountSchema } from "@/server/schema/auth"

import { PasswordInput } from "../password-input"

export function DeleteAccountCard() {
  const router = useRouter()

  const [isOpen, setIsOpen] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<z.infer<typeof deleteAccountSchema>>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      password: "",
    },
  })

  async function onSubmit(input: z.infer<typeof deleteAccountSchema>) {
    startTransition(async () => {
      const { data, error } = await authClient.deleteUser({
        password: input.password,
      })

      if (error) {
        toast.error(error.message ?? "Failed to delete account")
        return
      }

      toast.success(data.message)

      // Redirect to sign-out page
      router.push("/sign-out")
    })
  }

  return (
    <Card className="border-destructive pb-0">
      <CardHeader>
        <CardTitle className="text-destructive">Delete Account</CardTitle>
        <CardDescription className="text-destructive/75">
          Permanently delete your account. This action cannot be undone.
        </CardDescription>
      </CardHeader>
      <CardFooter className="border-destructive bg-destructive/10 justify-end border-t !py-4">
        <AlertDialog open={isOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsOpen(true)}
            >
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove all your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-6"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput {...field} placeholder="********" />
                      </FormControl>
                      <FormDescription>
                        Enter your current password to confirm the deletion of
                        your account.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsOpen(false)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    disabled={isPending}
                    type="submit"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Delete Account"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </form>
            </Form>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}
