import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { siteConfig } from "@/config/site"

import { cn, formatDate, getBaseUrl } from "./utils"

// Mock siteConfig
vi.mock("@/config/site", () => ({
  siteConfig: {
    locale: "en-US",
  },
}))

describe("cn", () => {
  it("should merge class names correctly", () => {
    expect(cn("bg-red-500", "text-white")).toBe("bg-red-500 text-white")
  })

  it("should handle conditional classes", () => {
    expect(cn("bg-red-500", { "text-white": true, "font-bold": false })).toBe(
      "bg-red-500 text-white"
    )
  })

  it("should override conflicting classes with tailwind-merge", () => {
    expect(cn("p-4", "p-2")).toBe("p-2")
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500")
  })

  it("should handle various input types", () => {
    expect(
      cn(
        "base",
        ["p-4", "m-2"],
        { "text-center": true },
        null,
        undefined,
        false && "hidden"
      )
    ).toBe("base p-4 m-2 text-center")
  })
})

describe("getBaseUrl", () => {
  const originalWindow = global.window
  const originalProcessEnv = process.env

  beforeEach(() => {
    // Reset mocks before each test
    vi.resetModules()
    process.env = { ...originalProcessEnv }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete global.window
  })

  afterEach(() => {
    // Restore original environment
    global.window = originalWindow
    process.env = originalProcessEnv
  })

  it("should return window.location.origin when window is defined", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    global.window = { location: { origin: "http://client.com" } }
    expect(getBaseUrl()).toBe("http://client.com")
  })

  it("should return VERCEL_URL when defined and window is not", () => {
    process.env.VERCEL_URL = "test.vercel.app"
    expect(getBaseUrl()).toBe("https://test.vercel.app")
  })

  it("should return localhost with default port when VERCEL_URL is not defined and window is not", () => {
    delete process.env.VERCEL_URL
    delete process.env.PORT
    expect(getBaseUrl()).toBe("http://localhost:3000")
  })

  it("should return localhost with specified PORT when VERCEL_URL is not defined and window is not", () => {
    delete process.env.VERCEL_URL
    process.env.PORT = "4000"
    expect(getBaseUrl()).toBe("http://localhost:4000")
  })
})

describe("formatDate", () => {
  it("should return an empty string if date is undefined or null", () => {
    expect(formatDate(undefined)).toBe("")

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(formatDate(null)).toBe("")
  })

  it("should format a Date object with default options", () => {
    const date = new Date(2023, 9, 26) // October 26, 2023
    expect(formatDate(date)).toBe("October 26, 2023")
  })

  it("should format a date string with default options", () => {
    const dateString = "2023-10-26T10:00:00.000Z"
    expect(formatDate(dateString)).toBe("October 26, 2023")
  })

  it("should format a timestamp number with default options", () => {
    const timestamp = new Date(2023, 9, 26).getTime()
    expect(formatDate(timestamp)).toBe("October 26, 2023")
  })

  it("should format a date with custom options", () => {
    const date = new Date(2023, 9, 26)
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "2-digit",
      year: "2-digit",
    }
    expect(formatDate(date, options)).toBe("Oct 26, 23")
  })

  it("should format a date with only month and year", () => {
    const date = new Date(2023, 9, 26)
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      year: "numeric",
      day: undefined,
    }
    expect(formatDate(date, options)).toBe("October 2023")
  })

  it("should return an empty string for invalid date input", () => {
    expect(formatDate("invalid-date-string")).toBe("")
    expect(formatDate(NaN)).toBe("")
  })

  it("should handle different locales if siteConfig changes (mocked)", () => {
    vi.mocked(siteConfig).locale = "en" // Change mocked locale
    const date = new Date(2023, 9, 26) // October 26, 2023
    // Note: The exact output depends on the Node.js Intl implementation
    expect(formatDate(date)).toBe("October 26, 2023")
  })
})
