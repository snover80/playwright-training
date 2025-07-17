import { test, expect } from '../../fixtures/fixtures';

const productName = "Printed Off Shoulder Top - White";

test('has title', async ({ homePage, productDetails}) => {
    await expect(homePage.homePageAssertionLocators.pageBanner).toBeVisible();
    await homePage.cliclNavbarLink("Products");
    await homePage.viewProductDetails(productName);

    await expect(productDetails.productDetailsAssertions.productTitle).toBeVisible();
    await expect(productDetails.productDetailsAssertions.productAvailability).toBeVisible();
    await expect(productDetails.productDetailsAssertions.productPrice).toBeVisible();
    await expect(productDetails.productDetailsAssertions.productCondition).toBeVisible();
});