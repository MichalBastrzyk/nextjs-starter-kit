import Link from "next/link"

import {
  AlertCircleIcon,
  ArrowLeftIcon,
  LifeBuoyIcon,
  ShoppingBagIcon,
  XCircleIcon,
} from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function CheckoutCancelPage() {
  return (
    <div className="from-background to-muted/20 relative min-h-[100dvh] bg-gradient-to-b">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-0 h-72 w-72 bg-red-500/5 blur-3xl" />
        <div className="absolute -right-4 bottom-0 h-72 w-72 bg-red-500/5 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="mx-auto flex min-h-[100dvh] max-w-2xl flex-col justify-center gap-8 py-20">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="animate-ping-slow bg-destructive/20 absolute inset-0 rounded-full" />
              <div className="bg-destructive/10 relative flex h-20 w-20 items-center justify-center rounded-full">
                <XCircleIcon size={48} className="text-destructive" />
              </div>
            </div>
            <h1 className="mb-2 text-4xl font-bold tracking-tight">
              Order Cancelled
            </h1>
            <p className="text-muted-foreground text-lg">
              Your order has been cancelled and no payment has been processed
            </p>
          </div>

          {/* Alert Section */}
          <Alert
            variant="destructive"
            className="border-destructive/20 bg-destructive/5 border-2 shadow-lg"
          >
            <AlertCircleIcon className="h-5 w-5" />
            <AlertDescription className="ml-2 text-base font-medium">
              Any processed payments will be automatically refunded within 5-10
              business days
            </AlertDescription>
          </Alert>

          {/* Options Card */}
          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              {/* Option 1 */}
              <div className="group relative">
                <div className="from-muted to-muted/50 absolute -inset-px rounded-lg bg-gradient-to-r opacity-0 transition group-hover:opacity-100" />
                <div className="bg-card relative flex gap-4 rounded-lg border p-4">
                  <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                    <ShoppingBagIcon className="text-primary h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Try checkout again</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Your cart items are saved. Return anytime to complete your
                      purchase.
                    </p>
                  </div>
                </div>
              </div>

              {/* Option 2 */}
              <div className="group relative">
                <div className="from-muted to-muted/50 absolute -inset-px rounded-lg bg-gradient-to-r opacity-0 transition group-hover:opacity-100" />
                <div className="bg-card relative flex gap-4 rounded-lg border p-4">
                  <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                    <LifeBuoyIcon className="text-primary h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Need assistance?</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Our support team is ready to help with any checkout
                      issues.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-2" />

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="sm:max-w-[240px] sm:flex-1">
              <Link href="/">
                <ArrowLeftIcon size={18} className="mr-2" />
                Return to Cart
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="sm:max-w-[240px] sm:flex-1"
            >
              <LifeBuoyIcon size={18} className="mr-2" />
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
