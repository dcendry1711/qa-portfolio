import { test, expect } from "@playwright/test";
import { userLoginData } from "../data/loginData.data";
import { checkoutFormData } from "../data/checkoutForm.data";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutPage } from "../pages/checkout.page";
import { SummaryPage } from "../pages/summary.page";

test("E2E 01 - complete order process", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkout = new CheckoutPage(page);
  const summaryPage = new SummaryPage(page);
  
  const itemsArr: string[] = [
    "Sauce Labs Backpack",
    "Sauce Labs Bolt T-Shirt",
    "Sauce Labs Bike Light",
  ];
  
  const removedItem = "Sauce Labs Backpack";
  const summaryMsg = "Thank you for your order!";
  
  await loginPage.navigateToLoginPage();
  await loginPage.login(userLoginData.userName, userLoginData.password);
  await expect(inventoryPage.siteHeader).toBeVisible();

  await inventoryPage.add3ProductsToCart();
  await inventoryPage.moveToCartPage();

  await expect(cartPage.cartList).toBeVisible();
  itemsArr.forEach( item => expect(cartPage.cartList).toContainText(item));
  await cartPage.removeBackpackFromCartOnCartPage();
  await expect(cartPage.cartList).not.toContainText(removedItem);
  await cartPage.moveToCheckout();
  await expect(checkout.checkoutContainer).toBeVisible();

  await checkout.fillCheckoutForm(
    checkoutFormData.firstName,
    checkoutFormData.lastName,
    checkoutFormData.postalCode,
  );
  await checkout.continueCheckout();
  await checkout.finishCheckout();

  await expect(summaryPage.summaryPageHeader).toBeVisible();
  await expect(summaryPage.summaryPageHeader).toHaveText(summaryMsg);
  await summaryPage.closeSummary();
});
