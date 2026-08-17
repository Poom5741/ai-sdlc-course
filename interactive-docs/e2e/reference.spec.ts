import { test, expect } from '@playwright/test';

test.describe('Reference pages', () => {
  test('claude code reference loads with setup instructions', async ({ page }) => {
    await page.goto('/reference/claude-code');
    const article = page.locator('main');
    await expect(article.locator('h1').first()).toContainText('Claude Code');
    await expect(article.getByText('Terminal Agent')).toBeVisible();
    await expect(article.locator('h2').filter({ hasText: 'Overview' })).toBeVisible();
  });

  test('reference page has code blocks with commands', async ({ page }) => {
    await page.goto('/reference/claude-code');
    const article = page.locator('main');
    await expect(article.locator('pre code').first()).toBeVisible();
  });

  test('github copilot reference loads', async ({ page }) => {
    await page.goto('/reference/github-copilot');
    const article = page.locator('main');
    await expect(article.locator('h1').first()).toContainText('GitHub Copilot');
  });
});

test.describe('Sitemap', () => {
  test('shows all page sections with links', async ({ page }) => {
    await page.goto('/sitemap');
    const article = page.locator('main');
    await expect(article.locator('h1').first()).toContainText('Sitemap');
    await expect(article.locator('h2').filter({ hasText: 'Home' })).toBeVisible();
    await expect(article.locator('h2').filter({ hasText: 'Workshop' })).toBeVisible();
    await expect(article.locator('h2').filter({ hasText: 'Quests' })).toBeVisible();
    await expect(article.locator('h2').filter({ hasText: 'Reference' })).toBeVisible();
  });

  test('sitemap links navigate to correct pages', async ({ page }) => {
    await page.goto('/sitemap');
    const workshopLink = page.locator('a[href="/workshop/overview"]');
    await workshopLink.click();
    await expect(page).toHaveURL(/\/workshop\/overview/);
  });
});
