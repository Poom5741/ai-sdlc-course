import { test, expect, type Page } from "@playwright/test";

// ============================================================
// Realistic User Journey E2E Tests
// ============================================================

// --- Shared helpers ---
async function mockAuthApis(page: Page) {
  await page.route("**/api/auth/me", async (route) => {
    const auth = route.request().headers()["authorization"];
    if (auth && auth.includes("mock-token")) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: 1,
          email: "student@bbd.ai",
          displayName: "Alex Student",
          belt: "white",
        }),
      });
    } else {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ error: "Unauthorized" }),
      });
    }
  });

  await page.route("**/api/auth/login", async (route) => {
    const body = JSON.parse(route.request().postData() || "{}");
    if (body.email === "student@bbd.ai" && body.password === "Learn1234!") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          token: "mock-token",
          userId: 1,
          email: "student@bbd.ai",
          displayName: "Alex Student",
          belt: "white",
        }),
      });
    } else {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ error: "Invalid email or password" }),
      });
    }
  });

  await page.route("**/api/progress", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        stats: { completed: 3, total: 147 },
        quests: {
          "quest-01-first-completion": {
            completed: true,
            completedAt: "2025-01-10T10:00:00Z",
            attempts: 1,
          },
          "quest-02-multi-file": {
            completed: true,
            completedAt: "2025-01-11T14:00:00Z",
            attempts: 2,
          },
          "quest-03-compare-tools": {
            completed: true,
            completedAt: "2025-01-12T09:00:00Z",
            attempts: 1,
          },
        },
      }),
    });
  });

  await page.route("**/api/belt", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        belt: "white",
        completed: 3,
        nextBelt: "blue",
        remaining: 22,
      }),
    });
  });
}

// ============================================================
// JOURNEY 1: Homepage → Sign In → Register
// ============================================================
test.describe("Journey: New user discovers and registers", () => {
  test("user explores homepage then navigates to register", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Master AI Coding");

    // Click Sign In
    await page
      .getByRole("link", { name: /Sign In/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/login/);

    // Click Register
    await page.getByRole("link", { name: /Register/i }).click();
    await expect(page).toHaveURL(/\/register/);

    // Verify register form exists
    await expect(page.locator("#displayName")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.locator("#accessCode")).toBeVisible();
  });
});

// ============================================================
// JOURNEY 2: Login → Dashboard with progress
// ============================================================
test.describe("Journey: User logs in and sees progress", () => {
  test("user logs in from login page and sees dashboard", async ({ page }) => {
    await mockAuthApis(page);
    await page.goto("/login");
    await page.fill("#email", "student@bbd.ai");
    await page.fill("#password", "Learn1234!");
    await page.click("#submit-btn");
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
  });

  test("dashboard shows user progress when authenticated", async ({ page }) => {
    await mockAuthApis(page);
    await page.addInitScript(() => {
      localStorage.setItem("bbd_token", "mock-token");
    });
    await page.goto("/dashboard");
    await expect(page.locator("#dashboard")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("#user-name")).toContainText("Alex Student");
    await expect(page.locator("#stat-completed")).toContainText("3");
  });
});

// ============================================================
// JOURNEY 3: Workshop browsing
// ============================================================
test.describe("Journey: User browses workshop", () => {
  test("user navigates to workshop and views quest", async ({ page }) => {
    await page.goto("/en/workshop/overview");
    await expect(page.locator("h1").first()).toContainText("AI SDLC Workshop");
    await expect(page.locator("table").first()).toBeVisible();
  });

  test("user views quest page with content", async ({ page }) => {
    await page.goto("/en/quests/quest-01-first-completion");
    // Quest page should have some content
    await expect(page.locator("main").first()).toBeVisible();
  });
});

