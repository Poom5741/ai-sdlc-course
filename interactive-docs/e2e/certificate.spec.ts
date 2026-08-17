import { test, expect } from "@playwright/test";

test.describe("Certificate page", () => {
  test("certificate page loads", async ({ page }) => {
    const response = await page.goto("/certificate/placeholder");
    expect(response?.status()).toBeLessThan(500);
    await expect(page.locator("body")).toBeVisible();
  });

  test("certificate page shows content", async ({ page }) => {
    await page.goto("/certificate/placeholder");
    // Page should have some content visible
    await expect(page.locator("body")).toBeVisible();
  });
});
