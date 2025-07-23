import { expect, test } from "../../fixtures/fixtures";

const productName = "Printed Off Shoulder Top - White";

test('Add items to cart from product view', async ({ ordersFacade, reviewOrderPage }) => {
    await ordersFacade.addProductToCart(productName, 2);
    await ordersFacade.completeCheckout(
        "John Doe",
        "4111111111111111",
        "12",
        "123",
        "2025");

    await expect(reviewOrderPage.orderHeading).toBeVisible();
    await expect(reviewOrderPage.orderConfirmationMessage).toBeVisible();
});