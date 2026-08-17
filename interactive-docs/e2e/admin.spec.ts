import { test, expect } from "@playwright/test";

test.describe("Admin Panel", () => {
  test.describe("Login state", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/admin");
    });

    test("shows login form when not authenticated", async ({ page }) => {
      const loginSection = page.locator("#login-section");
      await expect(loginSection).toBeVisible();
      await expect(loginSection.getByText("Admin Panel")).toBeVisible();
    });

    test("shows password input field", async ({ page }) => {
      await expect(page.locator("#password")).toBeVisible();
    });

    test("shows login button", async ({ page }) => {
      const loginBtn = page.locator("#login-btn");
      await expect(loginBtn).toBeVisible();
      await expect(loginBtn).toContainText("Login");
    });

    test("shows password placeholder", async ({ page }) => {
      const passwordInput = page.locator("#password");
      await expect(passwordInput).toHaveAttribute(
        "placeholder",
        "Enter admin password",
      );
    });

    test("shows error on invalid password", async ({ page }) => {
      await page.route("**/api/admin/login", async (route) => {
        await route.fulfill({
          status: 401,
          contentType: "application/json",
          body: JSON.stringify({ success: false, error: "Invalid password" }),
        });
      });

      await page.fill("#password", "wrongpassword");
      await page.click("#login-btn");

      const errorEl = page.locator("#login-error");
      await expect(errorEl).toBeVisible();
      await expect(errorEl).toContainText("Invalid password");
    });

    test("shows network error on fetch failure", async ({ page }) => {
      await page.route("**/api/admin/login", async (route) => {
        await route.abort("connectionrefused");
      });

      await page.fill("#password", "testpass");
      await page.click("#login-btn");

      const errorEl = page.locator("#login-error");
      await expect(errorEl).toBeVisible();
      await expect(errorEl).toContainText("Network error");
    });
  });

  test.describe("Authenticated state", () => {
    test.beforeEach(async ({ page }) => {
      // Mock admin login
      await page.route("**/api/admin/login", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            sessionId: "test-session-123",
            expires: new Date(Date.now() + 3600000).toISOString(),
          }),
        });
      });

      // Mock admin codes API
      await page.route("**/api/admin/codes*", async (route) => {
        const url = new URL(route.request().url());
        const page_num = parseInt(url.searchParams.get("page") || "1");
        const limit = parseInt(url.searchParams.get("limit") || "20");

        const codes = Array.from({ length: 5 }, (_, i) => ({
          code: `CODE-${String(i + 1).padStart(3, "0")}`,
          used: i < 2,
          usedAt: i < 2 ? "2025-01-10T10:00:00Z" : null,
          created: "2025-01-01T00:00:00Z",
          expires: "2025-12-31T23:59:59Z",
          plan: "workshop-2025",
          revoked: false,
        }));

        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            codes: codes.slice((page_num - 1) * limit, page_num * limit),
            pagination: {
              page: page_num,
              limit,
              total: codes.length,
              pages: 1,
            },
          }),
        });
      });

      await page.goto("/admin");
      // Perform login
      await page.fill("#password", "testpassword");
      await page.click("#login-btn");
      // Wait for dashboard to be visible
      await expect(page.locator("#dashboard-section")).toBeVisible();
    });

    test("shows admin panel heading", async ({ page }) => {
      await expect(page.locator("#dashboard-section h1")).toContainText(
        "Admin Panel",
      );
    });

    test("shows subtitle", async ({ page }) => {
      await expect(page.getByText("Manage access codes")).toBeVisible();
    });

    test("shows stats cards", async ({ page }) => {
      await expect(page.locator("#stat-total")).toBeVisible();
      await expect(page.locator("#stat-used")).toBeVisible();
      await expect(page.locator("#stat-unused")).toBeVisible();
      await expect(page.locator("#stat-expired")).toBeVisible();
    });

    test("shows create codes form", async ({ page }) => {
      await expect(page.getByText("Create New Codes")).toBeVisible();
      await expect(page.locator("#plan")).toBeVisible();
      await expect(page.locator("#count")).toBeVisible();
      await expect(page.locator("#expires")).toBeVisible();
      await expect(page.locator("#batch")).toBeVisible();
    });

    test("plan dropdown has options", async ({ page }) => {
      const planSelect = page.locator("#plan");
      await expect(
        planSelect.locator("option").filter({ hasText: "Workshop 2024" }),
      ).toBeAttached();
      await expect(
        planSelect.locator("option").filter({ hasText: "Workshop 2025" }),
      ).toBeAttached();
      await expect(
        planSelect.locator("option").filter({ hasText: "Premium" }),
      ).toBeAttached();
    });

    test("shows generate codes button", async ({ page }) => {
      const generateBtn = page.locator("#create-btn");
      await expect(generateBtn).toBeVisible();
      await expect(generateBtn).toContainText("Generate Codes");
    });

    test("shows codes table", async ({ page }) => {
      await expect(page.getByText("All Codes")).toBeVisible();
      await expect(page.locator("#codes-tbody")).toBeVisible();
    });

    test("codes table has correct headers", async ({ page }) => {
      const table = page.locator("table");
      await expect(table.getByText("Code")).toBeVisible();
      await expect(table.getByText("Status")).toBeVisible();
      await expect(table.getByText("Created")).toBeVisible();
      await expect(table.getByText("Used At")).toBeVisible();
      await expect(table.getByText("Plan")).toBeVisible();
      await expect(table.getByText("Actions")).toBeVisible();
    });

    test("shows filter controls", async ({ page }) => {
      await expect(page.locator("#filter-status")).toBeVisible();
      await expect(page.locator("#filter-search")).toBeVisible();
    });

    test("filter status has options", async ({ page }) => {
      const filterSelect = page.locator("#filter-status");
      await expect(
        filterSelect.locator("option").filter({ hasText: "All Status" }),
      ).toBeAttached();
      await expect(
        filterSelect.locator("option").filter({ hasText: "Unused" }),
      ).toBeAttached();
      await expect(
        filterSelect.locator("option").filter({ hasText: "Used" }),
      ).toBeAttached();
      await expect(
        filterSelect.locator("option").filter({ hasText: "Expired" }),
      ).toBeAttached();
    });

    test("shows pagination controls", async ({ page }) => {
      await expect(page.locator("#prev-page")).toBeVisible();
      await expect(page.locator("#next-page")).toBeVisible();
      await expect(page.getByText("Showing")).toBeVisible();
    });

    test("shows logout button", async ({ page }) => {
      const logoutBtn = page.locator("#logout-btn");
      await expect(logoutBtn).toBeVisible();
      await expect(logoutBtn).toContainText("Logout");
    });

    test("clicking logout returns to login form", async ({ page }) => {
      await page.locator("#logout-btn").click();
      await expect(page.locator("#login-section")).toBeVisible();
      await expect(page.locator("#dashboard-section")).toBeHidden();
    });

    test("codes table shows status badges", async ({ page }) => {
      // Should show used and unused badges
      await expect(page.getByText("Used").first()).toBeVisible();
      await expect(page.getByText("Unused").first()).toBeVisible();
    });

    test("codes table shows revoke buttons", async ({ page }) => {
      const revokeButtons = page
        .locator("#codes-tbody button")
        .filter({ hasText: "Revoke" });
      const count = await revokeButtons.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe("Code creation flow", () => {
    test.beforeEach(async ({ page }) => {
      // Mock admin login
      await page.route("**/api/admin/login", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            sessionId: "test-session-123",
            expires: new Date(Date.now() + 3600000).toISOString(),
          }),
        });
      });

      // Mock admin codes API
      await page.route("**/api/admin/codes*", async (route) => {
        if (route.request().method() === "GET") {
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
              codes: [],
              pagination: { page: 1, limit: 20, total: 0, pages: 0 },
            }),
          });
        } else if (route.request().method() === "POST") {
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
              created: ["NEW-CODE-001", "NEW-CODE-002"],
            }),
          });
        }
      });

      await page.goto("/admin");
      await page.fill("#password", "testpassword");
      await page.click("#login-btn");
      await expect(page.locator("#dashboard-section")).toBeVisible();
    });

    test("can fill create codes form", async ({ page }) => {
      await page.selectOption("#plan", "premium");
      await page.fill("#count", "5");
      await page.fill("#batch", "test-batch");
      await page.fill("#notes", "Test notes");

      await expect(page.locator("#plan")).toHaveValue("premium");
      await expect(page.locator("#count")).toHaveValue("5");
      await expect(page.locator("#batch")).toHaveValue("test-batch");
      await expect(page.locator("#notes")).toHaveValue("Test notes");
    });

    test("shows created codes after generation", async ({ page }) => {
      await page.fill("#count", "2");
      await page.click("#create-btn");

      const createdCodes = page.locator("#created-codes");
      await expect(createdCodes).toBeVisible();
      await expect(
        createdCodes.getByText("Codes Created Successfully"),
      ).toBeVisible();
      await expect(page.locator("#codes-list")).toContainText("NEW-CODE-001");
      await expect(page.locator("#codes-list")).toContainText("NEW-CODE-002");
    });

    test("copy codes button is visible after creation", async ({ page }) => {
      await page.fill("#count", "1");
      await page.click("#create-btn");

      await expect(page.locator("#copy-codes-btn")).toBeVisible();
    });
  });
});
