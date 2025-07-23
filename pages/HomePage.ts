import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { step } from "../fixtures/fixtures";

interface HomePageAssertions {
    pageBanner: Locator;
    itemsOnPage: Locator;
}

export class HomePage extends BasePage {

    private readonly featureItems: Locator;
    private readonly searchInput: Locator;

    constructor(page: Page) {
        super(page);
        this.featureItems = this.page.locator(".features_items .col-sm-4");
        this.searchInput = this.page.getByRole('textbox', { name: 'Search Product' });
    }

    readonly homePageAssertionLocators: HomePageAssertions = {
        pageBanner: this.page.getByRole('heading', { name: 'FEATURES ITEMS' }),
        itemsOnPage: this.page.locator(".single-products"),

    };

    @step('View product details')
    async viewProductDetails(itemName: string): Promise<void> {
        const product = this.featureItems.filter({hasText: itemName});
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
        
        await this.clickContinueShoppingButton();

        const nameLocator = item.locator(".productinfo p");
        const priceLocator = item.locator(".productinfo h2");

        const name = (await nameLocator.textContent())?.trim() || "";
        const price = (await priceLocator.textContent())?.trim() || "";

        return { name, price };
    }

    @step('Search for product')
    async searchForProduct(productName: string): Promise<void> {
        await expect(this.searchInput).toBeVisible();
        await this.searchInput.fill(productName);
        await this.page.locator("#submit_search").click();
        await expect(this.homePageAssertionLocators.itemsOnPage).toBeVisible();
        await expect(this.homePageAssertionLocators.itemsOnPage).toHaveCount(1);
    }

    @step("Get product nae")
    async getProductName():  Promise<string> {
        const productNameLocator = this.page.locator(".productinfo p");
        await expect(productNameLocator).toBeVisible();
        const productName = await productNameLocator.textContent();
        return productName || "";
    }   
}