import { test, expect } from "@playwright/test";

// Quest pages that should exist in both locales
const QUEST_PAGES = [
  { slug: "quest-1-first-code", thaiTitle: "Quest 1", enTitle: "Quest 1" },
  { slug: "quest-10-fix-harden", thaiTitle: "Quest 10", enTitle: "Quest 10" },
  { slug: "quest-50-ai-review-policy", thaiTitle: "Quest 50", enTitle: "Quest 50" },
];

test.describe("Thai locale", () => {
  for (const { slug } of QUEST_PAGES) {
    test(`${slug} loads with Thai lang attribute`, async ({ page }) => {
      await page.goto(`/quests/${slug}`);
      await expect(page.locator("html")).toHaveAttribute("lang", "th");
      await expect(page.locator("main")).toBeVisible();
    });
  }
});

test.describe("English locale", () => {
  for (const { slug } of QUEST_PAGES) {
    test(`${slug} loads with English lang attribute`, async ({ page }) => {
      await page.goto(`/en/quests/${slug}`);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(page.locator("main")).toBeVisible();
    });
  }
});

test.describe("Locale parity", () => {
  for (const { slug } of QUEST_PAGES) {
    test(`${slug} exists in both locales`, async ({ page }) => {
      // Thai version
      const thaiResponse = await page.goto(`/quests/${slug}`);
      expect(thaiResponse?.status()).toBe(200);

      // English version
      const enResponse = await page.goto(`/en/quests/${slug}`);
      expect(enResponse?.status()).toBe(200);
    });
  }
});
