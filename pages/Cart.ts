import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { step } from "../fixtures/fixtures";

export class CartPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    getCartItemByNameLocator(itemName: string): Locator {
        return this.page.getByRole('cell', { name: itemName });
    }

    @step('Get product information by name')
    async getProductInformationByName(itemName: string): Promise<ProductInformation> {
        const itemRow = this.page.getByRole('row').filter({hasText: itemName});
        const productPrice = await itemRow.locator(".cart_price").innerText();
        const productQuantity = await itemRow.locator(".cart_quantity").innerText();
        return {
            quantity: productQuantity,
            price: productPrice
        }; 
    }
}

export interface ProductInformation {
        quantity: string;
        price: string;
    }