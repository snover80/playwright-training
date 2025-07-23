import { expect, Locator, Page } from "@playwright/test";
import { step } from "../fixtures/fixtures";

export class BasePage {
  protected readonly page: Page;
  private readonly titlePage: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly productAddedModal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titlePage = this.page.locator("span[data-test='title']");
    this.productAddedModal = this.page.locator('#cartModal .modal-content');
    this.continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });
  }
  
  getTitlePageLocator(): Locator{
    return this.titlePage;
  }

  getLoginUserNameLocator(): Locator {
    return this.page.locator(".navbar-nav a .fa-user");
  }

  @step("Click Nav Bar Link")
  async cliclNavbarLink(linkText: string): Promise<void> {
    await this.page.getByRole("link", { name: linkText }).click();
  }

  @step("Click continue shopping")
  async clickContinueShoppingButton(): Promise<void> {
    await expect(this.continueShoppingButton).toBeVisible();
    await this.continueShoppingButton.click();
    await expect(this.productAddedModal).toBeHidden();
  }
}
