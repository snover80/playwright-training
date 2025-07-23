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

const pageRegistry = {
  checkoutPageSauce: CheckoutPageSauce,
  itemsPage: ItemsPage,
  loginPage: LoginPage,
  loginFacade: LoginFacade,
  homePage: HomePage,
  productDetailsPage: ProductDetails,
  cartPage: CartPage,
  reviewOrderPage: ReviewOrderPage,
  ordersFacade: OrdersFacade,
} as const;

type PageFixtures = {
  [K in keyof typeof pageRegistry]: InstanceType<(typeof pageRegistry)[K]>
};

export const test = base.extend<PageFixtures>(
  Object.fromEntries(
    Object.entries(pageRegistry).map(([key, Cls]) => [
      key,
      async ({ page }: { page: Page }, use: (fixture: any) => Promise<void>) => await use(new Cls(page)),
    ])
  )
);


export { expect } from '@playwright/test';