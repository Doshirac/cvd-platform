import { test, expect } from 'playwright/test';

test('displays NotFoundPage for invalid route', async ({ page }) => {
  await page.goto('/non-existent-route');

  // Wait for the page to load
  await page.waitForSelector('.code', { timeout: 10000 });

  // Check for 404 code
  await expect(page.locator('.code')).toContainText('404');

  // Check title
  await expect(page.locator('h1')).toContainText('Page Not Found');

  // Check description
  await expect(page.locator('.description')).toContainText("The page you're looking for doesn't exist");

  // Check buttons
  await expect(page.locator('button', { hasText: 'Go to Homepage' })).toBeVisible();
  await expect(page.locator('button', { hasText: 'Go Back' })).toBeVisible();

  // Check helpful links section
  await expect(page.locator('h2')).toContainText('Helpful Links');
  await expect(page.locator('li', { hasText: 'Explore Cardiovascular Diseases' })).toBeVisible();
});