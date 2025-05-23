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

export type Post = typeof postsTable.$inferSelect
export type NewPost = typeof postsTable.$inferInsert

export const usersTable = t.sqliteTable(
  "users",
  {
    id: t.text().primaryKey(),
    name: t.text().notNull(),
    email: t.text().notNull().unique(),
    emailVerified: t.integer({ mode: "boolean" }).notNull(),
    stripeCustomerId: t.text().unique(),
    image: t.text(),
    role: t.text(),
    banned: t.integer({ mode: "boolean" }),
    banReason: t.text(),
    banExpires: t.integer({ mode: "timestamp" }),
    ...lifecycleDates,
  },
  (table) => [
    t.uniqueIndex("email_idx").on(table.email),
    t.uniqueIndex("stripe_customer_id_idx").on(table.stripeCustomerId),
  ]
)

export type User = typeof usersTable.$inferSelect
export type NewUser = typeof usersTable.$inferInsert

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
  impersonatedBy: t.text(),
  ...lifecycleDates,
})

export type Session = typeof sessionsTable.$inferSelect
export type NewSession = typeof sessionsTable.$inferInsert

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

export type Account = typeof accountsTable.$inferSelect
export type NewAccount = typeof accountsTable.$inferInsert

export const verificationTable = t.sqliteTable("verifications", {
  id: t.text().primaryKey(),
  identifier: t.text().notNull(),
  value: t.text().notNull(),
  expiresAt: t.integer({ mode: "timestamp" }).notNull(),
  ...lifecycleDates,
})

export type Verification = typeof verificationTable.$inferSelect
export type NewVerification = typeof verificationTable.$inferInsert

export const imagesTable = t.sqliteTable("images", {
  id: t.text().primaryKey(),
  originalFilename: t.text().notNull(),
  size: t.integer().notNull(),
  mimeType: t.text().notNull(),
  width: t.integer(),
  height: t.integer(),
  s3ObjectKey: t.text().notNull(),
  s3BucketName: t.text().notNull(),
  cdnUrl: t.text(),
  isPublic: t.integer({ mode: "boolean" }).notNull().default(true),
  userId: t
    .text()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  ...lifecycleDates,
})

export type Image = typeof imagesTable.$inferSelect
export type NewImage = typeof imagesTable.$inferInsert
