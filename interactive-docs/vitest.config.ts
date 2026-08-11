import { defineConfig } from 'vitest/config'

// Unit tests only. Playwright e2e specs live in e2e/** and run via
// `mise run test-e2e` (npx playwright test), not under vitest.
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
    exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
  },
})
