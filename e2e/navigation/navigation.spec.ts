import { expect, test } from "@playwright/test"

import { waitForPageStability } from "@e2e/utils/test-helpers"

test.describe("Basic navigation", () => {
  test("should load the home page successfully", async ({ page }) => {
    // Navigate to home page
    await page.goto("/")

    // Wait for the page to be fully loaded and stable
    await waitForPageStability(page)

    // Verify page title is correct
    await expect(page).toHaveTitle(/Commerce/)

    // Verify page has loaded the main heading
    const heading = page.getByRole("heading", { level: 1 })
    await expect(heading).toBeVisible()

    // Check for key UI elements
    await expect(page.getByRole("link", { name: /github/i })).toBeVisible()
  })
})
