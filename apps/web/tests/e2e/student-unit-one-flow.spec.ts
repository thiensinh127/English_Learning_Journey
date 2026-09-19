import { expect, test } from '@playwright/test';

test('student can use the safe demo lesson flow with missing audio fallback', async ({ page }) => {
  await page.goto('/lessons');
  await page.getByRole('link', { name: /open lesson/i }).first().click();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('status').first()).toContainText(/audio is not available/i);
});
