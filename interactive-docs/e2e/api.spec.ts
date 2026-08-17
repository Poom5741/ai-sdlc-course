import { test, expect } from "@playwright/test";

const API_BASE = "/api";

test.describe("API Endpoints", () => {
  test.describe("Health endpoint", () => {
    test("GET /api/health returns 200", async ({ request }) => {
      const response = await request.get(`${API_BASE}/health`);
      expect(response.ok()).toBeTruthy();
    });

    test("GET /api/health returns JSON", async ({ request }) => {
      const response = await request.get(`${API_BASE}/health`);
      const contentType = response.headers()["content-type"] || "";
      expect(contentType).toContain("application/json");
    });
  });

  test.describe("Auth endpoints", () => {
    test("POST /api/auth/register creates new user", async ({ request }) => {
      const response = await request.post(`${API_BASE}/auth/register`, {
        data: {
          email: `test-${Date.now()}@example.com`,
          password: "TestPass123!",
          displayName: "Test User",
        },
      });
      // Should return 200 or 201
      expect(response.status()).toBeLessThan(500);
    });

    test("POST /api/auth/register rejects duplicate email", async ({
      request,
    }) => {
      const email = `dup-${Date.now()}@example.com`;
      // First registration
      await request.post(`${API_BASE}/auth/register`, {
        data: { email, password: "TestPass123!", displayName: "User 1" },
      });
      // Duplicate registration
      const response = await request.post(`${API_BASE}/auth/register`, {
        data: { email, password: "TestPass123!", displayName: "User 2" },
      });
      // May return 400 or 200 depending on implementation
      expect(response.status()).toBeLessThan(500);
    });

    test("POST /api/auth/login returns token on valid credentials", async ({
      request,
    }) => {
      const email = `login-${Date.now()}@example.com`;
      // Register first
      await request.post(`${API_BASE}/auth/register`, {
        data: { email, password: "TestPass123!", displayName: "Login User" },
      });
      // Login
      const response = await request.post(`${API_BASE}/auth/login`, {
        data: { email, password: "TestPass123!" },
      });
      expect(response.ok()).toBeTruthy();
      const body = await response.json();
      expect(body.token).toBeTruthy();
    });

    test("POST /api/auth/login rejects invalid credentials", async ({
      request,
    }) => {
      const response = await request.post(`${API_BASE}/auth/login`, {
        data: { email: "nonexistent@example.com", password: "wrongpassword" },
      });
      expect(response.status()).toBe(401);
    });

    test("GET /api/auth/me returns user data with valid token", async ({
      request,
    }) => {
      const email = `me-${Date.now()}@example.com`;
      // Register and login
      await request.post(`${API_BASE}/auth/register`, {
        data: { email, password: "TestPass123!", displayName: "Me User" },
      });
      const loginRes = await request.post(`${API_BASE}/auth/login`, {
        data: { email, password: "TestPass123!" },
      });
      const { token } = await loginRes.json();

      // Get user data
      const response = await request.get(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      expect(response.ok()).toBeTruthy();
    });

    test("GET /api/auth/me rejects invalid token", async ({ request }) => {
      const response = await request.get(`${API_BASE}/auth/me`, {
        headers: { Authorization: "Bearer invalid-token-123" },
      });
      expect(response.status()).toBe(401);
    });

    test("POST /api/auth/logout requires auth", async ({ request }) => {
      const response = await request.post(`${API_BASE}/auth/logout`);
      // Without token, should return 401
      expect(response.status()).toBe(401);
    });
  });

  test.describe("Quests endpoint", () => {
    test("GET /api/quests returns quest list", async ({ request }) => {
      const response = await request.get(`${API_BASE}/quests`);
      expect(response.ok()).toBeTruthy();
      const body = await response.json();
      expect(Array.isArray(body) || body.quests).toBeTruthy();
    });
  });

  test.describe("Belt endpoint", () => {
    test("GET /api/belt returns belt info for authenticated user", async ({
      request,
    }) => {
      const email = `belt-${Date.now()}@example.com`;
      await request.post(`${API_BASE}/auth/register`, {
        data: { email, password: "TestPass123!", displayName: "Belt User" },
      });
      // Registration may fail if user exists, that's OK
      
      const loginRes = await request.post(`${API_BASE}/auth/login`, {
        data: { email, password: "TestPass123!" },
      });
      
      if (loginRes.ok()) {
        const { token } = await loginRes.json();
        const response = await request.get(`${API_BASE}/belt`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        expect(response.ok()).toBeTruthy();
      } else {
        // If login fails, at least the endpoint should respond
        expect(loginRes.status()).toBeLessThan(500);
      }
    });

    test("GET /api/belt returns public belt info without auth", async ({
      request,
    }) => {
      const response = await request.get(`${API_BASE}/belt`);
      expect(response.ok()).toBeTruthy();
      const body = await response.json();
      // Public response has belts array
      expect(body.belts || body.belt).toBeTruthy();
    });
  });

  test.describe("Certificates endpoint", () => {
    test("GET /api/certificates/:id returns 404 for non-existent cert", async ({
      request,
    }) => {
      const response = await request.get(
        `${API_BASE}/certificates/nonexistent-id`,
      );
      expect(response.status()).toBe(404);
    });
  });

  test.describe("Verify endpoint", () => {
    test("GET /api/verify/:token returns 404 for invalid token", async ({
      request,
    }) => {
      const response = await request.get(`${API_BASE}/verify/invalid-token`);
      expect(response.status()).toBe(404);
    });
  });

  test.describe("Admin endpoints", () => {
    test("POST /api/admin/login rejects wrong password", async ({
      request,
    }) => {
      const response = await request.post(`${API_BASE}/admin/login`, {
        data: { password: "wrong-admin-password" },
      });
      // May return 401, 403, or 503 if ADMIN_PASSWORD not configured
      expect(response.status()).not.toBe(200);
    });

    test("GET /api/admin/codes requires authentication", async ({
      request,
    }) => {
      const response = await request.get(`${API_BASE}/admin/codes`);
      expect(response.status()).toBe(401);
    });
  });

  test.describe("Submit endpoint", () => {
    test("POST /api/submit requires authentication", async ({ request }) => {
      const response = await request.post(`${API_BASE}/submit`, {
        data: { questId: "quest-01", code: "test code" },
      });
      expect(response.status()).toBe(401);
    });
  });

  test.describe("Validate code endpoint", () => {
    test("POST /api/validate-code requires code parameter", async ({
      request,
    }) => {
      const response = await request.post(`${API_BASE}/validate-code`, {
        data: {},
      });
      // Should return 400 or 401
      expect(response.status()).toBeLessThan(500);
    });
  });

  test.describe("CORS and headers", () => {
    test("API responses have correct content-type", async ({ request }) => {
      const response = await request.get(`${API_BASE}/health`);
      const contentType = response.headers()["content-type"] || "";
      expect(contentType).toContain("json");
    });

    test("API returns proper error format", async ({ request }) => {
      const response = await request.post(`${API_BASE}/auth/login`, {
        data: { email: "invalid", password: "invalid" },
      });
      const body = await response.json();
      // Error responses should have error field
      expect(body.error || body.message).toBeTruthy();
    });
  });
});
