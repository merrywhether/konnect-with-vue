import { defineConfig, devices } from '@playwright/experimental-ct-vue'
import { fileURLToPath } from 'node:url'

/**
 * Component Testing configuration (separate from the e2e config in playwright.config.ts).
 * Run with: pnpm test:ct
 *
 * Tests live colocated with their components, e.g. lib/modals/BaseModal.ct.ts.
 */
export default defineConfig({
  testDir: './',
  testMatch: '**/*.ct.ts',
  outputDir: './test-results/ct',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'html' : 'list',

  use: {
    ctPort: 3100,
    // Re-use the same alias and SCSS variable setup as the main Vite config,
    // but omit plugins (CT injects its own Vue plugin).
    ctViteConfig: {
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            api: 'modern-compiler',
            additionalData: [
              '$bp-sm: 768px;',
              '$bp-md: 1024px;',
              '$bp-lg: 1200px;',
            ].join('\n'),
          },
        },
      },
    },
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
})
