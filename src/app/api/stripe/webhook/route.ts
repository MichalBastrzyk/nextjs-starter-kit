import type Stripe from "stripe"
import { z } from "zod"

import { tryCatch } from "@/lib/try-catch"

import {
  checkoutItemSchema,
  type CheckoutItemSchema,
} from "@/server/schema/cart"
import { stripe } from "@/server/stripe"

import { env } from "@/env"

// const subscriptionEvents: Stripe.Event.Type[] = [
//   "customer.subscription.created",
//   "customer.subscription.updated",
//   "customer.subscription.deleted",
//   "customer.subscription.paused",
//   "customer.subscription.resumed",
//   "customer.subscription.pending_update_applied",
//   "customer.subscription.pending_update_expired",
//   "customer.subscription.trial_will_end",
// ]

const allowedEvents: Stripe.Event.Type[] = [
  // ...subscriptionEvents,
  // Checkout Session completed
  "checkout.session.completed",
  "invoice.paid",
  "invoice.payment_failed",
  "invoice.payment_action_required",
  "invoice.upcoming",
  "invoice.marked_uncollectible",
  "invoice.payment_succeeded",
  "payment_intent.succeeded",
  "payment_intent.payment_failed",
  "payment_intent.canceled",
  "payment_intent.payment_failed",
]

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get("Stripe-Signature") ?? ""

  if (typeof signature !== "string") {
    throw new Error(
      "[STRIPE_WEBHOOK][ERROR]: No signature provided.",
      signature
    )
  }

  const { error, data: event } = await tryCatch(
    stripe.webhooks.constructEventAsync(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    )
  )

  if (error) {
    console.error("[STRIPE_WEBHOOK][ERROR]: ", error)
    return new Response("Webhook Error", { status: 400 })
  }

  await processEvent(event)

  return new Response(null, { status: 200 })
}

async function processEvent(event: Stripe.Event) {
  if (allowedEvents.includes(event.type) === false) {
    console.warn(
      `[STRIPE_WEBHOOK][UNHANDLED_EVENT]: ${event.type} - ${event.id}`
    )
    return
  }

  const { customer: customerId } = event.data.object as {
    customer: string
  }

  if (typeof customerId !== "string") {
    // This means that the event was triggered without a customerID
    console.error(
      "[STRIPE_WEBHOOK][ERROR]: this means that the event was triggered without a customerID."
    )
    throw new Error(
      `[STRIPE_WEBHOOK][INVALID_EVENT]: ${event.type} - ID ${event.id} isn't a string.`
    )
  }

  console.log(
    `[STRIPE_WEBHOOK][EVENT]: ${event.type} - ${customerId} - ${event.id}`
  )

  switch (event.type) {
    case "payment_intent.payment_failed":
      const paymentIntentPaymentFailed = event.data.object
      console.error(
        `❌ Payment failed: ${paymentIntentPaymentFailed.last_payment_error?.message}`
      )
      break
    case "payment_intent.processing":
      const paymentIntentProcessing = event.data.object
      console.log(`⏳ Payment processing: ${paymentIntentProcessing.id}`)
      break
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object
      console.log(`✅ Payment succeeded: ${paymentIntentSucceeded.id}`)

      const paymentIntentId = paymentIntentSucceeded.id
      const orderAmount = paymentIntentSucceeded.amount
      const checkoutItems = paymentIntentSucceeded.metadata
        .items as unknown as CheckoutItemSchema[]

      if (checkoutItems) {
        // if (!event.account) {
        //   console.error(
        //     "[STRIPE_WEBHOOK][ERROR]: No account found for this payment intent."
        //   )
        //   throw new Error("No account found for this payment intent.")
        // }

        const safeParsedItems = await z
          .array(checkoutItemSchema)
          .safeParseAsync(
            JSON.parse(paymentIntentSucceeded.metadata.items ?? "[]")
          )

        if (!safeParsedItems.success) {
          console.error(
            "[STRIPE_WEBHOOK][ERROR]: Failed to parse checkout items.",
            safeParsedItems.error
          )
          throw new Error("Failed to parse checkout items.")
        }

        // TODO: Check if the items are valid and are in stock

        const order = {
          items: safeParsedItems.data,
          quantity: safeParsedItems.data.reduce(
            (acc, item) => acc + item.quantity,
            0
          ),
          amount: orderAmount,
          stripePaymentIntentId: paymentIntentId,
          stripePaymentIntentStatus: paymentIntentSucceeded.status,
          stripeCustomerId: customerId,
          email: paymentIntentSucceeded.customer,
        }

        // TODO: Save the order to the database

        console.log(
          `[STRIPE_WEBHOOK][ORDER]: CREATED NEW ORDER ${JSON.stringify(order, null, 2)}`
        )
      }

      break
  }
}
