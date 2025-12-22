import { test, expect } from 'playwright/test';

test('displays NotFoundPage for invalid route', async ({ page }) => {
  await page.goto('/non-existent-route');

  // Wait for the page to load and check for 404 code
  const codeLocator = page.locator('div').filter({ hasText: /^404$/ });
  await expect(codeLocator).toBeVisible({ timeout: 10000 });

  // Check title
  await expect(page.locator('h1')).toContainText('Page Not Found');

  // Check description
  await expect(page.getByText("The page you're looking for doesn't exist")).toBeVisible();

  // Check buttons
  await expect(page.getByRole('button', { name: /Go to Homepage/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /Go Back/ })).toBeVisible();

  // Check helpful links section
  await expect(page.locator('h2')).toContainText('Helpful Links');
  await expect(page.getByRole('link', { name: 'Explore Cardiovascular Diseases' })).toBeVisible();
});