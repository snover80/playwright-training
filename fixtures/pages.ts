import { test as base, Page } from '@playwright/test';
import { CheckoutPageSauce } from '../pages/CheckoutPageSauce';
import { ItemsPage } from '../pages/ItemsPage';
import { LoginFacade } from '../facades/LoginFacade';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ProductDetails } from '../pages/ProductDetails';
import { CartPage } from '../pages/Cart';
import { ReviewOrderPage } from '../pages/ReviewOrderPage';
import { OrdersFacade } from '../facades/OrdersFacade';


type PageObjects = {
  checkoutPageSauce: CheckoutPageSauce;
  itemsPage: ItemsPage;
  loginFacade: LoginFacade;
  loginPage: LoginPage;
  homePage: HomePage;
  productDetailsPage: ProductDetails;
  cartPage: CartPage;
  ordersFacade: OrdersFacade;
  reviewOrderPage: ReviewOrderPage;
};

export const test = base.extend<PageObjects>({
  checkoutPageSauce: async ({ page }, use) => {
    await use(new CheckoutPageSauce(page));
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
  },

  ordersFacade: async ({ page }, use) => {
    await use(new OrdersFacade(page));
  },
  
  reviewOrderPage: async ({ page }, use) => {
    await use(new ReviewOrderPage(page));
  }
});

export { expect } from '@playwright/test';