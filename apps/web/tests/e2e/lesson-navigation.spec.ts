import { expect, test } from '@playwright/test';

test('student can open a listed lesson and sees a safe missing-lesson response', async ({
  page,
}) => {
  await page.goto('/lessons?demo=1');
  await page.getByRole('link', { name: /open lesson/i }).first().click();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  await page.goto('/lessons/does-not-exist?demo=1');
  await expect(page.getByText(/not found/i)).toBeVisible();
});
