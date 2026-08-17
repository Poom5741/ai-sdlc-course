import { test, expect } from "@playwright/test";

// Sample quest pages to check content structure
const QUEST_PAGES = [
  { slug: "quest-1-first-code", title: "Quest 1" },
  { slug: "quest-10-fix-harden", title: "Quest 10" },
  { slug: "quest-50-ai-review-policy", title: "Quest 50" },
  { slug: "quest-100-framework-migration", title: "Quest 100" },
  { slug: "quest-136-fullstack-deploy", title: "Quest 136" },
];

test.describe("Quest content structure", () => {
  for (const { slug, title } of QUEST_PAGES) {
    test(`${title} has required content sections`, async ({ page }) => {
      await page.goto(`/quests/${slug}`);
      const main = page.locator("main");
      await expect(main).toBeVisible();

      // Should have a heading
      await expect(main.locator("h1").first()).toBeVisible();

      // Should have at least one h2 section
      const h2Count = await main.locator("h2").count();
      expect(h2Count).toBeGreaterThanOrEqual(1);
    });

    test(`${title} has no empty content`, async ({ page }) => {
      await page.goto(`/quests/${slug}`);
      const main = page.locator("main");
      // Main content should have some text
      const text = await main.textContent();
      expect(text?.length).toBeGreaterThan(100);
    });
  }
});

test.describe("Workshop content structure", () => {
  const WORKSHOP_PAGES = [
    { slug: "workshop/overview", title: "Workshop Overview" },
    { slug: "workshop/block-1-ai-tools", title: "Block 1" },
    { slug: "workshop/block-2-prompting", title: "Block 2" },
  ];

  for (const { slug, title } of WORKSHOP_PAGES) {
    test(`${title} has content`, async ({ page }) => {
      await page.goto(`/${slug}`);
      const main = page.locator("main");
      await expect(main).toBeVisible();
      await expect(main.locator("h1").first()).toBeVisible();
      const text = await main.textContent();
      expect(text?.length).toBeGreaterThan(50);
    });
  }
});

test.describe("Capstone content structure", () => {
  const CAPSTONE_PAGES = [
    { slug: "capstones/capstone-1-api-service", title: "Capstone 1" },
    { slug: "capstones/capstone-2-multi-agent", title: "Capstone 2" },
    { slug: "capstones/capstone-3-production-ai", title: "Capstone 3" },
  ];

  for (const { slug, title } of CAPSTONE_PAGES) {
    test(`${title} has content`, async ({ page }) => {
      await page.goto(`/${slug}`);
      const main = page.locator("main");
      await expect(main).toBeVisible();
      await expect(main.locator("h1").first()).toBeVisible();
      const text = await main.textContent();
      expect(text?.length).toBeGreaterThan(50);
    });
  }
});
