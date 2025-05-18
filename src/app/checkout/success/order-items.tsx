import Image from "next/image"
import Link from "next/link"

import {
  ArrowLeftIcon,
  CheckIcon,
  LifeBuoyIcon,
  PrinterIcon,
} from "lucide-react"
import type Stripe from "stripe"

import { formatPrice } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

import type { OrderSummary } from "./types"

interface OrderItemsProps {
  items: Stripe.LineItem[]
  orderSummary: OrderSummary
}

export function OrderItems({ items, orderSummary }: OrderItemsProps) {
  return (
    <div className="bg-muted flex flex-1 flex-col gap-6 rounded-t-xl border-x border-t p-6 lg:mt-4 lg:h-[calc(100dvh-1rem)] lg:w-1/2 lg:pt-14">
      <Table className="w-full">
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="flex items-center gap-4">
                {typeof item.price?.product === "object" &&
                  "images" in item.price.product &&
                  item.price.product.images?.[0] && (
                    <div className="relative">
                      <Image
                        src={item.price.product.images[0]}
                        alt={item.description ?? "Product image"}
                        className="h-16 w-16 rounded-md object-cover"
                        width={64}
                        height={64}
                        loading="eager"
                        priority
                      />
                      <Badge className="absolute right-0 top-0 z-50 -translate-y-1/3 translate-x-1/3 text-sm font-semibold">
                        {item.quantity}
                      </Badge>
                    </div>
                  )}
                <span>{item.description}</span>
              </TableCell>
              <TableCell className="text-right">
                {formatPrice(item.amount_total ?? 0, orderSummary.currency)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <dl className="[&_dt]:text-muted-foreground grid grid-cols-2 [&_dd]:text-right [&_dt]:text-sm [&_dt]:font-medium">
        <dt>Subtotal</dt>
        <dd>
          {formatPrice(orderSummary.subtotal * 100, orderSummary.currency)}
        </dd>

        <dt>Shipping</dt>
        <dd>
          {formatPrice(orderSummary.shipping * 100, orderSummary.currency)}
        </dd>
      </dl>

      <dl className="grid grid-cols-2">
        <dt className="text-xl font-semibold">Total</dt>
        <dd className="text-md text-right font-medium">
          {formatPrice(orderSummary.total * 100, orderSummary.currency)}
        </dd>
      </dl>

      <Separator />

      <div className="flex flex-col gap-2">
        <div className="flex flex-col justify-between lg:flex-row">
          <p>
            Estimated arrival:&nbsp;
            <span className="font-semibold">
              {
                /* TODO: Write buisness logic to calculate the estimated time of arrival */
                new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })
              }
            </span>
          </p>
          <p className="flex items-center gap-1">
            <CheckIcon size={16} className="text-emerald-600" /> Easy returns
            within 30 days.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-3 pt-2 lg:flex-row">
        <Button asChild>
          <Link href="/">
            <ArrowLeftIcon size={16} />
            Continue shopping
          </Link>
        </Button>
        <Button variant="outline" className="hidden lg:inline-flex">
          <PrinterIcon size={16} />
          Print Receipt
        </Button>
        <Button variant="link">
          <LifeBuoyIcon size={16} />
          Need help? Contact us
        </Button>
      </div>
    </div>
  )
}
