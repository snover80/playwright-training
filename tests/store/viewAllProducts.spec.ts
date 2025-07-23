import { test, expect } from '../../fixtures/fixtures';

const productName = "Printed Off Shoulder Top - White";

test('Test view product details', async ({ homePage, productDetailsPage}) => {
    await homePage.cliclNavbarLink("Products");
    await homePage.viewProductDetails(productName);

    await expect(productDetailsPage.productDetailsAssertions.productTitle).toBeVisible();
    await expect(productDetailsPage.productDetailsAssertions.productAvailability).toBeVisible();
    await expect(productDetailsPage.productDetailsAssertions.productPrice).toBeVisible();
    await expect(productDetailsPage.productDetailsAssertions.productCondition).toBeVisible();
});