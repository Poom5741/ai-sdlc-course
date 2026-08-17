// Regression test: after a successful inline login on /dashboard, the login form
// must be hidden and ONLY the dashboard content shown (previously the dashboard
// appended below the still-visible sign-in form).
//
// Run it by first building and previewing the static site, then serving dist:
//   npm run build
//   cd dist && python3 -m http.server 8222
//   npx playwright test e2e/login-repro.spec.ts
//
// API calls are mocked (no Cloudflare KV/D1 backend needed).

import { test, expect } from "@playwright/test";

const BASE = process.env.BASE_URL || "http://localhost:8222";

test("dashboard does NOT stack on top of the sign-in form after login", async ({
    page,
}) => {
    // Mock auth + data APIs so the inline login succeeds without a backend.
    await page.route("**/api/auth/login", async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                token: "mock-token",
                userId: 1,
                email: "a@b.com",
                displayName: "Tester",
                belt: "white",
            }),
        });
    });
    await page.route("**/api/progress", async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ stats: { completed: 0 }, quests: {} }),
        });
    });
    await page.route("**/api/belt", async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ belt: "white", completed: 0 }),
        });
    });

    await page.goto(`${BASE}/dashboard/`);
    // Ensure no stale token.
    await page.evaluate(() => localStorage.removeItem("bbd_token"));

    // Wait for the login section to become visible (auth check with no token).
    const loginSection = page.locator("#login-section");
    await expect(loginSection).toBeVisible();

    await page.fill("#email", "tester@example.com");
    await page.fill("#password", "password123");
    await page.click('#login-form button[type="submit"]');

    // Wait for the dashboard content to render.
    const dashboard = page.locator("#dashboard");
    await expect(page.locator("#user-name")).toHaveText("Tester");

    // THE BUG: the login section must be hidden once login succeeds.
    const loginVisible = await loginSection.isVisible();
    const dashVisible = await dashboard.isVisible();
    console.log(
        `login-section visible: ${loginVisible}, dashboard visible: ${dashVisible}`,
    );
    await expect(loginSection).toBeHidden();
});
