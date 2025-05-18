"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { PasswordInput } from "@/components/auth/password-input"

import { signInSchema } from "@/server/schema/auth"

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    startTransition(async () => {
      const { data: responseData, error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      })

      if (error) {
        toast.error(error.message)
        return
      } else {
        toast.success("Signed in successfully")
        router.push(responseData?.url ?? "/dashboard")
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
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Signing in..." : "Sign in"}
              </Button>
              <Separator />
              <div className="mt-2 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
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
