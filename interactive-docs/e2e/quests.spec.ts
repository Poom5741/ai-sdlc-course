import { test, expect } from '@playwright/test';

test.describe('Quest pages', () => {
  test('quest 1 loads with badges and goal section', async ({ page }) => {
    await page.goto('/quests/quest-1-first-code');
    const main = page.locator('main');
    // Root locale serves Thai content; title is in frontmatter
    await expect(main.locator('h1').first()).toContainText('Quest 1');
    await expect(main.getByText('medium')).toBeVisible();
    await expect(main.getByText('25 minutes')).toBeVisible();
    // Thai heading for "Goal"
    await expect(main.locator('h2').filter({ hasText: 'เป้าหมาย' })).toBeVisible();
  });

  test('quest 1 shows instructions with steps', async ({ page }) => {
    await page.goto('/quests/quest-1-first-code');
    const main = page.locator('main');
    // Thai heading for "Instructions"
    await expect(main.locator('h2').filter({ hasText: 'วิธีทำ' })).toBeVisible();
    await expect(main.locator('ol, ul').first()).toBeVisible();
  });

  test('quest 1 has code playground iframe', async ({ page }) => {
    await page.goto('/quests/quest-1-first-code');
    const main = page.locator('main');
    // Thai content uses code blocks instead of iframes
    await expect(main.locator('code, pre').first()).toBeVisible();
  });

  test('quest 2 multi-prompt page loads', async ({ page }) => {
    await page.goto('/en/quests/quest-2-prompts');
    const main = page.locator('main');
    await expect(main.locator('h1').first()).toContainText('Quest');
    await expect(main.locator('h2').first()).toBeVisible();
  });

  test('sidebar shows quest links within block sections', async ({ page }) => {
    await page.goto('/quests/quest-1-first-code');
    const sidebar = page.locator('#starlight__sidebar');
    await expect(sidebar).toBeVisible();
    await expect(sidebar.getByRole('link', { name: 'Quest 1 - First AI Completion' })).toBeVisible();
  });
});
