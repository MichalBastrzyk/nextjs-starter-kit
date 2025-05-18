import Image from "next/image"

import { PrinterIcon } from "lucide-react"
import type Stripe from "stripe"

import { formatPhone } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OrderDetailsProps {
  session: Stripe.Checkout.Session
  paymentMethod: Stripe.PaymentMethod
}

export function OrderDetails({ session, paymentMethod }: OrderDetailsProps) {
  return (
    <Card className="gap-4 lg:gap-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-2xl">
          <span>Order Summary</span>
          <Button variant="outline" size="sm" className="lg:hidden">
            <PrinterIcon size={16} />
            <span className="sr-only">Print receipt</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 lg:gap-4">
        <div>
          <h3 className="text-lg font-semibold">Contact information</h3>
          <p className="text-muted-foreground text-sm">
            {session.customer_details?.email ?? "Email not provided"}
            {session.customer_details?.phone && (
              <>
                <br />
                {formatPhone(session.customer_details?.phone)}
              </>
            )}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Payment method</h3>
          <p className="text-muted-foreground flex items-center gap-1 text-sm">
            {paymentMethod && (
              <>
                {paymentMethod.type === "card" ? (
                  <>
                    <Image
                      src={`/payment-methods/${paymentMethod.card?.brand}.svg`}
                      alt={`${paymentMethod.card?.brand} logo`}
                      width={32}
                      height={32}
                      className="inline-block object-contain"
                    />
                    <span className="text-muted-foreground uppercase">
                      •••• {paymentMethod.card?.last4}
                    </span>
                  </>
                ) : (
                  <>
                    <Image
                      src={`/payment-methods/${paymentMethod.type}.svg`}
                      alt={`${paymentMethod.type} logo`}
                      width={32}
                      height={32}
                      className="inline-block object-contain"
                      loading="eager"
                      priority
                    />
                    &nbsp;
                    <span className="text-muted-foreground capitalize">
                      {paymentMethod.type}
                    </span>
                  </>
                )}
              </>
            )}
          </p>
        </div>

        <AddressSection
          title="Billing address"
          details={session.customer_details}
        />
        <AddressSection
          title="Shipping address"
          details={session.customer_details}
        />
      </CardContent>
    </Card>
  )
}

interface AddressSectionProps {
  title: string
  details: Stripe.Checkout.Session.CustomerDetails | null
}

function AddressSection({ title, details }: AddressSectionProps) {
  if (!details) return null

  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground text-sm">
        {details.name ?? "Name not provided"}
        <br />
        {details.address?.line1 ?? "Address not provided"}
        {details.address?.line2 && (
          <>
            <br />
            {details.address.line2}
          </>
        )}
        <br />
        {details.address?.city ?? "City not provided"}
        {details.address?.state && <>, {details.address.state}</>}{" "}
        {details.address?.postal_code ?? "Postal code not provided"}
        {details.address?.country && (
          <>
            <br />
            {details.address.country}
          </>
        )}
        {details.phone && (
          <>
            <br />
            {formatPhone(details.phone)}
          </>
        )}
      </p>
    </div>
  )
}
