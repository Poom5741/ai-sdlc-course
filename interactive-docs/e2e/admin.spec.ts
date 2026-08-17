import { test, expect } from "@playwright/test";

test.describe("Admin Panel", () => {
  test.describe("Unauthenticated state", () => {
    test("shows access denied for unauthenticated users", async ({ page }) => {
      await page.goto("/admin");
      const deniedSection = page.locator("#denied-section");
      await expect(deniedSection).toBeVisible({ timeout: 10000 });
      await expect(deniedSection.getByText("Access Denied")).toBeVisible();
    });

    test("shows sign in link for unauthenticated users", async ({ page }) => {
      await page.goto("/admin");
      const deniedSection = page.locator("#denied-section");
      await expect(deniedSection).toBeVisible({ timeout: 10000 });
      const signInLink = deniedSection.getByRole("link", { name: /Sign In/i });
      await expect(signInLink).toBeVisible();
    });
  });

  test.describe("Non-admin user", () => {
    test("shows access denied for non-admin users", async ({ page }) => {
      // Mock auth as regular user
      await page.route("**/api/auth/me", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            userId: "user-123",
            email: "user@example.com",
            displayName: "Regular User",
            belt: "white",
            role: "user",
          }),
        });
      });

      await page.goto("/admin");

      // Inject token
      await page.evaluate(() => {
        localStorage.setItem("bbd_token", "mock-user-token");
      });

      const deniedSection = page.locator("#denied-section");
      await expect(deniedSection).toBeVisible({ timeout: 10000 });
      await expect(deniedSection.getByText("Access Denied")).toBeVisible();
    });
  });

  test.describe("Admin user - authenticated state", () => {
    test.beforeEach(async ({ page }) => {
      // Mock auth as admin
      await page.route("**/api/auth/me", async (route) => {
        const auth = route.request().headers()["authorization"];
        if (auth && auth.includes("mock-admin-token")) {
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
              userId: "admin-001",
              email: "admin@bluebeltdojo.ai",
              displayName: "Admin",
              belt: "black",
              role: "admin",
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

      // Mock admin codes API
      await page.route("**/api/admin/codes*", async (route) => {
        const url = new URL(route.request().url());
        const pageNum = parseInt(url.searchParams.get("page") || "1");
        const limit = parseInt(url.searchParams.get("limit") || "20");

        const codes = Array.from({ length: 15 }, (_, i) => ({
          code: `BBD-TEST${String(i + 1).padStart(2, "0")}-ABCD`,
          created: new Date(Date.now() - i * 86400000).toISOString(),
          used: i < 5,
          usedAt: i < 5 ? new Date().toISOString() : null,
          expires: "2025-12-31T23:59:59Z",
          plan: "workshop-2025",
          metadata: { batch: "test-batch" },
        }));

        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            codes: codes.slice((pageNum - 1) * limit, pageNum * limit),
            pagination: {
              page: pageNum,
              limit,
              total: codes.length,
              pages: Math.ceil(codes.length / limit),
            },
          }),
        });
      });

      // Inject admin token before navigating
      await page.goto("/admin");
      await page.evaluate(() => {
        localStorage.setItem("bbd_token", "mock-admin-token");
      });
      await page.reload();
    });

    test("shows dashboard section for admin", async ({ page }) => {
      const dashboardSection = page.locator("#dashboard-section");
      await expect(dashboardSection).toBeVisible({ timeout: 10000 });
    });

    test("shows admin email in header", async ({ page }) => {
      await expect(page.locator("#admin-email")).toContainText(
        "admin@bluebeltdojo.ai",
      );
    });

    test("shows stats cards", async ({ page }) => {
      await expect(page.locator("#stat-total")).toBeVisible();
      await expect(page.locator("#stat-used")).toBeVisible();
      await expect(page.locator("#stat-unused")).toBeVisible();
      await expect(page.locator("#stat-expired")).toBeVisible();
    });

    test("shows create codes form", async ({ page }) => {
      await expect(page.locator("#create-form")).toBeVisible();
      await expect(page.locator("#plan")).toBeVisible();
      await expect(page.locator("#count")).toBeVisible();
      await expect(page.locator("#expires")).toBeVisible();
    });

    test("shows codes table", async ({ page }) => {
      await expect(page.locator("#codes-tbody")).toBeVisible();
      // Should have codes in the table
      const rows = page.locator("#codes-tbody tr");
      await expect(rows.first()).toBeVisible();
    });

    test("shows logout button", async ({ page }) => {
      await expect(page.locator("#logout-btn")).toBeVisible();
    });

    test("shows link to dashboard", async ({ page }) => {
      const dashboardLink = page.locator('a[href="/dashboard"]');
      await expect(dashboardLink).toBeVisible();
    });
  });

  test.describe("Code generation", () => {
    test.beforeEach(async ({ page }) => {
      // Mock auth as admin
      await page.route("**/api/auth/me", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            userId: "admin-001",
            email: "admin@bluebeltdojo.ai",
            displayName: "Admin",
            belt: "black",
            role: "admin",
          }),
        });
      });

      // Mock admin codes API
      await page.route("**/api/admin/codes*", async (route) => {
        if (route.request().method() === "POST") {
          // Create codes
          const body = route.request().postData();
          const data = JSON.parse(body || "{}");
          const count = data.count || 1;
          const codes = Array.from(
            { length: count },
            (_, i) => `BBD-NEW${String(i + 1).padStart(4, "0")}-CODE`,
          );
          await route.fulfill({
            status: 201,
            contentType: "application/json",
            body: JSON.stringify({ created: codes, count: codes.length }),
          });
        } else {
          // List codes
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ codes: [], pagination: { total: 0 } }),
          });
        }
      });

      await page.goto("/admin");
      await page.evaluate(() => {
        localStorage.setItem("bbd_token", "mock-admin-token");
      });
      await page.reload();
    });

    test("can generate codes", async ({ page }) => {
      await page.selectOption("#plan", "workshop-2025");
      await page.fill("#count", "3");
      await page.click("#create-btn");

      const createdCodes = page.locator("#created-codes");
      await expect(createdCodes).toBeVisible({ timeout: 5000 });
      await expect(
        createdCodes.getByText("Codes Created Successfully"),
      ).toBeVisible();
    });
  });
});
