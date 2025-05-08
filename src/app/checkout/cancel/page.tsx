import Link from "next/link"

import {
  AlertCircleIcon,
  LifeBuoyIcon,
  ShoppingBagIcon,
  XCircleIcon,
} from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckoutCancelPage() {
  return (
    <div className="from-background to-muted/10 relative min-h-[100dvh] bg-gradient-to-br">
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-muted/15 absolute -left-32 -top-32 h-[28rem] w-[28rem] rotate-12 transform opacity-70 blur-3xl" />
        <div className="bg-muted/15 absolute -bottom-32 -right-32 h-[28rem] w-[28rem] -rotate-12 transform opacity-70 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="mx-auto flex min-h-[100dvh] max-w-2xl flex-col justify-center gap-8 py-20">
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

          <Alert
            variant="destructive"
            className="border-destructive/20 bg-destructive/5 border-2"
          >
            <AlertCircleIcon className="h-5 w-5" />
            <AlertDescription className="ml-2 text-base font-medium">
              Any processed payments will be automatically refunded within 5-10
              business days
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <Link href="/" passHref>
                <div className="group relative block cursor-pointer">
                  <div className="from-primary/20 to-primary/10 absolute -inset-px rounded-lg bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="bg-card relative flex gap-4 rounded-lg border p-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl">
                    <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                      <ShoppingBagIcon className="text-primary h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Try checkout again</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Your cart items are saved. Return anytime to complete
                        your purchase.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/support" passHref>
                <div className="group relative block cursor-pointer">
                  <div className="from-primary/20 to-primary/10 absolute -inset-px rounded-lg bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="bg-card relative flex gap-4 rounded-lg border p-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl">
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
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
