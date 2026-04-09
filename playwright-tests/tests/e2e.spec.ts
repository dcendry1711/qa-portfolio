import { test, expect } from "@playwright/test";
import { userLoginData } from "../data/loginData.data";
import { checkoutFormData } from "../data/checkoutForm.data";
import { LoginPage } from "../pages/login.page";
import { ProductsListPage } from "../pages/productsList.page";
import { CartPage } from "../pages/cart.page";
import { checkoutPage } from "../pages/checkout.page";
import { SummaryPage } from "../pages/summary.page";

test("e2e test - sauceDemo", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsListPage = new ProductsListPage(page);
  const cartPage = new CartPage(page);
  const checkout = new checkoutPage(page);
  const summaryPage = new SummaryPage(page);

  await loginPage.navigate();
  await loginPage.login(userLoginData.userName, userLoginData.password);

  await productsListPage.addProductsToCart();
  await productsListPage.moveToCartPage();

  await cartPage.removeBackpackFromCart();
  await cartPage.moveToCheckout();

  await checkout.fillCheckoutForm(
    checkoutFormData.firstName,
    checkoutFormData.lastName,
    checkoutFormData.postalCode,
  );
  await checkout.finishCheckout();

  await summaryPage.closeSummary();
});
