"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

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

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const { data, error } = await authClient.signIn.email({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      })

      if (error) {
        toast.error(error.message)
      } else {
        toast.success("Signed in successfully")
        router.push(data.url ?? "/dashboard")
      }
    })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign in to your account</CardTitle>
          <CardDescription>Login with your email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Logging in..." : "Login"}
              </Button>
            </div>
            <div className="mt-2 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground [&_a]:hover:text-primary text-balance text-center text-xs [&_a]:underline [&_a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link href="/terms-of-service" className="underline underline-offset-4">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="underline underline-offset-4">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  )
}
