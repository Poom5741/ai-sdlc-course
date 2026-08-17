import { test, expect } from "@playwright/test";

test.describe("Sitemap page", () => {
  test("sitemap loads and shows page sections", async ({ page }) => {
    await page.goto("/sitemap");
    await expect(page.locator("main, body").first()).toBeVisible();
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("sitemap has links to main sections", async ({ page }) => {
    await page.goto("/sitemap");
    // Should have links to major sections
    const links = page.locator("a[href]");
    const count = await links.count();
    expect(count).toBeGreaterThan(5);
  });
});
