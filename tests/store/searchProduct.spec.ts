import { test, expect } from '../../fixtures/fixtures';

const productName = "Colour Blocked Shirt – Sky Blue";

test('Filter product', async ({ homePage }) => {
    await homePage.cliclNavbarLink("Products");
    await homePage.searchForProduct(productName);

    expect(await homePage.getProductName()).toContain(productName);
});