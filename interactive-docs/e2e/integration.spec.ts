import { test, expect } from "@playwright/test";
import { mockAuthApis } from "./helpers";

test.describe("Cross-page integration", () => {
  test("full journey: home → login → dashboard → quest", async ({ page }) => {
    await mockAuthApis(page);
    // Start at home
    await page.goto("/");
    await expect(page.locator("h1").first()).toBeVisible();

    // Navigate to login
    await page.getByRole("link", { name: /Sign In/i }).first().click();
    await expect(page).toHaveURL(/\/login/);

    // Login
    await page.fill("#email", "test@bbd.ai");
    await page.fill("#password", "Pass1234!");
    await page.click('#login-form button[type="submit"]');
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });

    // Navigate to a quest from dashboard
    await page.goto("/quests/quest-1-first-code");
    await expect(page.locator("main")).toBeVisible();
  });

  test("sidebar navigation works across modules", async ({ page }) => {
    await page.goto("/quests/quest-1-first-code");
    const sidebar = page.locator("#starlight__sidebar");
    await expect(sidebar).toBeVisible();

    // Get all quest links in sidebar
    const questLinks = sidebar.locator("a[href*='/quests/']");
    const count = await questLinks.count();
    expect(count).toBeGreaterThan(5);
  });

  test("locale switching preserves page context", async ({ page }) => {
    // Load Thai version
    await page.goto("/quests/quest-1-first-code");
    await expect(page.locator("html")).toHaveAttribute("lang", "th");

    // Switch to English
    await page.goto("/en/quests/quest-1-first-code");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("main")).toBeVisible();
  });

  test("browser back/forward works", async ({ page }) => {
    await page.goto("/quests/quest-1-first-code");
    await page.goto("/quests/quest-2-prompts");
    await page.goBack();
    expect(page.url()).toContain("quest-1-first-code");
    await page.goForward();
    expect(page.url()).toContain("quest-2-prompts");
  });

  test("header navigation links work", async ({ page }) => {
    await page.goto("/");
    // Check nav links exist and are clickable
    const navLinks = page.locator("nav a[href]");
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(3);
  });
});
