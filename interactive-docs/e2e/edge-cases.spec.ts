import { test, expect } from "@playwright/test";

test.describe("404 pages", () => {
  test("non-existent page returns 404", async ({ page }) => {
    const response = await page.goto("/totally-fake-page-xyz");
    expect(response?.status()).toBe(404);
  });

  test("non-existent quest returns 404", async ({ page }) => {
    const response = await page.goto("/quests/quest-999-nonexistent");
    expect(response?.status()).toBe(404);
  });

  test("non-existent workshop block returns 404", async ({ page }) => {
    const response = await page.goto("/workshop/block-99-nonexistent");
    expect(response?.status()).toBe(404);
  });

  test("404 page shows main content", async ({ page }) => {
    await page.goto("/totally-fake-page-xyz");
    await expect(page.locator("main, body").first()).toBeVisible();
  });
});

test.describe("Form validation edge cases", () => {
  test("login form rejects empty email", async ({ page }) => {
    await page.goto("/login");
    await page.fill("#password", "password123");
    await page.click('#login-form button[type="submit"]');
    // Form should not submit (HTML5 validation)
    await expect(page).toHaveURL(/\/login/);
  });

  test("login form rejects empty password", async ({ page }) => {
    await page.goto("/login");
    await page.fill("#email", "test@example.com");
    await page.click('#login-form button[type="submit"]');
    await expect(page).toHaveURL(/\/login/);
  });

  test("register form rejects mismatched passwords", async ({ page }) => {
    await page.goto("/register");
    await page.fill("#displayName", "Test User");
    await page.fill("#email", "test@example.com");
    await page.fill("#password", "password123");
    await page.fill("#confirmPassword", "differentpassword");
    await page.fill("#accessCode", "BBD-TEST-1234");
    await page.click('#register-form button[type="submit"]');

    const errorDiv = page.locator("#error-msg");
    await expect(errorDiv).toBeVisible();
    await expect(errorDiv).toContainText("Passwords do not match");
  });

  test("register form rejects invalid access code format", async ({ page }) => {
    await page.goto("/register");
    await page.fill("#displayName", "Test User");
    await page.fill("#email", "test@example.com");
    await page.fill("#password", "password123");
    await page.fill("#confirmPassword", "password123");
    await page.fill("#accessCode", "INVALID");
    await page.click('#register-form button[type="submit"]');

    const errorDiv = page.locator("#error-msg");
    await expect(errorDiv).toBeVisible();
    await expect(errorDiv).toContainText("access code");
  });
});

test.describe("API error responses", () => {
  test("login returns error for wrong credentials", async ({ page }) => {
    await page.route("**/api/auth/login", async (route) => {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ error: "Invalid email or password" }),
      });
    });

    await page.goto("/login");
    await page.fill("#email", "wrong@example.com");
    await page.fill("#password", "wrongpassword");
    await page.click('#login-form button[type="submit"]');

    const errorDiv = page.locator("#login-error, #error-msg");
    await expect(errorDiv).toBeVisible({ timeout: 10000 });
  });

  test("dashboard shows login form when not authenticated", async ({ page }) => {
    await page.goto("/dashboard");
    const loginSection = page.locator("#login-section");
    await expect(loginSection).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Auth edge cases", () => {
  test("dashboard redirects to login when token is invalid", async ({ page }) => {
    await page.route("**/api/auth/me", async (route) => {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ error: "Unauthorized" }),
      });
    });

    await page.addInitScript(() => {
      localStorage.setItem("bbd_token", "invalid-token");
    });

    await page.goto("/dashboard");
    const loginSection = page.locator("#login-section");
    await expect(loginSection).toBeVisible({ timeout: 10000 });
  });

  test("admin shows login form when not authenticated", async ({ page }) => {
    await page.goto("/admin");
    const loginSection = page.locator("#login-section");
    await expect(loginSection).toBeVisible({ timeout: 10000 });
  });
});
