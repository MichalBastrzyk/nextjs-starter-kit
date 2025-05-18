import { redirect } from "next/navigation"

import { CheckCircleIcon } from "lucide-react"
import type Stripe from "stripe"

import { stripe } from "@/server/stripe"

import { OrderDetails } from "./order-details"
import { OrderItems } from "./order-items"
import { TimelineCard } from "./order-timeline"
import type { OrderStatus } from "./types"

interface CheckoutSuccessPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function CheckoutSuccessPage({
  searchParams: searchParamsPromise,
}: CheckoutSuccessPageProps) {
  const searchParams = await searchParamsPromise
  const sessionId = searchParams.session_id

  if (!sessionId || typeof sessionId !== "string") {
    redirect("/")
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: [
      "line_items.data.price.product",
      "payment_intent.payment_method",
      "customer",
    ],
  })

  if (session.payment_intent === null) {
    console.error("Payment intent is null")
    throw new Error("Payment intent is null")
  }

  const paymentIntent = session.payment_intent as Stripe.PaymentIntent
  const paymentMethod = paymentIntent.payment_method as Stripe.PaymentMethod
  const items = session.line_items?.data ?? []

  const subtotal =
    (session.line_items?.data.reduce(
      (acc, item) => acc + item.amount_subtotal,
      0
    ) ?? 0) / 100
  const shipping = (session.shipping_cost?.amount_total ?? 0) / 100
  const total = (session.amount_total ?? 0) / 100
  const currency = session.currency?.toUpperCase() ?? "USD"

  let timelineStep = 0

  const status: OrderStatus[] = [
    {
      id: 1,
      title: "Order Placed",
      date: null,
    },
    {
      id: 2,
      title: "Processing",
      date: null,
    },
    {
      id: 3,
      title: "Ready for Shipment",
      date: null,
    },
    {
      id: 4,
      title: "Shipped",
      date: null,
    },
    {
      id: 5,
      title: "Delivered",
      date: null,
    },
  ]

  if (session.payment_status === "paid" && session.created) {
    if (status[0]) status[0].date = new Date(session.created * 1000)
    timelineStep++
  }

  return (
    <div className="container flex min-h-screen flex-col gap-4 lg:flex-row lg:gap-8">
      <div className="flex flex-col gap-4 lg:w-1/2">
        <div className="flex items-center justify-start gap-4 pt-6 lg:pt-20">
          <CheckCircleIcon size={48} className="text-primary row-span-2" />
          <div className="flex flex-col">
            <p>Confirmation #{session.id.slice(8, 12)}</p>
            <h1 className="text-3xl font-bold">
              Thank you,&nbsp;
              {session.customer_details?.name?.split(" ")[0] ??
                "for your order"}
              !
            </h1>
          </div>
        </div>

        <TimelineCard status={status} timelineStep={timelineStep} />
        <OrderDetails session={session} paymentMethod={paymentMethod} />
      </div>

      <OrderItems
        items={items}
        orderSummary={{ subtotal, shipping, total, currency }}
      />
    </div>
  )
}
