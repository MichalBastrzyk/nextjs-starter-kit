import { createHash } from "crypto"

import * as z from "zod"

async function isPasswordBreached(password: string): Promise<boolean> {
  // Create SHA-1 hash of the password
  const hash = createHash("sha1").update(password).digest("hex").toLowerCase()
  const hashPrefix = hash.slice(0, 5)
  const response = await fetch(
    `https://api.pwnedpasswords.com/range/${hashPrefix}`
  )
  const data = await response.text()
  const items = data.split("\n")
  for (const item of items) {
    const hashSuffix = item.slice(0, 35).toLowerCase()
    if (hash === hashPrefix + hashSuffix) {
      return true
    }
  }
  return false
}

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password cannot exceed 128 characters")
  // Optional complexity validation - modern guidance favors length over complexity
  .refine(
    (password) => {
      // Reasonable complexity check (but not required by NIST)
      const hasUppercase = /[A-Z]/.test(password)
      const hasLowercase = /[a-z]/.test(password)
      const hasNumber = /[0-9]/.test(password)
      const hasSpecial = /[^A-Za-z0-9]/.test(password)

      return hasUppercase && hasLowercase && (hasNumber || hasSpecial)
    },
    {
      message:
        "Password must include uppercase, lowercase, and at least one number or special character",
    }
  )

export const signUpSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: passwordSchema.refine(
      async (password) => {
        const isBreached = await isPasswordBreached(password)
        return !isBreached
      },
      { message: "This password is too commonly used" }
    ),
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
})

export const updateEmailSchema = z.object({
  email: z.string().email(),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema.refine(
      async (password) => {
        const isBreached = await isPasswordBreached(password)
        return !isBreached
      },
      { message: "This password is too commonly used" }
    ),
    confirmPassword: passwordSchema.refine(
      async (password) => {
        const isBreached = await isPasswordBreached(password)
        return !isBreached
      },
      { message: "This password is too commonly used" }
    ),
    token: z.string().min(1),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const setNewPasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: passwordSchema.refine(
    async (password) => {
      const isBreached = await isPasswordBreached(password)
      return !isBreached
    },
    { message: "This password is too commonly used" }
  ),
})

export const deleteAccountSchema = z.object({
  password: z.string().min(1, "Password is required"),
})
