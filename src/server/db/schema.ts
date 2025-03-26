import * as t from "drizzle-orm/sqlite-core"

const lifecycleDates = {
  createdAt: t
    .integer({ mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: t
    .integer({ mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
}

export const postsTable = t.sqliteTable("posts", {
  id: t.integer().primaryKey({ autoIncrement: true }),
  title: t.text().notNull(),
  content: t.text().notNull(),
  userId: t
    .integer()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  ...lifecycleDates,
})

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect
export type InsertPost = typeof postsTable.$inferInsert
export type SelectPost = typeof postsTable.$inferSelect

export const usersTable = t.sqliteTable("users", {
  id: t.text().primaryKey(),
  name: t.text().notNull(),
  email: t.text().notNull().unique(),
  emailVerified: t.integer({ mode: "boolean" }).notNull(),
  image: t.text(),
  ...lifecycleDates,
})

export const sessionsTable = t.sqliteTable("sessions", {
  id: t.text().primaryKey(),
  expiresAt: t.integer({ mode: "timestamp" }).notNull(),
  token: t.text().notNull().unique(),
  ipAddress: t.text(),
  userAgent: t.text(),
  userId: t
    .text()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  ...lifecycleDates,
})

export const accountsTable = t.sqliteTable("accounts", {
  id: t.text().primaryKey(),
  accountId: t.text().notNull(),
  providerId: t.text().notNull(),
  userId: t
    .text()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  accessToken: t.text(),
  refreshToken: t.text(),
  idToken: t.text(),
  accessTokenExpiresAt: t.integer({ mode: "timestamp" }),
  refreshTokenExpiresAt: t.integer({ mode: "timestamp" }),
  scope: t.text(),
  password: t.text(),
  ...lifecycleDates,
})

export const verificationTable = t.sqliteTable("verifications", {
  id: t.text().primaryKey(),
  identifier: t.text().notNull(),
  value: t.text().notNull(),
  expiresAt: t.integer({ mode: "timestamp" }).notNull(),
  ...lifecycleDates,
})
