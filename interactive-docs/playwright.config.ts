import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: false,
      },
    },
  ],
  // Serve the true production-equivalent: build the static site, then serve it
  // + the Cloudflare Pages Functions (which provide the API endpoints) via
  // wrangler's local pages dev runtime. `astro dev` 404s the standalone app
  // pages (login/pricing/etc.) due to a Starlight dev quirk, and `astro preview`
  // does not run the /api/* functions — so wrangler is the accurate target.
  webServer: {
    command: 'npm run build && npx wrangler pages dev dist --port 4321',
    port: 4321,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
  // API tests that need real auth data run against wrangler's local D1/KV.
  // Standalone app pages (login/pricing/dashboard) use mocked routes so no
  // backend state is required to exercise the UI.

});
