import { expect, test } from "@playwright/test"

import {
  expectToast,
  safelyFillInput,
  waitForPageStability,
} from "@e2e/utils/test-helpers"

test.describe("Authentication flows", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the login page before each test
    await page.goto("/sign-in")
    await waitForPageStability(page)
  })

  test("login page loads correctly", async ({ page }) => {
    // Check that login form elements are visible
    await expect(page.locator("[data-slot='card-title']")).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible()

    // Check for forgot password link
    await expect(
      page.getByRole("link", { name: /forgot your password/i })
    ).toBeVisible()

    // Check for sign up link
    await expect(page.getByRole("link", { name: /sign up/i })).toBeVisible()
  })

  test("should show validation errors for empty form submission", async ({
    page,
  }) => {
    // Click sign in without entering credentials
    await page.getByRole("button", { name: /sign in/i }).click()
    await waitForPageStability(page)

    // Check for validation errors for both email and password fields
    // Locate the specific form item div for the input, then find the error message within it.
    const emailError = page.locator(
      'div[data-slot="form-item"]:has(input[name="email"]) p[data-slot="form-message"]'
    )
    const passwordError = page.locator(
      'div[data-slot="form-item"]:has(input[name="password"]) p[data-slot="form-message"]'
    )

    await expect(emailError).toBeVisible()
    // Use the specific error message from the HTML provided
    // Adjust if the actual message for empty field is different (e.g., "Required")
    await expect(emailError).toHaveText("Invalid email")

    await expect(passwordError).toBeVisible()
    // Use the specific error message from the HTML provided
    await expect(passwordError).toHaveText("Password is required")
  })

  test("should show error for invalid credentials", async ({ page }) => {
    // Fill in form with invalid credentials
    await safelyFillInput(page, 'input[name="email"]', "invalid@example.com")
    await safelyFillInput(page, 'input[name="password"]', "wrongpassword")

    // Submit the form
    await page.getByRole("button", { name: /sign in/i }).click()
    await waitForPageStability(page)

    // Check for error message
    await expectToast(page, "Invalid email or password")
  })

  test("should handle signup flow", async ({ page }) => {
    // Navigate to signup page
    await page.getByRole("link", { name: /sign up/i }).click()
    await waitForPageStability(page)

    // Verify we're on signup page
    await expect(page).toHaveURL(/sign-?up/i)

    // Fill out the registration form
    const uniqueEmail = `test-${Date.now()}@example.com`
    await safelyFillInput(page, 'input[name="email"]', uniqueEmail)
    await safelyFillInput(page, 'input[name="password"]', "Password123!")

    // Submit the form - note we're not actually going to complete registration
    // This is just testing the UI flow up to submission
    await page
      .getByRole("button", { name: /sign up|register|create account/i })
      .click()

    // In a real test, we would verify successful registration
    // For now, we're just checking that the form submission appeared to work
    await waitForPageStability(page)

    // TODO: Verify that the user is redirected to the correct page after signup
    // TODO: Verify that a confirmation email is sent (if applicable)
    // TODO: Verify that the user was signed up
  })

  test("should allow navigation between login and signup", async ({ page }) => {
    // Navigate to signup page
    await page.getByRole("link", { name: /sign up/i }).click()
    await waitForPageStability(page)

    // Verify we're on signup page
    await expect(page).toHaveURL(/sign-?up/i)

    // Go back to login
    await page.getByRole("link", { name: /sign in|log in|login/i }).click()
    await waitForPageStability(page)

    // Verify we're back on login page
    await expect(page).toHaveURL(/login|sign-?in/i)
  })
})
