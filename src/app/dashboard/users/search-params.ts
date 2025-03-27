import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
} from "nuqs/server"
import { z } from "zod"

import { getSortingStateParser } from "@/components/data-table/parsers"

import { User } from "@/server/db/schema"

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<User>().withDefault([
    { id: "createdAt", desc: true },
  ]),
  name: parseAsString.withDefault(""),
  email: parseAsString.withDefault(""),
  emailVerified: parseAsBoolean,
  createdAt: parseAsArrayOf(z.coerce.number()).withDefault([]),
  updatedAt: parseAsArrayOf(z.coerce.number()).withDefault([]),
})

export type UsersSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>
