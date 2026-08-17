import { test, expect } from "@playwright/test";

test.describe("Verify Certificate page", () => {
  test.describe("Invalid token", () => {
    test("shows error for invalid verification token", async ({ page }) => {
      await page.route("**/api/verify/invalid-token", async (route) => {
        await route.fulfill({
          status: 404,
          contentType: "application/json",
          body: JSON.stringify({ error: "Invalid token" }),
        });
      });

      await page.goto("/verify/invalid-token");
      const invalidDiv = page.locator("#invalid");
      await expect(invalidDiv).toBeVisible();
      await expect(invalidDiv).toContainText("Certificate Not Valid");
      await expect(invalidDiv).toContainText("does not match any certificate");
    });

    test("shows red X icon for invalid token", async ({ page }) => {
      await page.route("**/api/verify/invalid-token", async (route) => {
        await route.fulfill({
          status: 404,
          contentType: "application/json",
          body: JSON.stringify({ error: "Invalid token" }),
        });
      });

      await page.goto("/verify/invalid-token");
      await expect(page.locator("#invalid .text-red-600")).toContainText("✕");
    });
  });

  test.describe("Valid certificate", () => {
    test.beforeEach(async ({ page }) => {
      await page.route("**/api/verify/valid-token-abc", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            certificateId: "cert-001",
            displayName: "Alice Johnson",
            belt: "purple",
            completedQuests: 65,
            issuedAt: "2025-02-10T09:00:00Z",
            skills: ["Full-Stack Development", "AI Integration", "Testing"],
          }),
        });
      });

      await page.goto("/verify/valid-token-abc");
      await expect(page.locator("#valid")).toBeVisible();
    });

    test("shows verified heading", async ({ page }) => {
      await expect(page.getByText("Certificate Verified")).toBeVisible();
    });

    test("shows green checkmark icon", async ({ page }) => {
      await expect(page.locator("#valid .text-green-600")).toContainText("✓");
    });

    test("shows authenticity message", async ({ page }) => {
      await expect(
        page.getByText("This certificate is authentic"),
      ).toBeVisible();
    });

    test("shows user name", async ({ page }) => {
      await expect(page.locator("#cert-name")).toContainText("Alice Johnson");
    });

    test("shows belt badge", async ({ page }) => {
      const beltBadge = page.locator("#cert-belt");
      await expect(beltBadge).toContainText("purple belt");
    });

    test("shows date issued", async ({ page }) => {
      await expect(page.locator("#cert-date")).toContainText("February");
      await expect(page.locator("#cert-date")).toContainText("2025");
    });

    test("shows quests completed", async ({ page }) => {
      await expect(page.locator("#cert-quests")).toContainText("65");
    });

    test("shows skills demonstrated", async ({ page }) => {
      const skillsContainer = page.locator("#cert-skills");
      await expect(
        skillsContainer.getByText("Full-Stack Development"),
      ).toBeVisible();
      await expect(skillsContainer.getByText("AI Integration")).toBeVisible();
      await expect(skillsContainer.getByText("Testing")).toBeVisible();
    });

    test("shows certificate ID", async ({ page }) => {
      await expect(page.locator("#cert-id")).toContainText("cert-001");
    });

    test("certificate ID is in monospace font", async ({ page }) => {
      const certId = page.locator("#cert-id");
      await expect(certId).toHaveClass(/font-mono/);
    });
  });

  test.describe("Certificate with different belts", () => {
    test("black belt certificate shows correct styling", async ({ page }) => {
      await page.route("**/api/verify/black-belt-token", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            certificateId: "cert-black-001",
            displayName: "Master Coder",
            belt: "black",
            completedQuests: 147,
            issuedAt: "2025-06-01T12:00:00Z",
            skills: ["All Skills Mastered"],
          }),
        });
      });

      await page.goto("/verify/black-belt-token");
      await expect(page.locator("#valid")).toBeVisible();
      await expect(page.locator("#cert-belt")).toContainText("black belt");
      await expect(page.locator("#cert-quests")).toContainText("147");
    });
  });

  test.describe("Network errors", () => {
    test("shows error on network failure", async ({ page }) => {
      await page.route("**/api/verify/*", async (route) => {
        await route.abort("connectionrefused");
      });

      await page.goto("/verify/some-token");
      const invalidDiv = page.locator("#invalid");
      await expect(invalidDiv).toBeVisible();
    });
  });
});
