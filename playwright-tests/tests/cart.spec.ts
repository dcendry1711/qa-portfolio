import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { userLoginData } from "../data/loginData.data";
import { InventoryPage } from "../pages/productsList.page";
import { CartPage } from "../pages/cart.page";

test.describe("Cart Functionality", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.fullLoginFlow(userLoginData.userName, userLoginData.password);
    await expect(inventoryPage.siteHeader).toBeVisible();
  });

  test("TC01 - Add product to cart", async ({}) => {

    await inventoryPage.addSingleProductToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.moveToCartPage();
    await expect(cartPage.cartList).toContainText("Sauce Labs Backpack");
  });

  test("TC02 - Add multiple products to cart", async ({}) => {

    const orderedItems = [
      "Sauce Labs Backpack",
      "Sauce Labs Bolt T-Shirt",
      "Sauce Labs Bike Light",
    ];

    await inventoryPage.add3ProductsToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("3");
    await inventoryPage.moveToCartPage();

    orderedItems.forEach(async (item) => {
      await expect(cartPage.cartList).toContainText(item);
    });
  });

  test("TC03 - Remove product from inventory page", async ({}) => {
    await inventoryPage.addSingleProductToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.removeFromCartSauceLabsBackpackBtnOnInventoryPage.click();
    await expect(inventoryPage.shoppingCartBadge).toBeHidden();
  });

  test("TC04 - Remove product from cart page", async ({}) => {
    const orderedItem = "Sauce Labs Backpack";

    await inventoryPage.addSingleProductToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.moveToCartPage();
    await expect(cartPage.cartList).toContainText(orderedItem);
    await cartPage.removeSauceLabsBackpackBtnOnCartPage.click();
    await expect(cartPage.cartList).not.toContainText(orderedItem);
    await expect(inventoryPage.shoppingCartBadge).toBeHidden();
  });

  test("TC05 - navigate to cart page", async ({ page }) => {
    await inventoryPage.moveToCartPage();
    await expect(page).toHaveURL(/cart.html/);
  });

  test("TC06 - Cart badge update", async ({}) => {
    await inventoryPage.addToCartSauceLabsBackpackOnInventoryPage.click();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.addToCartSauceLabsBoltTShirtOnInventoryPage.click();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("2");
    await inventoryPage.addToCartSauceLabsBikeLightOnInventoryPage.click();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("3");
    await inventoryPage.removeFromCartSauceLabsBackpackBtnOnInventoryPage.click();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("2");
    await inventoryPage.removeFromCartSauceLabsBoltTShirtBtnOnInventoryPage.click();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.removeFromCartSauceLabsBikeLightBtnOnInventoryPage.click();
    await expect(inventoryPage.shoppingCartBadge).toBeHidden();
  });

  test("TC07 - Cart persistence after navigation", async ({ page }) => {
    await inventoryPage.add3ProductsToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("3");
    await inventoryPage.moveToCartPage();
    await expect(page).toHaveURL(/cart.html/);
    await page.goBack();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("3");
  })

  test("TC08 - Button state change after adding to cart", async ({}) => {
    await expect(inventoryPage.addToCartSauceLabsBackpackOnInventoryPage).toHaveText("Add to cart");
    await inventoryPage.addToCartSauceLabsBackpackOnInventoryPage.click();
    await expect(inventoryPage.removeFromCartSauceLabsBackpackBtnOnInventoryPage).toHaveText("Remove");
  })

  test("TC09 - Cart icon visibility", async ({}) => {
    await expect(inventoryPage.moveToCart).toBeVisible();
  })

  test("TC10 - continue shopping button", async ({ page }) => {
    await inventoryPage.addSingleProductToCart();
    await inventoryPage.moveToCartPage();
    await expect(page).toHaveURL(/cart.html/);
    await expect(cartPage.continueShoppingBtn).toBeVisible();
    await cartPage.continueShopping();
    await expect(inventoryPage.siteHeader).toBeVisible();
    await expect(page).toHaveURL(/inventory.html/);
  })

  test("TC11 - checkout button", async ({ page }) => {
    await inventoryPage.addSingleProductToCart();
    await inventoryPage.moveToCartPage();
    await expect(page).toHaveURL(/cart.html/);
    await expect(cartPage.checkoutBtn).toBeVisible();
    await cartPage.moveToCheckout();
  })

  test("TC12 - Refresh cart page", async ({ page }) => {
    const orderedItem = "Sauce Labs Backpack";

    await inventoryPage.addSingleProductToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.moveToCartPage();
    await expect(page).toHaveURL(/cart.html/);
    await page.reload();
    await expect(page).toHaveURL(/cart.html/);
    await expect(cartPage.cartList).toContainText(orderedItem);
  })

  test("TC13 - Browser back/forward navigation", async ({ page }) => {
    const orderedItem = "Sauce Labs Backpack";

    await inventoryPage.addSingleProductToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.moveToCartPage();
    await expect(page).toHaveURL(/cart.html/);
    await page.goBack();
    await expect(page).toHaveURL(/inventory.html/);
    await page.goForward();
    await expect(page).toHaveURL(/cart.html/);
    await expect(cartPage.cartList).toContainText(orderedItem);
  })

  test("TC14 - Add, remove, and re-add product", async ({}) => {
    const orderedItem = "Sauce Labs Backpack";

    await inventoryPage.addSingleProductToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.moveToCartPage();
    await expect(cartPage.cartList).toContainText(orderedItem);
    await cartPage.removeBackpackFromCartOnCartPage();
    await expect(cartPage.cartList).not.toContainText(orderedItem);
    await cartPage.continueShopping();
    await inventoryPage.addSingleProductToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.moveToCartPage();
    await expect(cartPage.cartList).toContainText(orderedItem);
  })
});
