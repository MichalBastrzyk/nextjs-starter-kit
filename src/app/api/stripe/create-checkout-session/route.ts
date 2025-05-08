import { redirect } from "next/navigation"

import { getCurrentSession } from "@/lib/auth-server"

import type { CheckoutItemSchema } from "@/server/schema/cart"
import { stripe } from "@/server/stripe"

import { env } from "@/env"

export async function GET() {
  const auth = await getCurrentSession()

  // NOTE: This is often not wanted as you may want to allow users to buy products without being logged in.
  // TODO: Handle such case by modifying the authentication layer to create a guest user.
  if (!auth) {
    return redirect("/sign-in")
  }

  const metadata: CheckoutItemSchema[] = [
    {
      productId: "prod_123",
      quantity: 1,
      price: 1999,
    },
  ]

  const session = await stripe.checkout.sessions.create({
    customer: auth.user.stripeCustomerId,
    payment_method_types: ["card", "blik"],
    shipping_address_collection: {
      allowed_countries: ["PL"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1999,
            currency: "pln",
          },
          display_name: "Standard Shipping",
          delivery_estimate: {
            minimum: { value: 5, unit: "business_day" },
            maximum: { value: 7, unit: "business_day" },
          },
        },
      },
    ],
    line_items: [
      {
        price_data: {
          currency: "pln",
          unit_amount: 1999,
          product_data: {
            name: "T-Shirt | White | M",
            description: "A white t-shirt in size M",
            images: [
              "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
            ],
            metadata: {
              category: "apparel",
              size: "M",
              color: "white",
            },
          },
        },
        quantity: 1,
      },
    ],
    billing_address_collection: "auto",
    allow_promotion_codes: true,
    phone_number_collection: {
      enabled: true,
    },
    mode: "payment",
    payment_intent_data: {
      metadata: { items: JSON.stringify(metadata) },
    },
    success_url: `${env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
  })

  return redirect(session.url ?? "/checkout/cancel")
}
