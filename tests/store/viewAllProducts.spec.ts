import { test, expect } from '../../fixtures/fixtures';

const productName = "Printed Off Shoulder Top - White";

test('has title', async ({ homePage, productDetailsPage}) => {
    await expect(homePage.homePageAssertionLocators.pageBanner).toBeVisible();
    await homePage.cliclNavbarLink("Products");
    await homePage.viewProductDetails(productName);

    await expect(productDetailsPage.productDetailsAssertions.productTitle).toBeVisible();
    await expect(productDetailsPage.productDetailsAssertions.productAvailability).toBeVisible();
    await expect(productDetailsPage.productDetailsAssertions.productPrice).toBeVisible();
    await expect(productDetailsPage.productDetailsAssertions.productCondition).toBeVisible();
});