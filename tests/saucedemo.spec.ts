import { test, expect } from '../fixtures/fixtures'


test('has title', async ({ page, loginFacade, itemsPage , checkoutPage}) => {
  await page.goto("https://www.saucedemo.com");
  await expect(page).toHaveTitle(/Swag Labs/);
  await loginFacade.loginUser(process.env.TEST_USER, process.env.TEST_PASSWORD);

  await expect(itemsPage.getTitlePageLocator()).toBeVisible();
  await expect(itemsPage.getTitlePageLocator()).toHaveText("Products");

  const randomItem =  await itemsPage.getRandomItem();
  const expectedDescription = await itemsPage.getItemDescription(page, randomItem);
  const expectedName = await itemsPage.getItemName(page, randomItem);
  const expectedPrice = await itemsPage.getItemPrice(page, randomItem);

  await itemsPage.addItemToCart(randomItem);

  await expect(itemsPage.getRemoveLocatorFromItem(randomItem)).toBeVisible();

  await itemsPage.clickShoppingCart();

  await expect(checkoutPage.getTitlePageLocator()).toBeVisible();
  await expect(checkoutPage.getTitlePageLocator()).toHaveText("Your Cart");

  const actualDescription = await itemsPage.getItemDescription(page);
  const actualName = await itemsPage.getItemName(page);
  const actualPrice = await itemsPage.getItemPrice(page);

  expect(actualDescription).toEqual(expectedDescription);
  expect(expectedName).toEqual(actualName);
  expect(actualPrice).toEqual(expectedPrice);

  await checkoutPage.clickCheckoutButton();

  await expect(checkoutPage.getTitlePageLocator()).toHaveText("Checkout: Your Information");

  await checkoutPage.fillFirstName("Random Name");
  await checkoutPage.fillLastName("Random Last Name");
  await checkoutPage.fillZipCode("11021");

  await checkoutPage.clickContinue();

  await expect(checkoutPage.assertionLocators.cartItem).toBeVisible();
  await expect(checkoutPage.assertionLocators.paymentInfo).toBeVisible();
  await expect(checkoutPage.assertionLocators.shippingInfo).toBeVisible();
  await expect(checkoutPage.assertionLocators.summaryInfo).toBeVisible();

  await checkoutPage.clickFinish();

  await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!");
  await expect(page.locator(".complete-text")).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");

});