// ============================================================
// JOURNEY 4: Certificate verification (static placeholder)
// ============================================================
test.describe("Journey: Certificate verification", () => {
  test("certificate page renders placeholder route", async ({ page }) => {
    // Certificate is a dynamic route - verify the placeholder page exists
    await page.goto("/certificate/placeholder");
    // Page should render (may show error since no real data)
    await expect(page.locator("main, body").first()).toBeVisible();
  });

  test("verify page renders placeholder route", async ({ page }) => {
    await page.goto("/verify/placeholder");
    await expect(page.locator("main, body").first()).toBeVisible();
  });
});

// ============================================================
// JOURNEY 5: Community
// ============================================================
test.describe("Journey: User joins community", () => {
  test("community page shows Discord and channels", async ({ page }) => {
    await page.goto("/community");
    await expect(page.getByText("Discord Community")).toBeVisible();
    await expect(page.getByText("#quest-help")).toBeVisible();
    await expect(page.getByText("#showcase")).toBeVisible();
  });
});

// ============================================================
// JOURNEY 6: Admin manages codes
// ============================================================
test.describe("Journey: Admin manages codes", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/api/admin/login", async (route) => {
      const body = JSON.parse(route.request().postData() || "{}");
      if (body.password === "admin123") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            sessionId: "admin-session",
            expires: new Date(Date.now() + 3600000).toISOString(),
          }),
        });
      } else {
        await route.fulfill({
          status: 401,
          contentType: "application/json",
          body: JSON.stringify({ success: false, error: "Invalid password" }),
        });
      }
    });
    await page.route("**/api/admin/codes*", async (route) => {
      if (route.request().method() === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            codes: [
              {
                code: "BBD-ABCD-1234",
                used: true,
                usedAt: "2025-01-15T10:00:00Z",
                created: "2025-01-01T00:00:00Z",
                expires: "2025-12-31T23:59:59Z",
                plan: "workshop-2025",
                revoked: false,
              },
              {
                code: "BBD-EFGH-5678",
                used: false,
                usedAt: null,
                created: "2025-01-01T00:00:00Z",
                expires: "2025-12-31T23:59:59Z",
                plan: "workshop-2025",
                revoked: false,
              },
            ],
            pagination: { page: 1, limit: 20, total: 2, pages: 1 },
          }),
        });
      } else if (route.request().method() === "POST") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ created: ["BBD-NEW1-1111", "BBD-NEW2-2222"] }),
        });
      }
    });
  });

  test("admin logs in and creates codes", async ({ page }) => {
    await page.goto("/admin");
    await page.fill("#password", "admin123");
    await page.click("#login-btn");
    await expect(page.locator("#dashboard-section")).toBeVisible({
      timeout: 10000,
    });
    await expect(page.locator("#stat-total")).toBeVisible();

    // Create codes
    await page.selectOption("#plan", "workshop-2025");
    await page.fill("#count", "2");
    await page.fill("#batch", "february-cohort");
    await page.click("#create-btn");
    await expect(page.locator("#created-codes")).toBeVisible();
    await expect(page.locator("#codes-list")).toContainText("BBD-NEW1-1111");
  });

  test("admin sees error on wrong password", async ({ page }) => {
    await page.goto("/admin");
    await page.fill("#password", "wrongpassword");
    await page.click("#login-btn");
    await expect(page.locator("#login-error")).toContainText(
      "Invalid password",
    );
  });
});

// ============================================================
// JOURNEY 7: Pricing page
// ============================================================
test.describe("Journey: User checks pricing", () => {
  test("pricing page shows access info", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.locator("h1")).toContainText("Full Access");
    await expect(page.getByText("Full Course Access")).toBeVisible();
    await expect(page.locator('a[href="/dashboard"]')).toBeVisible();
  });
});

// ============================================================
// JOURNEY 8: Sitemap navigation
// ============================================================
test.describe("Journey: Sitemap navigation", () => {
  test("sitemap shows page sections", async ({ page }) => {
    await page.goto("/sitemap");
    await expect(page.locator("main").first()).toBeVisible();
  });
});
