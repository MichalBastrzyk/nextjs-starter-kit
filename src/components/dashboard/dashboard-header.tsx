"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useBreadcrumbs } from "@/components/hooks/use-breadcrumbs"

export function DashboardHeader() {
  const breadcrumbItems = useBreadcrumbs()

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) h-(--header-height) flex shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb className="text-base">
          <BreadcrumbList>
            {breadcrumbItems.map((item, i) => {
              if (item.type === "link") {
                const isLastItem = i === breadcrumbItems.length - 1
                return (
                  <BreadcrumbItem key={`item-${i}`}>
                    {isLastItem ? (
                      <BreadcrumbPage>{item.title}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.url!}>
                        {item.title}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                )
              }
              return <BreadcrumbSeparator key={`sep-${i}`} />
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
