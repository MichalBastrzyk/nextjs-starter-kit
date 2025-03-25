import Link from "next/link"

import { siteConfig } from "@/config/site"

export function SiteHeader() {
  return (
    <header className="border-border/40 bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-2 flex items-center md:mr-6 md:space-x-2">
          <span className="hidden font-bold md:inline-block">
            {siteConfig.title}
          </span>
        </Link>
        <nav className="flex flex-1 items-center md:justify-end"></nav>
      </div>
    </header>
  )
}
