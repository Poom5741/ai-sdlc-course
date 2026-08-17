import { test, expect } from "@playwright/test";

test.describe("Community page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/community");
  });

  test("renders page with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Community.*BlueBeltDojo/i);
  });

  test("shows main heading and subtitle", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Train Together");
    await expect(page.getByText("Join the Community")).toBeVisible();
  });

  test("shows description text", async ({ page }) => {
    await expect(page.getByText("Connect with fellow learners")).toBeVisible();
  });

  test.describe("Discord CTA section", () => {
    test("shows Discord community heading", async ({ page }) => {
      await expect(page.getByText("Discord Community")).toBeVisible();
    });

    test("shows Discord SVG icon", async ({ page }) => {
      const discordSection = page.locator(".bg-\\[\\#5865F2\\]");
      await expect(discordSection.locator("svg")).toBeVisible();
    });

    test("shows learner count", async ({ page }) => {
      await expect(page.getByText("500+ learners")).toBeVisible();
    });

    test("shows join Discord button", async ({ page }) => {
      const joinBtn = page.locator("#discord-link");
      await expect(joinBtn).toBeVisible();
      await expect(joinBtn).toContainText("Join Discord Server");
    });

    test("Discord button links to invite URL", async ({ page }) => {
      const joinBtn = page.locator("#discord-link");
      const href = await joinBtn.getAttribute("href");
      expect(href).toContain("discord.gg");
    });

    test("shows discord status text", async ({ page }) => {
      const status = page.locator("#discord-status");
      await expect(status).toBeVisible();
    });
  });

  test.describe("Channel Guide section", () => {
    test("shows channel guide heading", async ({ page }) => {
      await expect(page.getByText("Channel Guide")).toBeVisible();
    });

    test("shows quest-help channel", async ({ page }) => {
      await expect(page.getByText("#quest-help")).toBeVisible();
      await expect(page.getByText("Stuck on a quest")).toBeVisible();
    });

    test("shows showcase channel", async ({ page }) => {
      await expect(page.getByText("#showcase")).toBeVisible();
      await expect(page.getByText("Share completed quests")).toBeVisible();
    });

    test("shows peer-review channel", async ({ page }) => {
      await expect(page.getByText("#peer-review")).toBeVisible();
      await expect(
        page.getByText("Get feedback on your capstone"),
      ).toBeVisible();
    });

    test("shows general channel", async ({ page }) => {
      await expect(page.getByText("#general")).toBeVisible();
      await expect(page.getByText("Chat about AI tools")).toBeVisible();
    });

    test("channel cards have emoji icons", async ({ page }) => {
      await expect(page.getByText("📚")).toBeVisible();
      await expect(page.getByText("🎉")).toBeVisible();
      await expect(page.getByText("👀")).toBeVisible();
      await expect(page.getByText("💬")).toBeVisible();
    });
  });

  test.describe("Belt Channels section", () => {
    test("shows belt channels heading", async ({ page }) => {
      await expect(page.getByText("Belt Channels")).toBeVisible();
    });

    test("shows description about belt progression", async ({ page }) => {
      await expect(
        page.getByText("As you progress, you'll unlock"),
      ).toBeVisible();
    });

    test("shows all 5 belt channels", async ({ page }) => {
      await expect(page.getByText("#white-belt")).toBeVisible();
      await expect(page.getByText("#blue-belt")).toBeVisible();
      await expect(page.getByText("#purple-belt")).toBeVisible();
      await expect(page.getByText("#brown-belt")).toBeVisible();
      await expect(page.getByText("#black-belt")).toBeVisible();
    });

    test("white belt shows all learners", async ({ page }) => {
      await expect(page.getByText("All learners")).toBeVisible();
    });

    test("blue belt shows quest requirement", async ({ page }) => {
      await expect(page.getByText("20+ quests completed")).toBeVisible();
    });

    test("purple belt shows quest requirement", async ({ page }) => {
      await expect(page.getByText("50+ quests completed")).toBeVisible();
    });

    test("brown belt shows quest requirement", async ({ page }) => {
      await expect(page.getByText("90+ quests completed")).toBeVisible();
    });

    test("black belt shows quest requirement", async ({ page }) => {
      await expect(page.getByText("118+ quests completed")).toBeVisible();
    });

    test("belt channels are listed", async ({ page }) => {
      await expect(page.getByText("#white-belt")).toBeVisible();
      await expect(page.getByText("#black-belt")).toBeVisible();
    });
  });

  test.describe("Community Guidelines section", () => {
    test("shows guidelines heading", async ({ page }) => {
      await expect(page.getByText("Community Guidelines")).toBeVisible();
    });

    test("shows all 5 guidelines", async ({ page }) => {
      await expect(page.getByText("Be respectful")).toBeVisible();
      await expect(page.getByText("Help others learn")).toBeVisible();
      await expect(page.getByText("No spoilers for quests")).toBeVisible();
      await expect(page.getByText("Share your wins")).toBeVisible();
      await expect(page.getByText("Stay on topic")).toBeVisible();
    });

    test("guidelines have numbered items", async ({ page }) => {
      await expect(page.getByText("01")).toBeVisible();
      await expect(page.getByText("02")).toBeVisible();
      await expect(page.getByText("03")).toBeVisible();
      await expect(page.getByText("04")).toBeVisible();
      await expect(page.getByText("05")).toBeVisible();
    });

    test("guidelines have green numbers", async ({ page }) => {
      const greenNumbers = page.locator(".text-\\[\\#059669\\].font-bold");
      const count = await greenNumbers.count();
      expect(count).toBeGreaterThanOrEqual(5);
    });
  });

  test.describe("Navigation", () => {
    test("has page content", async ({ page }) => {
      await expect(page.locator("body")).toBeVisible();
    });
  });
});
