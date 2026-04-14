import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { userLoginData } from "../data/loginData.data";
import { ProductsListPage } from "../pages/productsList.page";
import { CartPage } from "../pages/cart.page";

test.describe("Cart Functionality", () => {
  let loginPage: LoginPage;
  let productsListPage: ProductsListPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsListPage = new ProductsListPage(page);
    cartPage = new CartPage(page);
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

  test("TC06 - Cart badge update", async ({}) => {
    await productsListPage.add1ProductToCart();
    await expect(productsListPage.shoppingCartBadge).toHaveText("1");
    await productsListPage.addToCartBoltTShirt.click();
    await expect(productsListPage.shoppingCartBadge).toHaveText("2");
    await productsListPage.addToCartBikeLight.click();
    await expect(productsListPage.shoppingCartBadge).toHaveText("3");
    await productsListPage.removeFromCartBackpackBtn.click();
    await expect(productsListPage.shoppingCartBadge).toHaveText("2");
    await productsListPage.removeFromCartBoltTShirtBtn.click();
    await expect(productsListPage.shoppingCartBadge).toHaveText("1");
    await productsListPage.removeFromCartBikeLightBtn.click();
    await expect(productsListPage.shoppingCartBadge).toBeHidden();
  });

  test("TC07 - Cart persistence after navigation", async ({ page }) => {
    await productsListPage.add3ProductsToCart();
    await productsListPage.moveToCartPage();
    await expect(productsListPage.shoppingCartBadge).toHaveText("3");
    await page.goBack();
    await expect(productsListPage.shoppingCartBadge).toHaveText("3");
  })

  test("TC08 - Button state change after adding to cart", async ({}) => {
    await productsListPage.add1ProductToCart();
    await expect(productsListPage.removeFromCartBackpackBtn).toHaveText("Remove");
  })

  test("TC09 - Cart icon visibility", async ({ page }) => {
    await expect(productsListPage.moveToCart).toBeVisible();
    await productsListPage.moveToCart.click();
    await expect(productsListPage.moveToCart).toBeVisible();
  })

  test("TC10 - continue shopping button", async ({ page }) => {
    await productsListPage.add1ProductToCart();
    await productsListPage.moveToCartPage();
    await cartPage.continueShopping();
  })

  test("TC11 - checkout button", async ({ page }) => {
    await productsListPage.add1ProductToCart();
    await productsListPage.moveToCartPage();
    await cartPage.moveToCheckout();
  })
});
