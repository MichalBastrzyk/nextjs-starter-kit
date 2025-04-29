import { defineConfig, devices } from "@playwright/test"

// Use process.env.PORT for dynamic port assignment
const PORT = process.env.PORT ?? 3000
// Set the test URL to localhost with the defined port
const baseURL = `http://localhost:${PORT}`

export default defineConfig({
  // Look for test files in these directories with these file extensions
  testDir: "./e2e",
  testMatch: "**/*.spec.ts",

  // Directory for test results artifacts like traces, screenshots, videos
  outputDir: "./temp/playwright-results",

  // Maximum time one test can run for
  timeout: 30 * 1000,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry tests on CI to reduce flakiness
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: [
    ["html", { outputFolder: "./temp/playwright-report", open: "never" }],
    ["list"],
  ],

  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL,

    // Collect trace when retrying the failed test
    trace: "on-first-retry",

    // Record video only for failing tests

    // Record video only for failing tests
    video: "on-first-retry",

    // Record screenshots only for failing tests

    // Record screenshots only for failing tests
    screenshot: "only-on-failure",
  },

  // Configure projects for major browsers
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    // Mobile viewports
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  // Run local development server before starting the tests
  webServer: {
    command: "pnpm dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    stdout: "pipe",
    stderr: "pipe",
  },
})
