import { Locator, Page } from "@playwright/test";

export class BasePage {
  protected readonly page: Page;
  private readonly titlePage: Locator;

  constructor(page: Page) {
    this.page = page;
     this.titlePage = this.page.locator("span[data-test='title']");
  }

  getTitlePageLocator(): Locator{
    return this.titlePage;
  }

  getLoginUserNameLocator(): Locator {
    return this.page.locator(".navbar-nav a .fa-user");
  }

  async cliclNavbarLink(linkText: string): Promise<void> {
    await this.page.getByRole("link", { name: linkText }).click();
  }
}
