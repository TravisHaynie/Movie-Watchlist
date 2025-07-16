import { test, expect } from '@playwright/test';

test('homepage loads and shows + button', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/index.html');

  // Target using the class name
  await expect(page.locator('.watchlist-btn')).toBeVisible();
});
