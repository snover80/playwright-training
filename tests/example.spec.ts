import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('test 3', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/');

  await page.locator('[name="as_word"]').fill('iPhone 16');

  await page.keyboard.press('Enter');

  await expect(page.locator("ol[class~='ui-search-layout']")).toBeVisible();

  const titleList = await page.locator("ol[class~='ui-search-layout'] a");

  const count = await titleList.count();

  for (let i = 0; i < count; i++) {
    console.log(await titleList.nth(i).textContent())
  }
 
});
