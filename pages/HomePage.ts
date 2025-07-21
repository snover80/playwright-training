import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { step } from "../fixtures/fixtures";

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

    @step('View product details for {itemName}')
    async viewProductDetails(itemName: string): Promise<void> {
        const product = await this.featureItems.filter({hasText: itemName});
        await product.getByRole('link', { name: 'View Product' }).click();
    }

    @step('Get random product from list')
    async getRandomProduct(): Promise<Locator> {
        const items = await this.featureItems.all();
        const randomIndex: number = Math.floor(Math.random() * items.length);
        const item : Locator = items[randomIndex];
        return item
    }

    @step('Add random product to cart')
    async addRandomProductToCart(): Promise<{ name: string; price: string }> {
        const item = await this.getRandomProduct();

        await expect(async () => {
            await item.scrollIntoViewIfNeeded();
            await expect(item).toBeVisible();
            await item.hover();
            const addToCartButton = item.locator(".product-overlay .add-to-cart");
            await expect(addToCartButton).toBeVisible();
            await expect(addToCartButton).toBeEnabled();
            await addToCartButton.click();
        }).toPass();
        
        await expect(this.continueShoppingButton).toBeVisible();
        await this.continueShoppingButton.click();
        await expect(this.productAddedModal).toBeHidden();

        const nameLocator = item.locator(".productinfo p");
        const priceLocator = item.locator(".productinfo h2");

        const name = (await nameLocator.textContent())?.trim() || "";
        const price = (await priceLocator.textContent())?.trim() || "";

        return { name, price };
    }
}