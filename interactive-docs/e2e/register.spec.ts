import { test, expect } from '@playwright/test';

test.describe('Register page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('renders registration form', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/Register|Sign Up/i);
    await expect(page.locator('#register-form')).toBeVisible();
  });

  test('has input fields for name, email, and password', async ({ page }) => {
    await expect(page.locator('#display-name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
  });

  test('has link to login page', async ({ page }) => {
    const loginLink = page.getByRole('link', { name: /Sign In|Login/i });
    await expect(loginLink).toBeVisible();
    await loginLink.click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('shows BlueBeltDojo branding', async ({ page }) => {
    await expect(page.locator('a').filter({ hasText: 'BlueBeltDojo' })).toBeVisible();
  });

  test('shows error on invalid registration (mocked)', async ({ page }) => {
    await page.route('**/api/auth/register', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Email already exists' }),
      });
    });

    await page.fill('#display-name', 'Test User');
    await page.fill('#email', 'existing@example.com');
    await page.fill('#password', 'password123');
    await page.click('#register-form button[type="submit"]');

    const errorDiv = page.locator('#error-msg, #register-error');
    await expect(errorDiv).toBeVisible();
    await expect(errorDiv).toContainText(/already exists|error/i);
  });

  test('successful registration redirects to login or dashboard', async ({ page }) => {
    await page.route('**/api/auth/register', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          token: 'mock-token',
          userId: 2,
          email: 'new@example.com',
          displayName: 'New User',
          belt: 'white',
        }),
      });
    });

    await page.fill('#display-name', 'New User');
    await page.fill('#email', 'new@example.com');
    await page.fill('#password', 'password123');
    await page.click('#register-form button[type="submit"]');

    // Should redirect to dashboard or login
    await expect(page).toHaveURL(/\/(dashboard|login)/);
  });
});
