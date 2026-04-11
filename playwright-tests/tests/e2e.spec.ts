import { test, expect } from "@playwright/test";
import { userLoginData } from "../data/loginData.data";
import { checkoutFormData } from "../data/checkoutForm.data";
import { LoginPage } from "../pages/login.page";
import { ProductsListPage } from "../pages/productsList.page";
import { CartPage } from "../pages/cart.page";
import { checkoutPage } from "../pages/checkout.page";
import { SummaryPage } from "../pages/summary.page";

test("e2e test - complete order process", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsListPage = new ProductsListPage(page);
  const cartPage = new CartPage(page);
  const removedItem = "Sauce Labs Backpack";
  const checkout = new checkoutPage(page);
  const summaryPage = new SummaryPage(page);
  const summaryMsg = "Thank you for your order!";
  
  const itemsArr: string[] = [
    "Sauce Labs Backpack",
    "Sauce Labs Bolt T-Shirt",
    "Sauce Labs Bike Light",
  ];

  await loginPage.navigate();
  await loginPage.login(userLoginData.userName, userLoginData.password);
  await expect(productsListPage.productsListHeader).toBeVisible();

  await productsListPage.addProductsToCart();
  await productsListPage.moveToCartPage();
  await expect(cartPage.cartList).toBeVisible();

  itemsArr.forEach( item => expect(cartPage.cartList).toContainText(item));
  await cartPage.removeBackpackFromCart();
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
