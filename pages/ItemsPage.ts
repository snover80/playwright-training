import { Locator, Page } from "@playwright/test";
import { CheckoutPageSauce } from "./CheckoutPageSauce";
import { BasePage } from "./BasePage";
import { step } from "../fixtures/fixtures";

export class ItemsPage extends BasePage{

    private readonly itemsList: Locator;
    private readonly shoppingCartButton: Locator;
    
    constructor(page: Page){
        super(page);
        this.itemsList = page.locator("#inventory_container .inventory_item");
        this.shoppingCartButton = page.locator(".shopping_cart_link");
       
    }

    @step("Get random item from items list")
    async getRandomItem(): Promise<Locator> {
        const itemsContainer = await this.itemsList.all();
        const randomIndex : number = Math.floor(Math.random() * itemsContainer.length);
        const randomItem : Locator = itemsContainer[randomIndex]
        return randomItem
    }

    @step("Get item description")
    async getItemDescription(page: Page, item?: Locator): Promise<string> {
        const object = item ?? page     
        const description = await object.locator(".inventory_item_desc").innerText();
       
        return description;
    }
    
    @step("Get item name")
    async getItemName(page: Page, item?: Locator): Promise<string> {
        const object = item ?? page
        const description = await object.locator(".inventory_item_name").innerText();
        return description;
    }

    @step("Get item price")
    async getItemPrice(page: Page, item?: Locator): Promise<string> {
        const object = item ?? page
        const description = await object.locator(".inventory_item_price").innerText();
        return description;
    }

    @step("Add item to cart")
    async addItemToCart(item: Locator): Promise<void> {
        item.getByText("Add to cart").click();
    }

    @step("Click shopping cart")
    async clickShoppingCart(): Promise<CheckoutPageSauce> {
        await this.shoppingCartButton.click();
        return new CheckoutPageSauce(this.page);
    }

    getRemoveLocatorFromItem(item: Locator): Locator {
        return  item.getByText("Remove");
    }
}