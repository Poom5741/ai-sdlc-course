import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows hero section with headline", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Master AI Coding");
  });

  test("has navigation links to curriculum and community", async ({ page }) => {
    const nav = page.locator("nav");
    await expect(nav.getByRole("link", { name: "Curriculum" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Community" })).toBeVisible();
  });

  test("navigates to community when clicking Community link", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Community" }).click();
    await expect(page).toHaveURL(/\/community/);
  });

  test("shows curriculum section with block cards", async ({ page }) => {
    await page.locator("#curriculum").scrollIntoViewIfNeeded();
    await expect(page.locator("#curriculum")).toContainText("Block 1");
    await expect(page.locator("#curriculum")).toContainText("Block 2");
    await expect(page.locator("#curriculum")).toContainText("Block 3");
  });

  test("shows FAQ section", async ({ page }) => {
    await page.locator("#faq").scrollIntoViewIfNeeded();
    await expect(page.locator("#faq")).toContainText("Frequently");
  });

  test("has BlueBeltDojo branding", async ({ page }) => {
    await expect(
      page.locator("a").filter({ hasText: "BlueBeltDojo" }),
    ).toBeVisible();
  });

  test("has sign in links", async ({ page }) => {
    const signInLinks = page.getByRole("link", { name: /Sign In/i });
    const count = await signInLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
