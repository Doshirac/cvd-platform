import { test, expect } from 'playwright/test';

test('navigate to error page', async ({ page }) => {
  await page.goto('/error');

  // Wait for the page to load
  await page.waitForSelector('h1', { timeout: 10000 });

  // Check if error page is displayed
  await expect(page.locator('h1')).toContainText('Something went wrong');

  // Check for refresh button
  await expect(page.locator('button', { hasText: 'Refresh' })).toBeVisible();
});