import * as React from "react"

import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { SiteHeader } from "./site-header"

vi.mock("@/components/auth/user-button", () => ({
  UserButton: () => <div data-testid="user-button">UserButton</div>,
}))

afterEach(() => {
  cleanup()
})

describe("SiteHeader", () => {
  it("renders the header component", () => {
    render(<SiteHeader />)

    expect(screen.getByRole("banner")).toBeDefined()
  })

  it("displays the site title on desktop", () => {
    render(<SiteHeader />)
    expect(screen.getByText("Commerce")).toBeDefined()
  })

  it("contains a link to the homepage", () => {
    render(<SiteHeader />)
    expect(
      screen.getByRole("link", { name: "Home" }).getAttribute("href")
    ).toEqual("/")
  })

  it("renders the user button", () => {
    render(<SiteHeader />)
    expect(screen.getByTestId("user-button")).toBeDefined()
  })

  it("applies custom className when provided", () => {
    render(<SiteHeader className="custom-class" />)
    expect(
      screen.getByRole("banner").className.includes("custom-class")
    ).toBeTruthy()
  })
})
