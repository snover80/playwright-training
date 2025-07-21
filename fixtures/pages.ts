import { test as base } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ItemsPage } from '../pages/ItemsPage';
import { LoginFacade } from '../facades/LoginFacade';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ProductDetails } from '../pages/ProductDetails';
import { CartPage } from '../pages/Cart';


type PageObjects = {
  checkoutPage: CheckoutPage;
  itemsPage: ItemsPage;
  loginFacade: LoginFacade;
  loginPage: LoginPage;
  homePage: HomePage;
  productDetailsPage: ProductDetails;
  cartPage: CartPage;
};

export const test = base.extend<PageObjects>({
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  itemsPage: async ({ page }, use) => {
    await use(new ItemsPage(page));
  },

  loginFacade: async ({ page }, use) => {
    await use(new LoginFacade(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetails(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  }
});

export { expect } from '@playwright/test';