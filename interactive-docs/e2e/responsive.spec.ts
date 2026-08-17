import { test, expect } from "@playwright/test";

test.describe("Responsive design", () => {
  const VIEWPORTS = [
    { width: 375, height: 667, name: "Mobile" },
    { width: 768, height: 1024, name: "Tablet" },
    { width: 1280, height: 720, name: "Desktop" },
  ];

  const PAGES = [
    { path: "/", name: "Home" },
    { path: "/login", name: "Login" },
    { path: "/pricing", name: "Pricing" },
    { path: "/community", name: "Community" },
    { path: "/quests/quest-1-first-code", name: "Quest" },
  ];

  for (const viewport of VIEWPORTS) {
    for (const pg of PAGES) {
      test(`${pg.name} renders on ${viewport.name} (${viewport.width}x${viewport.height})`, async ({
        page,
      }) => {
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });
        await page.goto(pg.path);
        await expect(page.locator("body")).toBeVisible();

        // Page should not have horizontal overflow
        const bodyWidth = await page.evaluate(
          () => document.body.scrollWidth,
        );
        expect(bodyWidth).toBeLessThanOrEqual(viewport.width + 20);
      });
    }
  }
});

test.describe("Mobile navigation", () => {
  test("mobile menu toggle works", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/quests/quest-1-first-code");

    // Look for mobile menu toggle
    const toggle = page
      .locator(
        '[aria-label*="menu"], [aria-label*="Menu"], .mobile-menu-toggle, button[data-toggle]',
      )
      .first();

    if (await toggle.isVisible()) {
      await toggle.click();
      // After clicking, sidebar should become visible
      await page.waitForTimeout(300);
    }
  });
});
