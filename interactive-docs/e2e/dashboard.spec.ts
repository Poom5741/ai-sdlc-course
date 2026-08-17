import { test, expect, type Page } from "@playwright/test";

// Helper: mock auth + progress APIs for authenticated dashboard state
// IMPORTANT: call setupDashboardRoutes BEFORE page.goto()
async function setupDashboardRoutes(
  page: Page,
  opts?: { completed?: number; belt?: string; displayName?: string },
) {
  const completed = opts?.completed ?? 5;
  const belt = opts?.belt ?? "white";
  const displayName = opts?.displayName ?? "Test User";

  await page.route("**/api/auth/me", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        id: 1,
        email: "test@example.com",
        displayName,
        belt,
      }),
    });
  });

  await page.route("**/api/progress", async (route) => {
    const quests: Record<string, { completed: boolean }> = {};
    for (let i = 1; i <= completed; i++) {
      quests[`quest-${String(i).padStart(2, "0")}`] = { completed: true };
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ stats: { completed }, quests }),
    });
  });

  await page.route("**/api/belt", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        belt,
        completed,
        nextBelt: "blue",
        remaining: Math.max(0, 25 - completed),
      }),
    });
  });
}

// Inject auth token into localStorage before page loads
async function injectAuthToken(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem("bbd_token", "mock-token-for-test");
  });
}

