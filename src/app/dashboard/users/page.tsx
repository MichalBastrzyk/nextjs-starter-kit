import * as React from "react"

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { Shell } from "@/components/shell"

import { getUsers } from "./queries"
import { searchParamsCache } from "./search-params"
import { UsersTable } from "./users-table"

interface UsersPageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

export default async function UsersPage(props: UsersPageProps) {
  const searchParams = await props.searchParams
  const search = searchParamsCache.parse(searchParams)

  const getUsersPromise = getUsers(search)

  return (
    <Shell variant="sidebar">
      <React.Suspense
        fallback={<DataTableSkeleton columnCount={7} filterCount={5} />}
      >
        <UsersTable promise={getUsersPromise} />
      </React.Suspense>
    </Shell>
  )
}
