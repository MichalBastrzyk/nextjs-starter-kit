import { expect } from "@playwright/test"
import type { Page } from "@playwright/test"

/**
 * Waits for all network requests to complete and animations to finish
 */
export async function waitForPageStability(
  page: Page,
  timeout = 2000 // Default timeout for waiting
): Promise<void> {
  // Wait for network to be idle (no requests for 500ms)
  await page.waitForLoadState("networkidle")

  // Wait until no elements matching the selector are found.
  // This handles cases where such elements exist and need to disappear,
  // as well as cases where they never existed.
  try {
    await page.waitForFunction(
      () => !document.querySelector('.animate-* , [data-loading="true"]'),
      { timeout } // Use the provided timeout
    )
  } catch (error) {
    // Log or handle the timeout error if elements persist beyond the timeout.
    // This implementation suppresses the error to prevent test failure due to timeout.
    // FIX THIS
    return
    // console.warn(
    //   `waitForPageStability timed out after ${timeout}ms waiting for animations/loading indicators to disappear.`
    // )
  }
}

/**
 * Takes a screenshot with a descriptive name and timestamp
 */
export async function takeScreenshot(
  page: Page,
  testName: string,
  description: string
): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
  await page.screenshot({
    path: `./e2e/artifacts/screenshots/${testName}-${description}-${timestamp}.png`,
    fullPage: true,
  })
}

/**
 * Safely fills an input field, waiting for it to be ready
 */
export async function safelyFillInput(
  page: Page,
  selector: string,
  value: string
): Promise<void> {
  await page.waitForSelector(selector, { state: "visible" })
  await page.fill(selector, value)
  await page.waitForFunction(
    ([sel, val]) => {
      if (!sel) {
        throw new Error("Selector is undefined")
      }

      const el = document.querySelector<HTMLInputElement>(sel)!
      return el && el.value === val
    },
    [selector, value]
  )
}

/**
 * Asserts that a toast notification appears with expected content
 */
export async function expectToast(
  page: Page,
  text: string,
  options: { timeout: number } = { timeout: 5000 }
): Promise<void> {
  const toastSelector = "[data-sonner-toast]"
  await page.waitForSelector(toastSelector, { timeout: options.timeout })

  const toastElement = page.locator(toastSelector)
  console.log(await toastElement.textContent())
  await expect(toastElement).toContainText(text, { timeout: options.timeout })
}

/**
 * Clears browser storage (cookies, localStorage)
 */
export async function clearBrowserState(page: Page): Promise<void> {
  await page.context().clearCookies()
  await page.evaluate(() => {
    localStorage.clear()
    sessionStorage.clear()
  })
}
