import * as z from "zod"

import { roles } from "../permissions"

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.nativeEnum(roles),
  password: z.string().min(8),
})

export type CreateUserSchema = z.infer<typeof createUserSchema>

export const getUsersSchema = z.object({
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

export type GetUsersSchema = z.infer<typeof getUsersSchema>

export const updateUserSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.nativeEnum(roles),
})

export type UpdateUserSchema = z.infer<typeof updateUserSchema>

export const deleteUsersSchema = z.object({
  ids: z.array(z.string()),
})

export type DeleteUsersSchema = z.infer<typeof deleteUsersSchema>
