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

export const usersTable = t.sqliteTable("users", {
  id: t.integer().primaryKey({ autoIncrement: true }),
  name: t.text().notNull(),
  age: t.integer().notNull(),
  email: t.text().unique().notNull(),
  ...lifecycleDates,
})

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
