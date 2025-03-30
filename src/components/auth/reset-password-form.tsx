"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const { error } = await authClient.resetPassword({
        newPassword: formData.get("password") as string,
        token: searchParams.get("token") as string,
      })

      if (error) {
        toast.error(`${error.status} ${error.message}`, {
          description: JSON.stringify(error),
        })
        return
      }

      toast.success("Password reset successfully", {
        description: "Please sign in using your new password",
      })
      router.push("/sign-in")
    })
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset your password</CardTitle>
          <CardDescription>Enter your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="********"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Resetting password..." : "Reset password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
