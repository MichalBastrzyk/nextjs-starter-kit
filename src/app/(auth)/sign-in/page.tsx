import Link from "next/link"

import { SignInForm } from "@/components/auth/sign-in-form"
import { Icons } from "@/components/icons"

import { siteConfig } from "@/config/site"

export default function SignIn() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
            <Icons.logo className="size-4" />
          </div>
          {siteConfig.title}
        </Link>
        <SignInForm />
      </div>
    </div>
  )
}
