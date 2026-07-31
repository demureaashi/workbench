import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 45_000,
  expect: {
    timeout: 7_500
  },
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],
  use: {
    baseURL: "http://127.0.0.1:4174",
    browserName: "chromium",
    channel: "chrome",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off"
  },
  webServer: {
    command: "python3 -m http.server 4174",
    url: "http://127.0.0.1:4174",
    reuseExistingServer: true,
    timeout: 15_000
  },
  projects: [
    {
      name: "chromium-desktop",
      use: { viewport: { width: 1440, height: 980 } }
    },
    {
      name: "chromium-tablet",
      use: { viewport: { width: 1024, height: 768 }, isMobile: false, hasTouch: true }
    },
    {
      name: "chromium-mobile",
      use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }
    }
  ]
});
