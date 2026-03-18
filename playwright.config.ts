import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './',
  testMatch: '**/*.e2e.ts',
  outputDir: './test-results',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: process.env.CI ? 'html' : 'list',

  use: {
    baseURL: 'http://localhost:5173',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  webServer: [
    {
      command: 'pnpm dev:server',
      port: 4001,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'pnpm dev:ui',
      port: 5173,
      reuseExistingServer: !process.env.CI,
    },
  ],
})
