import type { Metadata } from "next"

import { cn, getBaseUrl } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { TailwindIndicator } from "@/components/tailwind-indicator"

import { fontMono, fontSans } from "@/config/fonts"
import { seoConfig, siteConfig } from "@/config/site"

import "@/app/globals.css"

// TODO: Check if there's more to add to the metadata
export const metadata: Metadata = {
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  metadataBase: new URL(getBaseUrl()),
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: seoConfig.authors,
  creator: seoConfig.creator,
  openGraph: {
    ...seoConfig.openGraph,
    description: seoConfig.description,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={siteConfig.locale}>
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        {children}
        <Toaster />
        <TailwindIndicator />
      </body>
    </html>
  )
}
