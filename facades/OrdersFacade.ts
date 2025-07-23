import { expect, Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductDetails } from "../pages/ProductDetails";
import { CartPage } from "../pages/Cart";
import { step } from "../fixtures/fixtures";
import { CheckoutPage } from "../pages/CheckoutPage";

export class OrdersFacade {

    private readonly page: Page;
    private readonly homePage: HomePage;
    private readonly productDetailsPage: ProductDetails;
    private readonly cartPage: CartPage;
    private readonly checkoutPage: CheckoutPage;

    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.productDetailsPage = new ProductDetails(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
    }

    @step("Add product to cart from details page")
    async addProductToCart(productName: string, quantity: number): Promise<void> {
        await this.homePage.cliclNavbarLink("Products");
        await this.homePage.searchForProduct(productName);
        await this.homePage.viewProductDetails(productName);
        await expect(this.productDetailsPage.productDetailsAssertions.productTitle).toBeVisible();
        await this.productDetailsPage.setQuantity(quantity);
        await this.productDetailsPage.addToCart();
        await this.productDetailsPage.clickContinueShoppingButton();
        const productInfo = await this.productDetailsPage.getProductInfo();
        await this.homePage.cliclNavbarLink("Cart");
        const cartInfoProduct = await this.cartPage.getProductInformationByName(productInfo.title);
        expect(cartInfoProduct.price).toBe(productInfo.price);
        expect(cartInfoProduct.quantity).toBe(quantity.toString());
    }

    @step("Complete checkout with payment details")
    async completeCheckout(nameOnCard: string, cardNumber: string, expiryMonth: string, cvc: string, expiryYear: string): Promise<void> {
        await this.cartPage.clickProceedToCheckoutButton();
        await this.checkoutPage.clickPlaceOrderButton();
        await this.checkoutPage.fillNameOnCard(nameOnCard);
        await this.checkoutPage.fillCardNumber(cardNumber);
        await this.checkoutPage.fillExpiryMonth(expiryMonth);
        await this.checkoutPage.fillCVC(cvc);
        await this.checkoutPage.fillExpiryYear(expiryYear);
        await this.checkoutPage.clickPayAndConfirmButton();
    }
}