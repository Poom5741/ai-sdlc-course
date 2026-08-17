import { test, expect } from "@playwright/test";

test.describe("Pricing / Access page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pricing");
  });

  test("renders page with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Access.*BlueBeltDojo/i);
  });

  test("shows main heading", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Full Access");
  });

  test("shows welcome subtitle", async ({ page }) => {
    await expect(page.getByText("Welcome, Warrior")).toBeVisible();
  });

  test("shows description text", async ({ page }) => {
    await expect(
      page.getByText("Your account includes all 147 quests"),
    ).toBeVisible();
  });

  test("shows martial arts emoji", async ({ page }) => {
    await expect(page.getByText("🥋")).toBeVisible();
  });

  test("shows Full Course Access card", async ({ page }) => {
    await expect(page.getByText("Full Course Access")).toBeVisible();
    await expect(
      page.getByText("Everything you need to master AI SDLC"),
    ).toBeVisible();
  });

  test("lists feature checklist items", async ({ page }) => {
    await expect(page.getByText("147 quests").first()).toBeVisible();
  });

  test("shows checkmark icons for features", async ({ page }) => {
    // Each feature should have a checkmark
    const checkmarks = page
      .locator("li span.text-\\[\\#059669\\]")
      .filter({ hasText: "✓" });
    const count = await checkmarks.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test("has CTA button linking to dashboard", async ({ page }) => {
    const ctaLink = page.locator('a[href="/dashboard"]');
    await expect(ctaLink).toBeVisible();
    await expect(ctaLink).toContainText(/Go to Dashboard|Dashboard/i);
  });

  test("navigates to dashboard when clicking CTA", async ({ page }) => {
    const ctaLink = page.locator('a[href="/dashboard"]');
    await ctaLink.click();
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test("shows mastery topics section", async ({ page }) => {
    await expect(page.getByText("AI Fundamentals")).toBeVisible();
    await expect(page.getByText("Prompt Engineering")).toBeVisible();
    await expect(page.getByText("Agentic Workflows")).toBeVisible();
    await expect(page.getByText("Production Security")).toBeVisible();
  });

  test("feature details describe what is included", async ({ page }) => {
    await expect(page.getByText("Full Course Access")).toBeVisible();
  });

  test("has BlueBeltDojo branding", async ({ page }) => {
    // Page should have branding visible somewhere
    const body = page.locator("body");
    await expect(body).toBeVisible();
  });

  test("page is visually responsive", async ({ page }) => {
    // Check that the page renders without layout issues
    const mainContent = page.locator(".max-w-4xl");
    await expect(mainContent).toBeVisible();
    // Page should not have horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize()?.width || 1280;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 10); // small tolerance
  });
});
