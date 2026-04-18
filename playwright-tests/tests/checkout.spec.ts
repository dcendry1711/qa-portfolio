import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutPage } from "../pages/checkout.page";
import { userLoginData } from "../data/loginData.data";
import { checkoutFormData } from "../data/checkoutForm.data";

test.describe("Checkout Functionality", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.fullLoginFlow(
      userLoginData.userName,
      userLoginData.password,
    );
    await inventoryPage.fullAddToCartFlow();
    await expect(page).toHaveURL(/cart.html/);
    await cartPage.moveToCheckout();
  });

  test.only("TC01 - Succesfull checkout process", async ({ page }) => {
    await expect(page).toHaveURL(/checkout-step-one.html/);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText(
      "Checkout: Your Information",
    );
    await checkoutPage.fillCheckoutForm(
      checkoutFormData.firstName,
      checkoutFormData.lastName,
      checkoutFormData.postalCode,
    );
    await checkoutPage.continueCheckout();
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText(
      "Checkout: Overview",
    );
    await expect(checkoutPage.subtotalPrice).toHaveText("Item total: $55.97");
    await expect(checkoutPage.taxPrice).toHaveText("Tax: $4.48");
    await expect(checkoutPage.totalPrice).toHaveText("Total: $60.45");
    await checkoutPage.finishCheckout();
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText(
      "Checkout: Complete!",
    );
    await expect(checkoutPage.tickIcon).toBeVisible();
    await expect(checkoutPage.completeHeader).toHaveText(
      "Thank you for your order!",
    );
    await expect(checkoutPage.completeParagraph).toContainText(
      "Your order has been dispatched",
    );
    await expect(checkoutPage.backHomeBtn).toBeVisible();
    await checkoutPage.backToHome();
    await expect(page).toHaveURL(/inventory.html/);
  });
});
