import { expect, test } from '@playwright/test';

test('student sees a safe state while approved lesson content is unavailable', async ({ page }) => {
  await page.goto('/lessons');
  await expect(page.getByRole('status')).toContainText(/no approved lessons/i);
});
