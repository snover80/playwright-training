import { test as base } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ItemsPage } from '../pages/ItemsPage';
import { LoginFacade } from '../facades/LoginFacade';


type PageObjects = {
  checkoutPage: CheckoutPage;
  itemsPage: ItemsPage;
  loginFacade: LoginFacade;
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
});

export { expect } from '@playwright/test';