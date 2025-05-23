import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { siteConfig } from "@/config/site"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export function formatDate(
  date: Date | string | number | undefined,
  opts: Intl.DateTimeFormatOptions = {}
) {
  if (!date) return ""

  try {
    return new Intl.DateTimeFormat(siteConfig.locale, {
      month: opts.month ?? "long",
      day: opts.day ?? "numeric",
      year: opts.year ?? "numeric",
      ...opts,
    }).format(new Date(date))
  } catch (e) {
    console.error("formatDate error:", e)
    return ""
  }
}

export const formatPrice = (amount: number, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount / 100)
}

export function formatPhone(phone: string): string {
  if (phone.length !== 12) return phone
  return `${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6, 9)} ${phone.slice(9)}`
}
