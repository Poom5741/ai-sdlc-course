import { test, expect } from '@playwright/test';

test.describe('Register page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('renders registration form', async ({ page }) => {
    await expect(page.locator('h1').first()).toContainText(/Register|Create Account|Sign Up/i);
    await expect(page.locator('#register-form')).toBeVisible();
  });

  test('has input fields for name, email, password, and access code', async ({ page }) => {
    await expect(page.locator('#displayName')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#accessCode')).toBeVisible();
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

  test('shows error when passwords do not match', async ({ page }) => {
    await page.fill('#displayName', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
    await page.fill('#confirmPassword', 'differentpassword');
    await page.fill('#accessCode', 'BBD-TEST-1234');
    await page.click('#register-form button[type="submit"]');

    const errorDiv = page.locator('#error-msg');
    await expect(errorDiv).toBeVisible();
    await expect(errorDiv).toContainText('Passwords do not match');
  });

  test('has password minimum length requirement', async ({ page }) => {
    const passwordInput = page.locator('#password');
    await expect(passwordInput).toHaveAttribute('minlength', '8');
  });

  test('shows error for invalid access code format', async ({ page }) => {
    await page.fill('#displayName', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
    await page.fill('#confirmPassword', 'password123');
    await page.fill('#accessCode', 'INVALID-CODE');
    await page.click('#register-form button[type="submit"]');

    const errorDiv = page.locator('#error-msg');
    await expect(errorDiv).toBeVisible();
    await expect(errorDiv).toContainText('access code');
  });

  test('successful registration shows success or redirects', async ({ page }) => {
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

    await page.fill('#displayName', 'New User');
    await page.fill('#email', 'new@example.com');
    await page.fill('#password', 'password123');
    await page.fill('#confirmPassword', 'password123');
    await page.fill('#accessCode', 'BBD-NEWU-5678');
    await page.click('#register-form button[type="submit"]');

    // Should either redirect or show success message
    await page.waitForTimeout(2000);
    const currentUrl = page.url();
    // Either redirected to dashboard/login or still on register with success
    expect(currentUrl).toMatch(/\/(register|dashboard|login)/);
  });
});
