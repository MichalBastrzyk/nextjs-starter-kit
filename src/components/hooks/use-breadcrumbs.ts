import * as React from "react"
import { usePathname } from "next/navigation"

export interface BreadcrumbItemData {
  type: "link" | "divider"
  title: string
  url: string | null
}

export function useBreadcrumbs(): BreadcrumbItemData[] {
  const pathname = usePathname()

  return React.useMemo(() => {
    const pathSegments = pathname.split("/").filter(Boolean)

    const breadcrumbItems = pathSegments.map((segment, index, array) => ({
      type: "link" as const,
      title: formatPathSegment(segment),
      url: `/${array.slice(0, index + 1).join("/")}`,
    }))

    return breadcrumbItems.flatMap((item, index) =>
      index < breadcrumbItems.length - 1
        ? [item, { type: "divider" as const, title: "", url: null }]
        : [item]
    )
  }, [pathname])
}

function formatPathSegment(segment: string): string {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}
