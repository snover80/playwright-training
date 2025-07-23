import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { step } from "../fixtures/fixtures";

export class CartPage extends BasePage {

    private readonly proceedToCheckoutButton: Locator;
    

    constructor(page: Page) {
        super(page);
        this.proceedToCheckoutButton = this.page.getByText('Proceed To Checkout');
    }

    getCartRowItemByNameLocator(itemName: string): Locator {
        return this.page.getByRole('row').filter({hasText: itemName});
    }

    @step('Get product information by product name')
    async getProductInformationByName(itemName: string): Promise<ProductInformation> {
        const itemRow = this.getCartRowItemByNameLocator(itemName);
        await expect(itemRow).toBeVisible();
        const productPrice = await itemRow.locator(".cart_price").innerText();
        const productQuantity = await itemRow.locator(".cart_quantity").innerText();
        return {
            quantity: productQuantity,
            price: productPrice
        }; 
    }

    @step('Remove item from cart by name')
    async removeItemFromCart(itemName: string): Promise<void> {
        const itemRow = this.getCartRowItemByNameLocator(itemName);
        await itemRow.locator(".cart_quantity_delete").click();
    }

    @step("Click Proceed To Checkout Button")
    async clickProceedToCheckoutButton(): Promise<void> {
        await expect(this.proceedToCheckoutButton).toBeVisible();
        await this.proceedToCheckoutButton.click();
    }
}

export interface ProductInformation {
        quantity: string;
        price: string;
    }