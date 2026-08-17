import { test, expect } from "@playwright/test";

test.describe("Certificate page", () => {
  test.describe("Invalid certificate", () => {
    test("shows error for non-existent certificate", async ({ page }) => {
      await page.route("**/api/certificates/invalid-id", async (route) => {
        await route.fulfill({
          status: 404,
          contentType: "application/json",
          body: JSON.stringify({ error: "Certificate not found" }),
        });
      });

      await page.goto("/certificate/invalid-id");
      const errorDiv = page.locator("#error");
      await expect(errorDiv).toBeVisible();
      await expect(errorDiv).toContainText("Certificate Not Found");
      await expect(errorDiv).toContainText(
        "This certificate could not be found",
      );
    });

    test("error state has link back to dashboard", async ({ page }) => {
      await page.route("**/api/certificates/invalid-id", async (route) => {
        await route.fulfill({
          status: 404,
          contentType: "application/json",
          body: JSON.stringify({ error: "Certificate not found" }),
        });
      });

      await page.goto("/certificate/invalid-id");
      const dashboardLink = page.locator('#error a[href="/dashboard"]');
      await expect(dashboardLink).toBeVisible();
      await dashboardLink.click();
      await expect(page).toHaveURL(/\/dashboard/);
    });
  });

  test.describe("Valid certificate", () => {
    test.beforeEach(async ({ page }) => {
      await page.route("**/api/certificates/test-cert-123", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            id: "test-cert-123",
            displayName: "John Smith",
            belt: "brown",
            completedQuests: 105,
            issuedAt: "2025-01-15T10:30:00Z",
            verificationToken: "verify-token-abc",
            skills: [
              "AI Tool Integration",
              "Test-Driven Development",
              "Code Review",
              "Deployment",
            ],
          }),
        });
      });

      await page.goto("/certificate/test-cert-123");
      // Wait for certificate to load
      await expect(page.locator("#certificate")).toBeVisible();
    });

    test("shows certificate of achievement heading", async ({ page }) => {
      await expect(page.getByText("Certificate of Achievement")).toBeVisible();
    });

    test("shows BlueBeltDojo branding", async ({ page }) => {
      await expect(page.getByText("BlueBeltDojo").first()).toBeVisible();
    });

    test("shows user name", async ({ page }) => {
      await expect(page.locator("#cert-name")).toContainText("John Smith");
    });

    test("shows belt badge with correct color", async ({ page }) => {
      const beltBadge = page.locator("#cert-belt");
      await expect(beltBadge).toContainText("brown belt");
    });

    test("shows quests completed count", async ({ page }) => {
      await expect(page.locator("#cert-quests")).toContainText("105");
    });

    test("shows date issued", async ({ page }) => {
      await expect(page.locator("#cert-date")).toContainText("January");
      await expect(page.locator("#cert-date")).toContainText("2025");
    });

    test("shows skills demonstrated", async ({ page }) => {
      const skillsContainer = page.locator("#cert-skills");
      await expect(skillsContainer).toBeVisible();
      await expect(
        skillsContainer.getByText("AI Tool Integration"),
      ).toBeVisible();
      await expect(
        skillsContainer.getByText("Test-Driven Development"),
      ).toBeVisible();
      await expect(skillsContainer.getByText("Code Review")).toBeVisible();
      await expect(skillsContainer.getByText("Deployment")).toBeVisible();
    });

    test("shows verification URL", async ({ page }) => {
      const verifyUrl = page.locator("#cert-verify-url");
      await expect(verifyUrl).toContainText("bluebeltdojo.ai/verify/");
    });

    test("has print button", async ({ page }) => {
      const printBtn = page.getByRole("button", { name: /Print Certificate/i });
      await expect(printBtn).toBeVisible();
    });

    test("has decorative corner elements", async ({ page }) => {
      // The certificate should have decorative corner borders
      const corners = page.locator("#certificate .absolute");
      const count = await corners.count();
      expect(count).toBeGreaterThanOrEqual(4);
    });
  });

  test.describe("Certificate with different belts", () => {
    test("blue belt certificate renders correctly", async ({ page }) => {
      await page.route("**/api/certificates/blue-cert", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            id: "blue-cert",
            displayName: "Jane Doe",
            belt: "blue",
            completedQuests: 30,
            issuedAt: "2025-03-20T14:00:00Z",
            verificationToken: "blue-verify",
            skills: ["Python Basics", "API Design"],
          }),
        });
      });

      await page.goto("/certificate/blue-cert");
      await expect(page.locator("#certificate")).toBeVisible();
      await expect(page.locator("#cert-belt")).toContainText("blue belt");
      await expect(page.locator("#cert-quests")).toContainText("30");
    });
  });
});
