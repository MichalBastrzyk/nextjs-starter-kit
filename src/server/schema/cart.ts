import * as z from "zod"

export const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
})

export const checkoutItemSchema = cartItemSchema.extend({
  price: z.number(),
})

export type CartItemSchema = z.infer<typeof cartItemSchema>
export type CheckoutItemSchema = z.infer<typeof checkoutItemSchema>
