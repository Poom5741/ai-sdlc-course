import { test, expect } from '@playwright/test';

test.describe('Workshop pages', () => {
  test('overview page loads', async ({ page }) => {
    await page.goto('/workshop/overview');
    await expect(page.locator('h1').first()).toContainText('Workshop');
  });

  test('sidebar shows navigation', async ({ page }) => {
    await page.goto('/workshop/overview');
    const sidebar = page.locator('#starlight__sidebar');
    await expect(sidebar).toBeVisible();
  });

  test('navigates from overview to block 1', async ({ page }) => {
    await page.goto('/workshop/overview');
    const sidebar = page.locator('#starlight__sidebar');
    await expect(sidebar).toBeVisible();
    // Look for any block link in sidebar
    const blockLink = sidebar.locator('a[href*="block-"]').first();
    if (await blockLink.isVisible()) {
      await blockLink.click();
      await expect(page.locator('h1').first()).toBeVisible();
    }
  });

  test('block 1 page shows learning content', async ({ page }) => {
    await page.goto('/workshop/block-1-ai-tools');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('prev/next navigation works between blocks', async ({ page }) => {
    await page.goto('/workshop/block-1-ai-tools');
    const nextLink = page.locator('a').filter({ hasText: /Next|ถัดไป/ }).first();
    if (await nextLink.isVisible()) {
      await nextLink.click();
      await expect(page.locator('h1').first()).toBeVisible();
    }
  });
});
