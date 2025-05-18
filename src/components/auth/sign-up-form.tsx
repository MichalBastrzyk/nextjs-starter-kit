"use client"

import * as React from "react"
import Link from "next/link"

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

import { signUpSchema } from "@/server/schema/auth"

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    startTransition(async () => {
      const { error } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      if (error) {
        toast.error("Error signing up", {
          description: error.message,
        })
        return
      }

      toast.success("Verification email sent", {
        description: `We've sent a verification link to ${data.email}`,
      })
    })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign up to your account</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
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
                      <Input placeholder="john.doe@example.com" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} autoComplete="new-password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} autoComplete="new-password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Signing up..." : "Sign up"}
              </Button>{" "}
              <div className="text-muted-foreground [&_a]:hover:text-primary text-balance text-center text-xs [&_a]:underline [&_a]:underline-offset-4">
                By clicking continue, you agree to our{" "}
                <Link
                  href="/terms-of-service"
                  className="underline underline-offset-4"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="underline underline-offset-4"
                >
                  Privacy Policy
                </Link>
              </div>
              <Separator />
              <div className="mt-2 text-center text-sm">
                Already have an account?{" "}
                <Link href="/sign-in" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
