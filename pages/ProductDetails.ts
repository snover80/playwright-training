import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

interface ProductDetailsAssertions {
    productTitle: Locator;
    productCategory: Locator;
    productPrice: Locator;
    productAvailability: Locator;
    productCondition: Locator;
    productBrand: Locator;
    productQuantity: Locator;
}

export class ProductDetails extends BasePage {
    private readonly quantityInput: Locator;
    private readonly addToCartButton: Locator;
    private readonly writeReviewLink: Locator;
    private readonly reviewNameInput: Locator;
    private readonly reviewEmailInput: Locator;
    private readonly reviewTextArea: Locator;
    private readonly submitReviewButton: Locator;

    constructor(page: Page) {
        super(page);
        // Initialize all locators
        this.quantityInput = this.page.locator('#quantity');
        this.addToCartButton = this.page.getByRole('button', { name: 'Add to cart' });
        this.writeReviewLink = this.page.getByRole('link', { name: 'Write Your Review' });
        this.reviewNameInput = this.page.locator('#name');
        this.reviewEmailInput = this.page.locator('#email');
        this.reviewTextArea = this.page.locator('#review');
        this.submitReviewButton = this.page.getByRole('button', { name: 'Submit' });
    }

    readonly productDetailsAssertions: ProductDetailsAssertions = {
        productTitle: this.page.locator('.product-information h2').first(),
        productCategory: this.page.locator('.product-information p').first(),
        productPrice: this.page.locator('.product-information span span'),
        productAvailability: this.page.locator('.product-information p', { hasText: 'Availability' }),
        productCondition: this.page.locator('.product-information p', { hasText: 'Condition' }),
        productBrand: this.page.locator('.product-information p', { hasText: 'Brand' }),
        productQuantity: this.page.locator('#quantity'),
    };

    /**
     * Sets the quantity of the product
     * @param quantity - The desired quantity
     */
    async setQuantity(quantity: number): Promise<void> {
        await this.quantityInput.clear();
        await this.quantityInput.fill(quantity.toString());
    }

    /**
     * Adds the product to cart
     */
    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    /**
     * Submits a product review
     * @param name - Reviewer's name
     * @param email - Reviewer's email
     * @param review - Review text
     */
    async submitReview(name: string, email: string, review: string): Promise<void> {
        await this.writeReviewLink.click();
        await this.reviewNameInput.fill(name);
        await this.reviewEmailInput.fill(email);
        await this.reviewTextArea.fill(review);
        await this.submitReviewButton.click();
    }

    /**
     * Gets the product information
     * @returns An object containing all product details
     */
    async getProductInfo(): Promise<{
        title: string;
        category: string;
        price: string;
        availability: string;
        condition: string;
        brand: string;
    }> {
        return {
            title: await this.productDetailsAssertions.productTitle.innerText(),
            category: await this.productDetailsAssertions.productCategory.innerText(),
            price: await this.productDetailsAssertions.productPrice.innerText(),
            availability: await this.productDetailsAssertions.productAvailability.innerText(),
            condition: await this.productDetailsAssertions.productCondition.innerText(),
            brand: await this.productDetailsAssertions.productBrand.innerText()
        };
    }
}