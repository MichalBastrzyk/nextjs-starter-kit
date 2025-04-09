import { createAccessControl } from "better-auth/plugins/access"
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access"

// --- Define Resources & Actions ---

/**
 * Define your resources and actions
 * Merge with default statements if extending default user/session permissions
 */
const statement = {
  user: [...defaultStatements.user, "update"],
  session: [...defaultStatements.session, "update"],
  // Add your custom permissions here as needed
} as const

/**
 * Access controller
 */
export const ac = createAccessControl(statement)

// --- Define Roles ---

/**
 * Admin role
 */
export const admin = ac.newRole({
  user: [...adminAc.statements.user, "update"],
  session: [...adminAc.statements.session, "update"],
})

/**
 * User role
 */
/*
  export const user = ac.newRole({
    Add your custom user permissions here as needed
  })
*/

export const roles = {
  admin: "admin",
  user: "user",
}
