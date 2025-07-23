import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ReviewOrderPage extends BasePage {

    readonly orderConfirmationMessage: Locator;
    readonly orderHeading: Locator;

    constructor(page: Page) {
        super(page);
        this.orderHeading = this.page.getByRole('heading', { name: 'ORDER PLACED' });
        this.orderConfirmationMessage = this.page.getByText('Congratulations! Your order has been confirmed!');
    }
}