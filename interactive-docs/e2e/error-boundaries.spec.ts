import { test, expect } from "@playwright/test";

// Pages to check for JS errors on load
const PAGES_TO_CHECK = [
  { path: "/", name: "Home" },
  { path: "/login", name: "Login" },
  { path: "/register", name: "Register" },
  { path: "/pricing", name: "Pricing" },
  { path: "/dashboard", name: "Dashboard" },
  { path: "/community", name: "Community" },
  { path: "/sitemap", name: "Sitemap" },
  { path: "/admin", name: "Admin" },
  { path: "/quests/quest-1-first-code", name: "Quest 1" },
  { path: "/workshop/overview", name: "Workshop Overview" },
  { path: "/capstones/capstone-1-api-service", name: "Capstone 1" },
  { path: "/reference/setup-guide", name: "Reference" },
];

test.describe("No JavaScript errors on page load", () => {
  for (const { path, name } of PAGES_TO_CHECK) {
    test(`${name} (${path}) loads without JS errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => {
        errors.push(error.message);
      });

      await page.goto(path, { waitUntil: "networkidle" });

      // Filter out known non-critical errors
      const criticalErrors = errors.filter(
        (e) =>
          !e.includes("ResizeObserver") &&
          !e.includes("Non-Error promise rejection") &&
          !e.includes("Loading chunk") &&
          !e.includes("Failed to fetch"),
      );

      expect(
        criticalErrors,
        `JS errors on ${name}: ${criticalErrors.join(", ")}`,
      ).toHaveLength(0);
    });
  }
});
