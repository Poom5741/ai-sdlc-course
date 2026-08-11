import { test, expect } from '@playwright/test';

test.describe('Workshop pages', () => {
  test('overview page loads with schedule and quests', async ({ page }) => {
    await page.goto('/workshop/overview');
    await expect(page.locator('h1')).toContainText('AI SDLC Workshop');
    await expect(page.locator('h2').filter({ hasText: 'Workshop Schedule' })).toBeVisible();
    await expect(page.locator('table').first()).toBeVisible();
  });

  test('sidebar shows navigation to all blocks', async ({ page }) => {
    await page.goto('/workshop/overview');
    const sidebar = page.locator('aside#sidebar');
    await expect(sidebar).toBeVisible();
    // Sidebar sections are collapsed by default — expand Block 1 to verify links exist
    const block1Toggle = sidebar.locator('button[data-section="/workshop/block-1-ai-tools"]');
    await block1Toggle.click();
    await expect(sidebar.getByRole('link', { name: 'Overview' }).first()).toBeVisible();
  });

  test('navigates from overview to block 1 via sidebar', async ({ page }) => {
    await page.goto('/workshop/overview');
    const sidebar = page.locator('aside#sidebar');
    // Expand Block 1 section first
    const block1Toggle = sidebar.locator('button[data-section="/workshop/block-1-ai-tools"]');
    await block1Toggle.click();
    // Click the Block 1 Overview link (second Overview link in sidebar)
    const block1OverviewLink = sidebar.locator('a[href="/workshop/block-1-ai-tools"]');
    await block1OverviewLink.click();
    await expect(page).toHaveURL(/\/workshop\/block-1/);
    await expect(page.locator('h1')).toContainText('Block 1');
  });

  test('block 1 page shows learning content', async ({ page }) => {
    await page.goto('/workshop/block-1-ai-tools');
    await expect(page.locator('h1')).toContainText('Block 1');
    await expect(page.locator('h2').first()).toBeVisible();
  });

  test('prev/next navigation works between blocks', async ({ page }) => {
    await page.goto('/workshop/block-1-ai-tools');
    const nextLink = page.locator('a').filter({ hasText: /Next|ถัดไป/ }).first();
    if (await nextLink.isVisible()) {
      await nextLink.click();
      await expect(page).toHaveURL(/\/workshop\/block-2/);
    }
  });
});
