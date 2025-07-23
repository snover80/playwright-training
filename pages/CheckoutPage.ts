import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { step } from "../fixtures/fixtures";

export class CheckoutPage extends BasePage {
    readonly placeOrderButton: Locator;
    readonly nameOnCardField: Locator;
    readonly cardNumberField: Locator;
    readonly expiryMonthField: Locator;
    readonly cvcField: Locator;
    readonly expiryYearField: Locator;
    readonly payAndConfirmButton: Locator;

    constructor(page: Page) {
        super(page);
        this.placeOrderButton = this.page.getByRole('link', { name: 'Place Order' });
        this.nameOnCardField = this.page.locator("input[name='name_on_card']");
        this.cardNumberField = this.page.locator("input[name='card_number']");
        this.expiryMonthField = this.page.getByRole('textbox', { name: 'MM' });
        this.cvcField = this.page.locator("input[name='cvc']");
        this.expiryYearField = this.page.getByRole('textbox', { name: 'YYYY' });
        this.payAndConfirmButton = this.page.getByRole('button', { name: 'Pay and Confirm Order' });
    }

    @step("Click Place Order Button")
    async clickPlaceOrderButton(): Promise<void> {
        await expect(this.placeOrderButton).toBeVisible();
        await this.placeOrderButton.click();
    }

    @step("Fill name on card")
    async fillNameOnCard(name: string): Promise<void> {
        await this.nameOnCardField.fill(name);
    }

    @step("Fill card number")
    async fillCardNumber(cardNumber: string): Promise<void> {
        await this.cardNumberField.fill(cardNumber);
    }

    @step("Fill expiry month")
    async fillExpiryMonth(month: string): Promise<void> {
        await this.expiryMonthField.fill(month);
    }

    @step("Fill CVC")
    async fillCVC(cvc: string): Promise<void> {
        await this.cvcField.fill(cvc);
    }

    @step("Fill expiry year")
    async fillExpiryYear(year: string): Promise<void> {
        await this.expiryYearField.fill(year);
    }

    @step("Click Pay and Confirm Button")
    async clickPayAndConfirmButton(): Promise<void> {
        await expect(this.payAndConfirmButton).toBeVisible();
        await this.payAndConfirmButton.click();
    }
}