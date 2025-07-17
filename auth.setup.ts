import { test as setup, expect } from './fixtures/fixtures';

setup('Create Auth Login', async ({ loginPage, page }) => {
    await loginPage.clickLoginLink();
    await loginPage.fillEmail(process.env.TEST_USER || '');
    await loginPage.fillPassword(process.env.TEST_PASSWORD || '');
    await loginPage.clickLoginButton();
    await expect(loginPage.getLoginUserNameLocator()).toBeVisible();
    await page.context().storageState({ path: '.playwright/.auth.json' });
});
