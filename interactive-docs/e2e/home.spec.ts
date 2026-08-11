import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows hero section with headline', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Train Your');
    await expect(page.locator('h1')).toContainText('AI Coding');
  });

  test('has navigation links to workshop and sitemap', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav.getByRole('link', { name: 'Workshop' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Sitemap' })).toBeVisible();
  });

  test('navigates to workshop overview when clicking Workshop link', async ({ page }) => {
    await page.getByRole('link', { name: 'Workshop' }).click();
    await expect(page).toHaveURL(/\/workshop\/overview/);
    const article = page.locator('article');
    await expect(article.locator('h1').first()).toContainText('AI SDLC Workshop');
  });

  test('navigates to sitemap when clicking Sitemap link', async ({ page }) => {
    await page.getByRole('link', { name: 'Sitemap' }).click();
    await expect(page).toHaveURL(/\/sitemap/);
  });

  test('shows curriculum section with block cards', async ({ page }) => {
    await page.locator('#curriculum').scrollIntoViewIfNeeded();
    await expect(page.locator('#curriculum')).toContainText('Block 1');
    await expect(page.locator('#curriculum')).toContainText('Block 2');
    await expect(page.locator('#curriculum')).toContainText('Block 3');
  });

  test('shows FAQ section', async ({ page }) => {
    await page.locator('#faq').scrollIntoViewIfNeeded();
    await expect(page.locator('#faq')).toContainText('Frequently');
  });
});
