import { test, expect } from '../fixtures/fixtures'


test('Sample sauce demo', async ({ page, loginFacade, itemsPage , checkoutPageSauce}) => {
  await page.goto("https://www.saucedemo.com");
  await expect(page).toHaveTitle(/Swag Labs/);
  await loginFacade.loginUser(process.env.SAUCE_DEMO_USER, process.env.SAUCE_DEMO_PASSWORD);

  await expect(itemsPage.getTitlePageLocator()).toBeVisible();
  await expect(itemsPage.getTitlePageLocator()).toHaveText("Products");

  const randomItem =  await itemsPage.getRandomItem();
  const expectedDescription = await itemsPage.getItemDescription(page, randomItem);
  const expectedName = await itemsPage.getItemName(page, randomItem);
  const expectedPrice = await itemsPage.getItemPrice(page, randomItem);

  await itemsPage.addItemToCart(randomItem);

  await expect(itemsPage.getRemoveLocatorFromItem(randomItem)).toBeVisible();

  await itemsPage.clickShoppingCart();

  await expect(checkoutPageSauce.getTitlePageLocator()).toBeVisible();
  await expect(checkoutPageSauce.getTitlePageLocator()).toHaveText("Your Cart");

  const actualDescription = await itemsPage.getItemDescription(page);
  const actualName = await itemsPage.getItemName(page);
  const actualPrice = await itemsPage.getItemPrice(page);

  expect(actualDescription).toEqual(expectedDescription);
  expect(expectedName).toEqual(actualName);
  expect(actualPrice).toEqual(expectedPrice);

  await checkoutPageSauce.clickCheckoutButton();

  await expect(checkoutPageSauce.getTitlePageLocator()).toHaveText("Checkout: Your Information");

  await checkoutPageSauce.fillFirstName("Random Name");
  await checkoutPageSauce.fillLastName("Random Last Name");
  await checkoutPageSauce.fillZipCode("11021");

  await checkoutPageSauce.clickContinue();

  await expect(checkoutPageSauce.assertionLocators.cartItem).toBeVisible();
  await expect(checkoutPageSauce.assertionLocators.paymentInfo).toBeVisible();
  await expect(checkoutPageSauce.assertionLocators.shippingInfo).toBeVisible();
  await expect(checkoutPageSauce.assertionLocators.summaryInfo).toBeVisible();

  await checkoutPageSauce.clickFinish();

  await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!");
  await expect(page.locator(".complete-text")).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");

});