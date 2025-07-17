import { test as base, expect } from '@playwright/test';

export const test = base.extend<{ forEachTest: void }>({
  forEachTest: [async ({ page }, use) => {

    await page.goto("/");
    await expect(page).toHaveTitle(/Automation Exercise/);
    await use();

    console.log('Last URL:', page.url());
  }, { auto: true }],
});

export { expect } from '@playwright/test';