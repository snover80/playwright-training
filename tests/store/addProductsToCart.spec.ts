import { test, expect } from '../../fixtures/fixtures';

const productName = "Colour Blocked Shirt – Sky Blue";

test.use({ storageState: {cookies: [], origins: []} });
test('Add items to cart', async ({ homePage, cartPage}) => {
    await homePage.cliclNavbarLink("Products");
    const product1Info = await homePage.addRandomProductToCart();
    const product2Info = await homePage.addRandomProductToCart();

    await homePage.cliclNavbarLink("Cart");

    const cartInfoProduct1 = await cartPage.getProductInformationByName(product1Info.name);
    expect(cartInfoProduct1.price).toBe(product1Info.price);
    const cartInfoProduct2 = await cartPage.getProductInformationByName(product2Info.name);
    expect(cartInfoProduct2.price).toBe(product2Info.price);

});

test.use({ storageState: {cookies: [], origins: []} });
test('Add items to cart from product view', async ({ homePage, productDetailsPage, cartPage}) => {
    await homePage.cliclNavbarLink("Products");
    await homePage.searchForProduct(productName);
    await homePage.viewProductDetails(productName);

    await productDetailsPage.setQuantity(2);
    const productInfo = await productDetailsPage.getProductInfo();
    await productDetailsPage.addToCart();
    await productDetailsPage.clickContinueShoppingButton();

    await homePage.cliclNavbarLink("Cart");

    const cartInfoProduct = await cartPage.getProductInformationByName(productInfo.title);
    expect(cartInfoProduct.price).toBe(productInfo.price);
    expect(cartInfoProduct.quantity).toBe("2");
});