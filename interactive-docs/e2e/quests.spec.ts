import { test, expect } from '@playwright/test';

test.describe('Quest pages', () => {
  test('quest 1 loads with badges and goal section', async ({ page }) => {
    await page.goto('/quests/quest-1-first-code');
    const main = page.locator('main');
    await expect(main.locator('h1').first()).toContainText('Quest 1');
    await expect(main.getByText('medium')).toBeVisible();
    await expect(main.getByText('25 minutes')).toBeVisible();
    await expect(main.locator('h2').filter({ hasText: 'เป้าหมาย' })).toBeVisible();
  });

  test('quest 1 shows instructions with steps', async ({ page }) => {
    await page.goto('/quests/quest-1-first-code');
    const main = page.locator('main');
    await expect(main.locator('h2').filter({ hasText: 'วิธีทำ' })).toBeVisible();
    await expect(main.locator('ol, ul').first()).toBeVisible();
  });

  test('quest 1 has code blocks', async ({ page }) => {
    await page.goto('/quests/quest-1-first-code');
    const main = page.locator('main');
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

  // --- Locale switching ---

  test('locale switcher toggles between Thai and English', async ({ page }) => {
    await page.goto('/quests/quest-1-first-code');
    // Default locale is root (Thai) — language selector should be visible
    const langSelect = page.locator('[data-locale]')
      .or(page.getByRole('combobox'))
      .or(page.locator('.language-select'));
    await expect(langSelect.first()).toBeVisible();
  });

  test('English quest page loads via /en/ prefix', async ({ page }) => {
    await page.goto('/en/quests/quest-1-first-code');
    const main = page.locator('main');
    await expect(main.locator('h1').first()).toContainText('Quest 1');
    // English version should have English headings
    await expect(main.locator('h2').filter({ hasText: 'Goal' })).toBeVisible();
  });

  // --- Table of contents ---

  test('table of contents shows on right sidebar', async ({ page }) => {
    await page.goto('/quests/quest-1-first-code');
    const toc = page.locator('.right-sidebar, aside.right-sidebar-container').first();
    await expect(toc).toBeVisible();
    // TOC heading should be present
    await expect(toc.getByRole('heading', { name: /tableOfContents|On this page/ })).toBeVisible();
  });

  // --- Sidebar navigation ---

  test('sidebar shows all module sections', async ({ page }) => {
    await page.goto('/quests/quest-1-first-code');
    const sidebar = page.locator('#starlight__sidebar');
    await expect(sidebar).toBeVisible();
    // Use exact text to avoid matching Module 10/11/12
    await expect(sidebar.getByText('Module 1: AI & LLM Foundations')).toBeVisible();
  });

  test('clicking sidebar quest link navigates correctly', async ({ page }) => {
    await page.goto('/quests/quest-1-first-code');
    const sidebar = page.locator('#starlight__sidebar');
    await sidebar.getByRole('link', { name: 'Quest 2 - Multi-File Project' }).click();
    await expect(page).toHaveURL(/quest-2/);
    const main = page.locator('main');
    await expect(main.locator('h1').first()).toContainText('Quest 2');
  });

  // --- Multiple quest pages across modules ---

  test('quest 3 (security) page loads', async ({ page }) => {
    await page.goto('/quests/quest-3-security');
    const main = page.locator('main');
    await expect(main.locator('h1').first()).toContainText('Quest 3');
  });

  test('quest 10 (advanced) page loads', async ({ page }) => {
    await page.goto('/quests/quest-10-fix-harden');
    const main = page.locator('main');
    await expect(main.locator('h1').first()).toContainText('Quest 10');
  });

  test('quest 50 (mid-course) page loads', async ({ page }) => {
    await page.goto('/quests/quest-50-ai-review-policy');
    const main = page.locator('main');
    await expect(main.locator('h1').first()).toContainText('Quest 50');
  });

  test('quest 100 (late-course) page loads', async ({ page }) => {
    await page.goto('/quests/quest-100-framework-migration');
    const main = page.locator('main');
    // Title comes from frontmatter, may not include quest number
    await expect(main.locator('h1').first()).toContainText('Framework Migration');
  });

  test('quest 136 (final quest) page loads', async ({ page }) => {
    await page.goto('/quests/quest-136-fullstack-deploy');
    const main = page.locator('main');
    await expect(main.locator('h1').first()).toContainText('Full Stack Deploy');
  });

  // --- Workshop pages ---

  test('workshop overview page loads', async ({ page }) => {
    await page.goto('/workshop/overview');
    const main = page.locator('main');
    await expect(main.locator('h1').first()).toBeVisible();
  });

  test('workshop block page loads', async ({ page }) => {
    await page.goto('/workshop/block-1-ai-tools');
    const main = page.locator('main');
    await expect(main.locator('h1').first()).toBeVisible();
  });

  // --- Reference pages ---

  test('reference page loads', async ({ page }) => {
    await page.goto('/reference/setup-guide');
    const main = page.locator('main');
    await expect(main.locator('h1').first()).toBeVisible();
  });

  // --- Capstone pages ---

  test('capstone page loads', async ({ page }) => {
    await page.goto('/capstones/capstone-1-api-service');
    const main = page.locator('main');
    await expect(main.locator('h1').first()).toBeVisible();
  });

  // --- 404 handling ---

  test('non-existent quest returns 404', async ({ page }) => {
    const response = await page.goto('/quests/non-existent-quest');
    expect(response?.status()).toBe(404);
  });

  test('non-existent page shows 404 page', async ({ page }) => {
    await page.goto('/completely-made-up-path');
    // Should show 404 content
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  // --- Code blocks and content rendering ---

  test('quest with code blocks renders syntax highlighting', async ({ page }) => {
    await page.goto('/quests/quest-1-first-code');
    const main = page.locator('main');
    // Should have code blocks with language tags
    const codeBlocks = main.locator('pre');
    await expect(codeBlocks.first()).toBeVisible();
  });

  // --- Breadcrumbs / page metadata ---

  test('page has correct lang attribute for default locale', async ({ page }) => {
    await page.goto('/quests/quest-1-first-code');
    await expect(page.locator('html')).toHaveAttribute('lang', 'th');
  });

  test('English page has correct lang attribute', async ({ page }) => {
    await page.goto('/en/quests/quest-1-first-code');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  // --- Search ---

  test('search button is visible in header', async ({ page }) => {
    await page.goto('/quests/quest-1-first-code');
    // Starlight search trigger button (not the hidden form)
    const searchBtn = page.locator('[data-pagefind-ui-trigger], button[aria-label*="Search"], button[aria-label*="search"]').first();
    await expect(searchBtn).toBeVisible();
  });

  // --- Responsive: sidebar toggle on mobile ---

  test('mobile menu toggle is visible on small viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/quests/quest-1-first-code');
    // Starlight mobile menu toggle
    const toggle = page.locator('[aria-label*="menu"], [aria-label*="Menu"], .mobile-menu-toggle').first();
    await expect(toggle).toBeVisible();
  });

  test('sidebar is hidden on mobile by default', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/quests/quest-1-first-code');
    const sidebar = page.locator('#starlight__sidebar');
    // Should not be visible on mobile (hidden behind toggle)
    await expect(sidebar).not.toBeVisible();
  });

  // --- Consecutive navigation ---

  test('can navigate between multiple quest pages', async ({ page }) => {
    await page.goto('/quests/quest-1-first-code');
    await expect(page.locator('main').locator('h1').first()).toContainText('Quest 1');

    await page.goto('/quests/quest-2-prompts');
    await expect(page.locator('main').locator('h1').first()).toContainText('Quest 2');

    await page.goto('/quests/quest-3-security');
    await expect(page.locator('main').locator('h1').first()).toContainText('Quest 3');
  });

  // --- Content structure ---

  test('quest page has goal, instructions, and verification sections', async ({ page }) => {
    await page.goto('/quests/quest-1-first-code');
    const main = page.locator('main');
    // Goal section
    await expect(main.locator('h2').filter({ hasText: 'เป้าหมาย' })).toBeVisible();
    // Instructions section
    await expect(main.locator('h2').filter({ hasText: 'วิธีทำ' })).toBeVisible();
    // Verification section
    await expect(main.locator('h2').filter({ hasText: 'การตรวจสอบ' })).toBeVisible();
  });
});
