import { redirect } from "next/navigation"

import { NuqsAdapter } from "nuqs/adapters/next/app"

import { getCurrentSession } from "@/lib/auth-server"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/sidebar/dashboard-sidebar"

import { Banner } from "./banner"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const auth = await getCurrentSession()

  if (!auth) {
    redirect("/sign-in")
  }

  return (
    <NuqsAdapter>
      <Banner />
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <DashboardSidebar variant="inset" />
        <SidebarInset>
          <DashboardHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </NuqsAdapter>
  )
}
