import { test, expect } from '@playwright/test';

test.describe('Login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('renders login form with email and password fields', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Sign In');
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-form button[type="submit"]')).toBeVisible();
  });

  test('shows BlueBeltDojo branding', async ({ page }) => {
    await expect(page.locator('a').filter({ hasText: 'BlueBeltDojo' })).toBeVisible();
  });

  test('has link to register page', async ({ page }) => {
    const registerLink = page.getByRole('link', { name: 'Register' });
    await expect(registerLink).toBeVisible();
    await registerLink.click();
    await expect(page).toHaveURL(/\/register/);
  });

  test('shows error message on invalid credentials (mocked)', async ({ page }) => {
    await page.route('**/api/auth/login', async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Invalid email or password' }),
      });
    });

    await page.fill('#email', 'wrong@example.com');
    await page.fill('#password', 'wrongpassword');
    await page.click('#login-form button[type="submit"]');

    const errorDiv = page.locator('#error-msg');
    await expect(errorDiv).toBeVisible();
    await expect(errorDiv).toContainText('Invalid email or password');
  });

  test('shows network error on fetch failure', async ({ page }) => {
    await page.route('**/api/auth/login', async (route) => {
      await route.abort('connectionrefused');
    });

    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
    await page.click('#login-form button[type="submit"]');

    const errorDiv = page.locator('#error-msg');
    await expect(errorDiv).toBeVisible();
    await expect(errorDiv).toContainText('Network error');
  });

  test('successful login redirects to dashboard', async ({ page }) => {
    await page.route('**/api/auth/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          token: 'mock-token',
          userId: 1,
          email: 'test@example.com',
          displayName: 'Test User',
          belt: 'white',
        }),
      });
    });

    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
    await page.click('#login-form button[type="submit"]');

    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('submit button shows loading state during request', async ({ page }) => {
    await page.route('**/api/auth/login', async (route) => {
      // Delay the response to observe loading state
      await new Promise((r) => setTimeout(r, 500));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          token: 'mock-token',
          userId: 1,
          email: 'test@example.com',
          displayName: 'Test User',
          belt: 'white',
        }),
      });
    });

    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
    await page.click('#login-form button[type="submit"]');

    const submitBtn = page.locator('#submit-btn');
    await expect(submitBtn).toHaveText('Signing in...');
    await expect(submitBtn).toBeDisabled();
  });

  test('redirects to dashboard if already logged in', async ({ page }) => {
    await page.goto('/login');
    // Set token before navigation
    await page.evaluate(() => {
      localStorage.setItem('bbd_token', 'existing-token');
    });
    await page.reload();
    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  });
});
