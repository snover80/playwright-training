import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import it from "zod/v4/locales/it.cjs";

interface HomePageAssertions {
    pageBanner: Locator;
}

export class HomePage extends BasePage {

    private readonly featureItems: Locator;
    private readonly continueShoppingButton: Locator;
    private readonly productAddedModal: Locator;

    constructor(page: Page) {
        super(page);
        this.featureItems = this.page.locator(".features_items .col-sm-4");
        this.productAddedModal = this.page.locator('#cartModal .modal-content');
        this.continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });
    }

    readonly homePageAssertionLocators: HomePageAssertions = {
        pageBanner: this.page.getByRole('heading', { name: 'FEATURES ITEMS' })
    };

    async viewProductDetails(itemName: string): Promise<void> {
        const product = await this.featureItems.filter({hasText: itemName});
        await product.getByRole('link', { name: 'View Product' }).click();
    }

    async getRandomProduct(): Promise<Locator> {
        const items = await this.featureItems.all();
        const randomIndex: number = Math.floor(Math.random() * items.length);
        const item : Locator = items[randomIndex];
        return item
    }

    async addRandomProductToCart(): Promise<string> {
        const item = await this.getRandomProduct();
        const productName = await item.locator('.productinfo p').innerText();
        await item.hover();
        
        const addToCartButton = item.locator(".product-overlay .add-to-cart");
        await addToCartButton.waitFor({state: 'visible'});
        await addToCartButton.click();

        await this.continueShoppingButton.click();
        await this.productAddedModal.waitFor({state: 'hidden'});
        
        return productName;
    }

}