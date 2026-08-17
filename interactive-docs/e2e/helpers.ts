import type { Page } from "@playwright/test";

/**
 * Mock auth APIs for testing authenticated states.
 * Call BEFORE page.goto().
 */
export async function mockAuthApis(
  page: Page,
  opts?: {
    email?: string;
    password?: string;
    displayName?: string;
    belt?: string;
    completed?: number;
    token?: string;
  },
) {
  const email = opts?.email ?? "test@bbd.ai";
  const password = opts?.password ?? "Pass1234!";
  const displayName = opts?.displayName ?? "Test User";
  const belt = opts?.belt ?? "white";
  const completed = opts?.completed ?? 5;
  const token = opts?.token ?? "mock-token";

  await page.route("**/api/auth/me", async (route) => {
    const auth = route.request().headers()["authorization"];
    if (auth?.includes(token)) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ id: 1, email, displayName, belt }),
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
    let body: Record<string, string> = {};
    try {
      body = JSON.parse(route.request().postData() || "{}");
    } catch {
      // invalid JSON
    }
    if (body.email === email && body.password === password) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ token, userId: 1, email, displayName, belt }),
      });
    } else {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ error: "Invalid credentials" }),
      });
    }
  });

  await page.route("**/api/progress", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ stats: { completed }, quests: {} }),
    });
  });

  await page.route("**/api/belt", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ belt, completed, nextBelt: "blue", remaining: Math.max(0, 25 - completed) }),
    });
  });
}

/**
 * Inject auth token into localStorage before page loads.
 */
export async function injectAuthToken(page: Page, token = "mock-token") {
  await page.addInitScript((t) => {
    localStorage.setItem("bbd_token", t);
  }, token);
}
