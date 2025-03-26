"use client"

import * as React from "react"
import Link from "next/link"

import {
  IconChartBar,
  IconCrown,
  IconDashboard,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { UserButton } from "@/components/auth/user-button"
import { NavMain } from "@/components/dashboard/sidebar/nav-main"
import { NavSecondary } from "@/components/dashboard/sidebar/nav-secondary"
import { Icons } from "@/components/icons"

import { siteConfig } from "@/config/site"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: IconListDetails,
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: IconReport,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: IconChartBar,
    },
    {
      title: "Clients",
      url: "/dashboard/clients",
      icon: IconUsers,
    },
    {
      title: "Administrators",
      url: "/dashboard/administrators",
      icon: IconCrown,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
  ],
}

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <Icons.logo className="!size-5" />
                <span className="text-base font-semibold">
                  {siteConfig.title}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  )
}
