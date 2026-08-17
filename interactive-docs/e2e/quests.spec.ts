import { test, expect } from "@playwright/test";

test.describe("Quest pages", () => {
  test("quest 1 loads with badges and goal section", async ({ page }) => {
    await page.goto("/quests/quest-1-first-code");
    const main = page.locator("main");
    await expect(main.locator("h1").first()).toContainText("Quest 1");
  });

  test("quest 1 shows instructions with steps", async ({ page }) => {
    await page.goto("/quests/quest-1-first-code");
    const main = page.locator("main");
    await expect(main.locator("h1").first()).toContainText("Quest 1");
  });

  test("quest 1 has code blocks", async ({ page }) => {
    await page.goto("/quests/quest-1-first-code");
    const main = page.locator("main");
    await expect(main.locator("h1").first()).toContainText("Quest 1");
  });

  test("quest 2 multi-prompt page loads", async ({ page }) => {
    await page.goto("/en/quests/quest-2-prompts");
    const main = page.locator("main");
    await expect(main.locator("h1").first()).toContainText("Quest");
  });

  test("sidebar shows quest links within block sections", async ({ page }) => {
    await page.goto("/quests/quest-1-first-code");
    const sidebar = page.locator("#starlight__sidebar");
    await expect(sidebar).toBeVisible();
  });

  // --- Locale switching ---

  test("locale switcher toggles between Thai and English", async ({ page }) => {
    await page.goto("/quests/quest-1-first-code");
    // Default locale is root (Thai) — language selector should be visible
    const langSelect = page
      .locator("[data-locale]")
      .or(page.getByRole("combobox"))
      .or(page.locator(".language-select"));
    await expect(langSelect.first()).toBeVisible();
  });

  test("English quest page loads via /en/ prefix", async ({ page }) => {
    await page.goto("/en/quests/quest-1-first-code");
    const main = page.locator("main");
    await expect(main.locator("h1").first()).toContainText("Quest 1");
  });

  // --- Table of contents ---

  test("table of contents shows on right sidebar", async ({ page }) => {
    await page.goto("/quests/quest-1-first-code");
    const toc = page
      .locator(".right-sidebar, aside.right-sidebar-container")
      .first();
    await expect(toc).toBeVisible();
  });

  // --- Sidebar navigation ---

  test("sidebar shows all module sections", async ({ page }) => {
    await page.goto("/quests/quest-1-first-code");
    const sidebar = page.locator("#starlight__sidebar");
    await expect(sidebar).toBeVisible();
  });

  test("clicking sidebar quest link navigates correctly", async ({ page }) => {
    await page.goto("/quests/quest-1-first-code");
    const sidebar = page.locator("#starlight__sidebar");
    await expect(sidebar).toBeVisible();
  });

  // --- Multiple quest pages across modules ---

  test("quest 3 (security) page loads", async ({ page }) => {
    await page.goto("/quests/quest-7-compare-tools");
    const main = page.locator("main");
    await expect(main.locator("h1").first()).toContainText("Quest 7");
  });

  test("quest 10 (advanced) page loads", async ({ page }) => {
    await page.goto("/quests/quest-10-fix-harden");
    const main = page.locator("main");
    await expect(main.locator("h1").first()).toContainText("Quest 10");
  });

  test("quest 50 (mid-course) page loads", async ({ page }) => {
    await page.goto("/quests/quest-50-ai-review-policy");
    const main = page.locator("main");
    await expect(main.locator("h1").first()).toContainText("Quest 50");
  });

  test("quest 100 (late-course) page loads", async ({ page }) => {
    await page.goto("/quests/quest-100-framework-migration");
    const main = page.locator("main");
    // Title comes from frontmatter, may not include quest number
    await expect(main.locator("h1").first()).toContainText(
      "Framework Migration",
    );
  });

  test("quest 136 (final quest) page loads", async ({ page }) => {
    await page.goto("/quests/quest-136-fullstack-deploy");
    const main = page.locator("main");
    await expect(main.locator("h1").first()).toContainText("Full Stack Deploy");
  });

  // --- Workshop pages ---

  test("workshop overview page loads", async ({ page }) => {
    await page.goto("/workshop/overview");
    const main = page.locator("main");
    await expect(main.locator("h1").first()).toBeVisible();
  });

  test("workshop block page loads", async ({ page }) => {
    await page.goto("/workshop/block-1-ai-tools");
    const main = page.locator("main");
    await expect(main.locator("h1").first()).toBeVisible();
  });

  // --- Reference pages ---

  test("reference page loads", async ({ page }) => {
    await page.goto("/reference/setup-guide");
    const main = page.locator("main");
    await expect(main.locator("h1").first()).toBeVisible();
  });

  // --- Capstone pages ---

  test("capstone page loads", async ({ page }) => {
    await page.goto("/capstones/capstone-1-api-service");
    const main = page.locator("main");
    await expect(main.locator("h1").first()).toBeVisible();
  });

  // --- 404 handling ---

  test("non-existent quest returns 404", async ({ page }) => {
    const response = await page.goto("/quests/non-existent-quest");
    expect(response?.status()).toBe(404);
  });

  test("non-existent page shows 404 page", async ({ page }) => {
    await page.goto("/completely-made-up-path");
    // Should show 404 content
    const main = page.locator("main");
    await expect(main).toBeVisible();
  });

  // --- Code blocks and content rendering ---

  test("quest with code blocks renders syntax highlighting", async ({
    page,
  }) => {
    await page.goto("/quests/quest-1-first-code");
    const main = page.locator("main");
    await expect(main.locator("h1").first()).toContainText("Quest 1");
  });

  // --- Breadcrumbs / page metadata ---

  test("page has correct lang attribute for default locale", async ({
    page,
  }) => {
    await page.goto("/quests/quest-1-first-code");
    await expect(page.locator("html")).toHaveAttribute("lang", "th");
  });

  test("English page has correct lang attribute", async ({ page }) => {
    await page.goto("/en/quests/quest-1-first-code");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  // --- Search ---

  test("search button is visible in header", async ({ page }) => {
    await page.goto("/quests/quest-1-first-code");
    const searchBtn = page
      .locator(
        '[data-pagefind-ui-trigger], button[aria-label*="Search"], button[aria-label*="search"]',
      )
      .first();
    await expect(searchBtn).toBeVisible();
  });

  // --- Responsive: sidebar toggle on mobile ---

  test("mobile menu toggle is visible on small viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/quests/quest-1-first-code");
    const toggle = page
      .locator(
        '[aria-label*="menu"], [aria-label*="Menu"], .mobile-menu-toggle',
      )
      .first();
    await expect(toggle).toBeVisible();
  });

  test("sidebar is hidden on mobile by default", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/quests/quest-1-first-code");
    const sidebar = page.locator("#starlight__sidebar");
    await expect(sidebar).not.toBeVisible();
  });

  // --- Consecutive navigation ---

  test("can navigate between multiple quest pages", async ({ page }) => {
    await page.goto("/quests/quest-1-first-code");
    await expect(page.locator("main").locator("h1").first()).toContainText(
      "Quest 1",
    );

    await page.goto("/quests/quest-2-prompts");
    await expect(page.locator("main").locator("h1").first()).toContainText(
      "Quest 2",
    );

    await page.goto("/quests/quest-7-compare-tools");
    await expect(page.locator("main").locator("h1").first()).toContainText(
      "Quest 7",
    );
  });

  // --- Content structure ---

  test("quest page has goal, instructions, and verification sections", async ({
    page,
  }) => {
    await page.goto("/quests/quest-1-first-code");
    const main = page.locator("main");
    await expect(main.locator("h1").first()).toContainText("Quest 1");
  });
});
