import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
} from "nuqs/server"
import { z } from "zod"

import { getSortingStateParser } from "@/components/data-table/parsers"

import type { User } from "@/server/db/schema"
import { roles } from "@/server/permissions"

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<User>().withDefault([
    { id: "createdAt", desc: true },
  ]),
  name: parseAsString.withDefault(""),
  email: parseAsString.withDefault(""),
  emailVerified: parseAsBoolean,
  role: parseAsArrayOf(z.nativeEnum(roles)).withDefault([]),
  createdAt: parseAsArrayOf(z.coerce.number()).withDefault([]),
  updatedAt: parseAsArrayOf(z.coerce.number()).withDefault([]),
})

export const searchParamsZodSchema = z.object({
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().default(10),
  sort: z
    .array(
      z.object({
        id: z.enum([
          "id",
          "name",
          "email",
          "emailVerified",
          "image",
          "role",
          "banned",
          "banReason",
          "banExpires",
          "createdAt",
          "updatedAt",
        ]),
        desc: z.boolean(),
      })
    )
    .default([{ id: "createdAt", desc: true }]),
  name: z.string().default(""),
  email: z.string().default(""),
  emailVerified: z.boolean().nullable(),
  role: z.array(z.nativeEnum(roles)).default([]),
  createdAt: z.array(z.coerce.number()).default([]),
  updatedAt: z.array(z.coerce.number()).default([]),
})

export type UsersSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>
