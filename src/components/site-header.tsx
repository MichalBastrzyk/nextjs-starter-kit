import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { UserButton } from "@/components/auth/user-button"

import { siteConfig } from "@/config/site"

export function SiteHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      className={cn(
        "border-border/40 bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <div className="container flex h-14 items-center gap-4">
        <Link href="/" className="mr-2 flex items-center md:mr-6 md:space-x-2">
          <span className="hidden font-bold md:inline-block">
            {siteConfig.title}
          </span>
        </Link>
        <nav className="flex flex-1 items-center gap-2 md:justify-end">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-sm font-medium"
          >
            Home
          </Link>
        </nav>
        <UserButton />
      </div>
    </header>
  )
}
