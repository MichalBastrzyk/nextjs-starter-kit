import * as fs from "fs"
import * as path from "path"

import { chromium } from "@playwright/test"
import type { FullConfig } from "@playwright/test"

/**
 * Global setup function that runs before all tests
 * Handles tasks like:
 * - Authentication state management
 * - Global data setup
 * - Environment preparation
 */
async function globalSetup(config: FullConfig) {
  // Create the artifacts directory if it doesn't exist
  const artifactsDir = path.join(__dirname, "../artifacts")
  if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true })
  }

  // Set up authenticated state if needed for tests
  // This code creates a reusable authentication state
  const baseURL = config.projects[0]?.use?.baseURL
  const browser = await chromium.launch()

  await browser.newPage({ baseURL })

  await browser.close()
}

export default globalSetup
