// Regression test: after a successful inline login on /dashboard, the login form
// must be hidden and ONLY the dashboard content shown.

import { test, expect } from "@playwright/test";

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
                role: "user",
            }),
        });
    });
    await page.route("**/api/auth/me", async (route) => {
        const auth = route.request().headers()["authorization"];
        if (auth && auth.includes("mock-token")) {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    id: 1,
                    email: "a@b.com",
                    displayName: "Tester",
                    belt: "white",
                    role: "user",
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

    await page.goto("/dashboard/");
    // Ensure no stale token.
    await page.evaluate(() => localStorage.removeItem("bbd_token"));

    // Wait for the login section to become visible (auth check with no token).
    const loginSection = page.locator("#login-section");
    await expect(loginSection).toBeVisible({ timeout: 10000 });

    await page.fill("#email", "tester@example.com");
    await page.fill("#password", "password123");
    await page.click('#login-form button[type="submit"]');

    // Wait for the dashboard content to render.
    await expect(page.locator("#user-name")).toHaveText("Tester", {
        timeout: 10000,
    });

    // THE BUG: the login section must be hidden once login succeeds.
    await expect(loginSection).toBeHidden();
});
