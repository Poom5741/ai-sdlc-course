import { test, expect } from '@playwright/test';

test.describe('Quest pages', () => {
  test('quest 1 loads with badges and goal section', async ({ page }) => {
    await page.goto('/quests/quest-1-first-code');
    // Target the article content h1, not sidebar or modal h1s
    const article = page.locator('article');
    await expect(article.locator('h1').first()).toContainText('Quest 1.1');
    await expect(article.getByText('Easy')).toBeVisible();
    await expect(article.getByText('15 minutes')).toBeVisible();
    await expect(article.locator('h2').filter({ hasText: 'Goal' })).toBeVisible();
  });

  test('quest 1 shows instructions with steps', async ({ page }) => {
    await page.goto('/quests/quest-1-first-code');
    const article = page.locator('article');
    await expect(article.locator('h2').filter({ hasText: 'Instructions' })).toBeVisible();
    await expect(article.locator('ol, ul').first()).toBeVisible();
  });

  test('quest 1 has code playground iframe', async ({ page }) => {
    await page.goto('/quests/quest-1-first-code');
    const article = page.locator('article');
    await expect(article.locator('h2').filter({ hasText: 'Code Playground' })).toBeVisible();
    await expect(article.locator('iframe')).toBeVisible();
  });

  test('quest 2 multi-prompt page loads', async ({ page }) => {
    await page.goto('/quests/quest-2-prompts');
    const article = page.locator('article');
    await expect(article.locator('h1').first()).toContainText('Quest');
    await expect(article.locator('h2').first()).toBeVisible();
  });

  test('sidebar shows quest links within block sections', async ({ page }) => {
    await page.goto('/quests/quest-1-first-code');
    const sidebar = page.locator('aside#sidebar');
    await expect(sidebar).toBeVisible();
    // Block 1 should be auto-expanded since we're on a quest in that block
    await expect(sidebar.getByRole('link', { name: 'Quest 1.1' })).toBeVisible();
  });
});
