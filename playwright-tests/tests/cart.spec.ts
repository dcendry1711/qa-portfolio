import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { userLoginData } from "../data/loginData.data";
import { ProductsListPage } from "../pages/productsList.page";

test.describe("Cart Functionality", () => {
  let loginPage: LoginPage;
  let productsListPage: ProductsListPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsListPage = new ProductsListPage(page);
    await loginPage.navigate();
    await loginPage.login(userLoginData.userName, userLoginData.password);
    await expect(productsListPage.productsListHeader).toBeVisible();
  });

  test("TC01 - Add product to cart", async ({}) => {
    const orderedItem = "Sauce Labs Backpack";

    await productsListPage.add1ProductToCart();
    await productsListPage.moveToCartPage();
    await expect(productsListPage.shoppingCartBadge).toHaveText("1");
    await expect(productsListPage.itemQuantity).toHaveText("1");
    await expect(productsListPage.cartList).toContainText(orderedItem);
  });

  test("TC02 - Add multiple products to cart", async ({}) => {
    const orderedItems = [
      "Sauce Labs Backpack",
      "Sauce Labs Bolt T-Shirt",
      "Sauce Labs Bike Light",
    ];

    await productsListPage.add3ProductsToCart();
    await productsListPage.moveToCartPage();

    await expect(productsListPage.shoppingCartBadge).toHaveText("3");
    orderedItems.forEach(async (item) => {
      await expect(productsListPage.cartList).toContainText(item);
    });
  });

  test("TC03 - Remove product from inventory page", async ({}) => {
    await productsListPage.add1ProductToCart();
    await expect(productsListPage.shoppingCartBadge).toHaveText("1");
    await productsListPage.removeFromCartBackpackBtn.click();
    await expect(productsListPage.shoppingCartBadge).toBeHidden();
  });

  test("TC04 - Remove product from cart page", async ({}) => {
    const orderedItem = "Sauce Labs Backpack";

    await productsListPage.add1ProductToCart();
    await productsListPage.moveToCartPage();
    await expect(productsListPage.shoppingCartBadge).toHaveText("1");
    await productsListPage.removeFromCartBackpackBtn.click();
    await expect(productsListPage.shoppingCartBadge).toBeHidden();
    await expect(productsListPage.cartList).not.toContainText(orderedItem);
  });

  test("TC05 - navigate to cart page", async ({ page }) => {
    await productsListPage.moveToCartPage();
    await expect(page).toHaveURL(/cart.html/);
  });
});
