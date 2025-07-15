import { Locator, Page } from "@playwright/test";
import { CheckoutPage } from "./CheckoutPage";
import { BasePage } from "./BasePage";

export class ItemsPage extends BasePage{

    private readonly itemsList: Locator;
    private readonly shoppingCartButton: Locator;
    
    constructor(page: Page){
        super(page);
        this.itemsList = page.locator("#inventory_container .inventory_item");
        this.shoppingCartButton = page.locator(".shopping_cart_link");
       
    }

    async getRandomItem(): Promise<Locator> {
        const itemsContainer = await this.itemsList.all();
        const randomIndex : number = Math.floor(Math.random() * itemsContainer.length);
        const randomItem : Locator = itemsContainer[randomIndex]
        return randomItem
    }

    async getItemDescription(page: Page, item?: Locator): Promise<string> {
        const object = item ?? page     
        const description = await object.locator(".inventory_item_desc").innerText();
       
        return description;
    }
    
    async getItemName(page: Page, item?: Locator): Promise<string> {
        const object = item ?? page
        const description = await object.locator(".inventory_item_name").innerText();
        return description;
    }

    async getItemPrice(page: Page, item?: Locator): Promise<string> {
        const object = item ?? page
        const description = await object.locator(".inventory_item_price").innerText();
        return description;
    }

    async addItemToCart(item: Locator): Promise<void> {
        item.getByText("Add to cart").click();
    }

    async clickShoppingCart(): Promise<CheckoutPage> {
        await this.shoppingCartButton.click();
        return new CheckoutPage(this.page);
    }

    getRemoveLocatorFromItem(item: Locator): Locator {
        return  item.getByText("Remove");
    }
}