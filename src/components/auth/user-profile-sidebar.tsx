import {
  CogIcon,
  CreditCardIcon,
  LockIcon,
  TriangleAlertIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const settings = [
  {
    name: "General",
    icon: CogIcon,
    url: "/settings/general",
  },
  {
    name: "Security",
    icon: LockIcon,
    url: "/settings/security",
  },
  {
    name: "Billing",
    icon: CreditCardIcon,
    url: "/settings/billing",
  },
  {
    name: "Danger Zone",
    icon: TriangleAlertIcon,
    url: "/settings/danger-zone",
  },
]

export function UserProfileSidebar() {
  return (
    <Sidebar className="h-full">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settings.map((setting) => (
                <SidebarMenuItem key={setting.name}>
                  <SidebarMenuButton asChild>
                    <a href={setting.url}>
                      <setting.icon />
                      <span>{setting.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
