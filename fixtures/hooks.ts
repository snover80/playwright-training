import { test as base, expect } from '../fixtures/pages';

export const test = base.extend<{ forEachTest: void }>({
  forEachTest: [async ({ page, homePage }, use) => {

    await page.goto("/");
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(homePage.homePageAssertionLocators.pageBanner).toBeVisible();
    await use();

    console.log('Last URL:', page.url());
  }, { auto: true }],
});

export { expect } from '@playwright/test';