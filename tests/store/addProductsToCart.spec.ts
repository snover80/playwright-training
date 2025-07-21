import { test, expect } from '../../fixtures/fixtures';


test('Add items to cart', async ({ homePage, cartPage}) => {
    await expect(homePage.homePageAssertionLocators.pageBanner).toBeVisible();
    await homePage.cliclNavbarLink("Products");
    const product1Info = await homePage.addRandomProductToCart();
    const product2Info = await homePage.addRandomProductToCart();

    await homePage.cliclNavbarLink("Cart");

    const cartInfoProduct1 = await cartPage.getProductInformationByName(product1Info.name);
    expect(cartInfoProduct1.price).toBe(product1Info.price);
    const cartInfoProduct2 = await cartPage.getProductInformationByName(product2Info.name);
    expect(cartInfoProduct2.price).toBe(product2Info.price);

});