test.describe("Dashboard page", () => {
  test.describe("Unauthenticated state", () => {
    test("shows login form when not authenticated", async ({ page }) => {
      await page.goto("/dashboard");
      const loginSection = page.locator("#login-section");
      await expect(loginSection).toBeVisible();
      await expect(loginSection.locator("h1")).toContainText("Sign In");
      await expect(page.locator("#email")).toBeVisible();
      await expect(page.locator("#password")).toBeVisible();
    });

    test("login form has email and password fields", async ({ page }) => {
      await page.goto("/dashboard");
      await expect(page.locator("#email")).toBeVisible();
      await expect(page.locator("#password")).toBeVisible();
      await expect(
        page.locator('#login-form button[type="submit"]'),
      ).toBeVisible();
    });

    test("login form has link to register page", async ({ page }) => {
      await page.goto("/dashboard");
      const registerLink = page.getByRole("link", { name: /Register/i });
      await expect(registerLink).toBeVisible();
      await registerLink.click();
      await expect(page).toHaveURL(/\/register/);
    });

    test("shows error on invalid login credentials", async ({ page }) => {
      await page.route("**/api/auth/login", async (route) => {
        await route.fulfill({
          status: 401,
          contentType: "application/json",
          body: JSON.stringify({ error: "Invalid email or password" }),
        });
      });

      await page.goto("/dashboard");
      await page.fill("#email", "wrong@example.com");
      await page.fill("#password", "wrongpassword");
      await page.click('#login-form button[type="submit"]');

      const errorDiv = page.locator("#login-error");
      await expect(errorDiv).toBeVisible();
      await expect(errorDiv).toContainText("Invalid email or password");
    });

    test("shows network error on fetch failure", async ({ page }) => {
      await page.route("**/api/auth/login", async (route) => {
        await route.abort("connectionrefused");
      });

      await page.goto("/dashboard");
      await page.fill("#email", "test@example.com");
      await page.fill("#password", "password123");
      await page.click('#login-form button[type="submit"]');

      const errorDiv = page.locator("#login-error");
      await expect(errorDiv).toBeVisible();
      await expect(errorDiv).toContainText("Network error");
    });
  });

  test.describe("Authenticated state", () => {
    test.beforeEach(async ({ page }) => {
      await injectAuthToken(page);
      await setupDashboardRoutes(page);
      await page.goto("/dashboard");
      await expect(page.locator("#dashboard")).toBeVisible({ timeout: 10000 });
    });

    test("shows user name in welcome heading", async ({ page }) => {
      await expect(page.locator("#user-name")).toContainText("Test User");
    });

    test("shows belt badge", async ({ page }) => {
      const beltBadge = page.locator("#belt-badge");
      await expect(beltBadge).toBeVisible();
      await expect(beltBadge).toContainText("white belt");
    });

    test("displays quest completion stats", async ({ page }) => {
      await expect(page.locator("#stat-completed")).toContainText("5");
      await expect(page.locator("#stat-belt")).toContainText("White");
      await expect(page.locator("#stat-next-belt")).toContainText("Blue");
      await expect(page.locator("#stat-remaining")).toContainText("20");
    });

    test("shows belt progression bar", async ({ page }) => {
      const beltBar = page.locator("#belt-bar");
      await expect(beltBar).toBeVisible();
      const width = await beltBar.evaluate(
        (el) => (el as HTMLElement).style.width,
      );
      expect(width).not.toBe("0%");
    });

    test("shows belt labels on progression bar", async ({ page }) => {
      await expect(
        page.getByText("White", { exact: true }).first(),
      ).toBeVisible();
      await expect(
        page.getByText("Blue", { exact: true }).first(),
      ).toBeVisible();
      await expect(
        page.getByText("Purple", { exact: true }).first(),
      ).toBeVisible();
      await expect(
        page.getByText("Brown", { exact: true }).first(),
      ).toBeVisible();
      await expect(
        page.getByText("Black", { exact: true }).first(),
      ).toBeVisible();
    });

    test("shows continue learning hero card", async ({ page }) => {
      const hero = page.locator("#continue-hero");
      await expect(hero).toBeVisible();
      await expect(page.locator("#continue-title")).toContainText("Quest");
      await expect(page.locator("#continue-module")).not.toBeEmpty();
      await expect(page.locator("#continue-link")).toBeVisible();
    });

    test("continue learning link points to a quest", async ({ page }) => {
      const link = page.locator("#continue-link");
      const href = await link.getAttribute("href");
      expect(href).toMatch(/\/quests\//);
    });

    test("shows module progress grid with 12 modules", async ({ page }) => {
      const moduleGrid = page.locator("#module-grid");
      await expect(moduleGrid).toBeVisible();
      const moduleCards = moduleGrid.locator("> div");
      await expect(moduleCards).toHaveCount(12);
    });

    test("module cards show completion counts", async ({ page }) => {
      const firstModule = page.locator("#module-grid > div").first();
      await expect(firstModule).toContainText("5/12");
    });

    test("shows capstone cards", async ({ page }) => {
      const capstonesList = page.locator("#capstones-list");
      await expect(capstonesList).toBeVisible();
      const capstoneItems = capstonesList.locator("> div");
      await expect(capstoneItems).toHaveCount(3);
    });

    test("capstone shows locked state when requirements not met", async ({
      page,
    }) => {
      await expect(page.getByText("20 quests to unlock")).toBeVisible();
    });

    test("logout button is visible", async ({ page }) => {
      await expect(page.locator("#logout-btn")).toBeVisible();
      await expect(page.locator("#nav-logout")).toBeVisible();
    });

    test("clicking logout clears token and reloads", async ({ page }) => {
      await page.route("**/api/auth/me", async (route) => {
        await route.fulfill({
          status: 401,
          contentType: "application/json",
          body: JSON.stringify({ error: "Unauthorized" }),
        });
      });

      await page.locator("#logout-btn").click();
      await expect(page.locator("#login-section")).toBeVisible({
        timeout: 10000,
      });
    });

    test("navigation has correct links", async ({ page }) => {
      await expect(page.locator('a[href="/workshop/overview/"]')).toBeVisible();
      await expect(page.locator('a[href="/dashboard/"]')).toBeVisible();
      await expect(page.locator('a[href="/community/"]')).toBeVisible();
    });
  });

  test.describe("Authenticated with full progress", () => {
    test("shows completion state when all quests done", async ({ page }) => {
      await injectAuthToken(page);
      await setupDashboardRoutes(page, {
        completed: 147,
        belt: "black",
        displayName: "Master User",
      });
      await page.goto("/dashboard");
      await expect(page.locator("#dashboard")).toBeVisible({ timeout: 10000 });
      await expect(page.locator("#stat-completed")).toContainText("147");
      await expect(page.locator("#stat-belt")).toContainText("Black");
      await expect(page.locator("#stat-next-belt")).toContainText("—");
      await expect(page.locator("#stat-remaining")).toContainText("0");
      await expect(page.locator("#continue-title")).toContainText(
        "All quests complete",
      );
    });
  });
});
