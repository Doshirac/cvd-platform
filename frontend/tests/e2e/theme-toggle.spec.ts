import { test, expect } from 'playwright/test';

test('theme toggle changes theme', async ({ page }) => {
  await page.goto('/');

  // Get the theme toggle button
  const themeToggle = page.locator('[aria-label*="Switch to"]');

  // Initially, assume light theme or check body class
  // Since theme is stored in localStorage or context, check initial aria-label
  const initialLabel = await themeToggle.getAttribute('aria-label');
  expect(initialLabel).toMatch(/Switch to (light|dark) theme/);

  // Click to toggle
  await themeToggle.click();

  // Check if aria-label changed
  const newLabel = await themeToggle.getAttribute('aria-label');
  expect(newLabel).not.toBe(initialLabel);
  expect(newLabel).toMatch(/Switch to (light|dark) theme/);

  // Optionally, check if body has theme class, but since it's React, might not be on body
  // Perhaps check localStorage or something, but for e2e, visual change might be hard
});