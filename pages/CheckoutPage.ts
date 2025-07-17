import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

interface CheckoutAssertions {
    cartItem: Locator;
    paymentInfo: Locator;
    shippingInfo: Locator;
    summaryInfo: Locator;
}

export class CheckoutPage extends BasePage{

    private readonly checkoutButton: Locator;
    private readonly firstNameTextBox: Locator;
    private readonly lastNameTextBox: Locator;
    private readonly zipNumberTextBox: Locator;
    private readonly continueButton: Locator;
    private readonly finishButton: Locator;

    readonly assertionLocators : CheckoutAssertions = {
        cartItem : this.page.locator(".cart_item"),
        paymentInfo: this.page.locator("div[data-test='payment-info-value']"),
        shippingInfo: this.page.locator("div[data-test='shipping-info-value']"),
        summaryInfo: this.page.locator(".summary_subtotal_label")
    }

    constructor(page: Page){
        super(page);
        this.checkoutButton = this.page.getByRole("button", {name: "Checkout"});
        this.firstNameTextBox = this.page.getByRole("textbox", {name: "First Name"});
        this.lastNameTextBox = this.page.getByRole("textbox", {name: "Last Name"});
        this.zipNumberTextBox = this.page.getByRole("textbox", {name: "Zip/Postal Code"});
        this.continueButton = this.page.getByRole("button", {name: "Continue"});
        this.finishButton = this.page.getByRole("button", {name: "Finish"})
    }

    async clickCheckoutButton(): Promise<void> {
        await this.checkoutButton.click();
    }

    async fillFirstName(firstName: string): Promise<void>{
        await this.firstNameTextBox.fill(firstName);
    }

    async fillLastName(lastName: string): Promise<void>{
        await this.lastNameTextBox.fill(lastName);
    }

    async fillZipCode(zipCode: string): Promise<void>{
        await this.zipNumberTextBox.fill(zipCode);
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    async clickFinish(): Promise<void> {
        await this.finishButton.click();
    }

}