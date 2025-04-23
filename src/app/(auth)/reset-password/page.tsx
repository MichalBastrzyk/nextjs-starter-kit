import * as React from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export default function ResetPassword() {
  return (
    <React.Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
      <ResetPasswordForm />
    </React.Suspense>
  )
}
