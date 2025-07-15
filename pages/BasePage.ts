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
}
