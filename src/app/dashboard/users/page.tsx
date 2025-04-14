import * as React from "react"
import { redirect } from "next/navigation"

import { getCurrentSession } from "@/lib/auth-server"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import {
  Shell,
  ShellDescription,
  ShellHeading,
  ShellTitle,
} from "@/components/shell"

import { getUsers } from "@/server/data/users"

import { UsersTable } from "./_components/users-table"
import { searchParamsCache } from "./search-params"

interface UsersPageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

export default async function UsersPage(props: UsersPageProps) {
  const auth = await getCurrentSession()

  if (!auth) {
    redirect("/sign-in")
  }

  const searchParams = await props.searchParams
  const search = searchParamsCache.parse(searchParams)

  const getUsersPromise = getUsers(search)

  return (
    <Shell variant="sidebar">
      <ShellHeading>
        <ShellTitle>Users</ShellTitle>
        <ShellDescription>Manage your users.</ShellDescription>
      </ShellHeading>
      <React.Suspense
        fallback={<DataTableSkeleton columnCount={7} filterCount={5} />}
      >
        <UsersTable promise={getUsersPromise} />
      </React.Suspense>
    </Shell>
  )
}
