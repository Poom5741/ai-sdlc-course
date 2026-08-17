import { test, expect } from "@playwright/test";

test.describe("Verify Certificate page", () => {
  test("verify page loads", async ({ page }) => {
    const response = await page.goto("/verify/placeholder");
    expect(response?.status()).toBeLessThan(500);
    await expect(page.locator("body")).toBeVisible();
  });

  test("verify page shows content", async ({ page }) => {
    await page.goto("/verify/placeholder");
    await expect(page.locator("body")).toBeVisible();
  });
});
