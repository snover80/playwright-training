import { test, expect } from '../../fixtures/fixtures';


test('has title', async ({ homePage, productDetails}) => {
    await expect(homePage.homePageAssertionLocators.pageBanner).toBeVisible();
    await homePage.cliclNavbarLink("Products");
    const productName1 = await homePage.addRandomProductToCart();
    const productName2 = await homePage.addRandomProductToCart();
});