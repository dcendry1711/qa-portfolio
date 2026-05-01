import { test, expect } from "../fixtures/sauceDemo.fixture";
import { userLoginData } from "../data/loginData.data";
import { URLS } from "../constants/urls";

const VALID_USERNAME = userLoginData.userName;
const VALID_PASSWORD = userLoginData.password;

test.describe("Cart Functionality", () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.fullLoginFlow(VALID_USERNAME, VALID_PASSWORD);
    await expect(inventoryPage.siteHeader).toBeVisible();
  });
  //CART-TC01 - Add product to cart
  test("CART-TC01 - Add product to cart", async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addToCartSauceLabsBackpackonInventoryPage();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.moveToCartPage();
    await expect(cartPage.cartList).toContainText("Sauce Labs Backpack");
  });
  //CART-TC02 - Add multiple products to cart
  test("CART-TC02 - Add multiple products to cart", async ({
    inventoryPage,
    cartPage,
  }) => {
    const orderedItems = [
      "Sauce Labs Backpack",
      "Sauce Labs Bolt T-Shirt",
      "Sauce Labs Bike Light",
    ];

    await inventoryPage.add3ProductsToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("3");
    await inventoryPage.moveToCartPage();

    for (const item of orderedItems) {
      await expect(cartPage.cartList).toContainText(item);
    }
  });
  //CART-TC03 - Remove product from inventory page
  test("CART-TC03 - Remove product from inventory page", async ({
    inventoryPage,
  }) => {
    await inventoryPage.addToCartSauceLabsBackpackonInventoryPage();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.removeFromCartSauceLabsBackpackBtnOnInventoryPage.click();
    await expect(inventoryPage.shoppingCartBadge).toBeHidden();
  });
  //CART-TC04 - Remove product from cart page
  test("CART-TC04 - Remove product from cart page", async ({
    inventoryPage,
    cartPage,
  }) => {
    const orderedItem = "Sauce Labs Backpack";

    await inventoryPage.addToCartSauceLabsBackpackonInventoryPage();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.moveToCartPage();
    await expect(cartPage.cartList).toContainText(orderedItem);
    await cartPage.removeSauceLabsBackpackBtnOnCartPage.click();
    await expect(cartPage.cartList).not.toContainText(orderedItem);
    await expect(inventoryPage.shoppingCartBadge).toBeHidden();
  });
  //CART-TC05 - Navigate to cart page
  test("CART-TC05 - navigate to cart page", async ({ page, inventoryPage }) => {
    await inventoryPage.moveToCartPage();
    await expect(page).toHaveURL(URLS.CART_URL);
  });
  //CART-TC06 - Cart badge update
  test("CART-TC06 - Cart badge update", async ({ inventoryPage }) => {
    //add products to cart and check badge count after each addition
    await inventoryPage.addToCartSauceLabsBackpackonInventoryPage();
    await inventoryPage.checkShoppingCartBadgeCount(1);

    await inventoryPage.addToCartSauceLabsBoltTShirtonInventoryPage();
    await inventoryPage.checkShoppingCartBadgeCount(2);

    await inventoryPage.addToCartSauceLabsBikeLightonInventoryPage();
    await inventoryPage.checkShoppingCartBadgeCount(3);

    //remove products from cart and check badge count after each removal
    await inventoryPage.removeBackpackFromCartOnInventoryPage();
    await inventoryPage.checkShoppingCartBadgeCount(2);

    await inventoryPage.removeBoltTShirtFromCartOnInventoryPage();
    await inventoryPage.checkShoppingCartBadgeCount(1);

    await inventoryPage.removeBikeLightFromCartOnInventoryPage();
    await expect(inventoryPage.shoppingCartBadge).toBeHidden();
  });
  //CART-TC07 - Cart persistence after navigation
  test("CART-TC07 - Cart persistence after navigation", async ({
    page,
    inventoryPage,
  }) => {
    await inventoryPage.add3ProductsToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("3");
    await inventoryPage.moveToCartPage();
    await expect(page).toHaveURL(URLS.CART_URL);
    await page.goBack();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("3");
  });
  //CART-TC08 - Button state change after adding to cart
  test("CART-TC08 - Button state change after adding to cart", async ({
    inventoryPage,
  }) => {
    await expect(
      inventoryPage.addToCartSauceLabsBackpackOnInventoryPage,
    ).toHaveText("Add to cart");
    await inventoryPage.addToCartSauceLabsBackpackOnInventoryPage.click();
    await expect(
      inventoryPage.removeFromCartSauceLabsBackpackBtnOnInventoryPage,
    ).toHaveText("Remove");
  });
  //CART-TC09 - Cart icon visibility
  test("CART-TC09 - Cart icon visibility", async ({ inventoryPage }) => {
    await expect(inventoryPage.moveToCart).toBeVisible();
  });
  //CART-TC10 - Continue shopping button
  test("CART-TC10 - continue shopping button", async ({
    page,
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addToCartSauceLabsBackpackonInventoryPage();
    await inventoryPage.moveToCartPage();
    await expect(page).toHaveURL(URLS.CART_URL);
    await expect(cartPage.continueShoppingBtn).toBeVisible();
    await cartPage.continueShopping();
    await expect(inventoryPage.siteHeader).toBeVisible();
    await expect(page).toHaveURL(URLS.INVENTORY_URL);
  });
  //CART-TC11 - Checkout button
  test("CART-TC11 - checkout button", async ({
    page,
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addToCartSauceLabsBackpackonInventoryPage();
    await inventoryPage.moveToCartPage();
    await expect(page).toHaveURL(URLS.CART_URL);
    await expect(cartPage.checkoutBtn).toBeVisible();
    await cartPage.moveToCheckout();
    await expect(page).toHaveURL(URLS.CHECKOUT_STEP_ONE_URL);
  });
  //CART-TC12 - Refresh cart page
  test("CART-TC12 - Refresh cart page", async ({
    page,
    inventoryPage,
    cartPage,
  }) => {
    const orderedItem = "Sauce Labs Backpack";

    await inventoryPage.addToCartSauceLabsBackpackonInventoryPage();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.moveToCartPage();
    await expect(page).toHaveURL(URLS.CART_URL);
    await page.reload();
    await expect(page).toHaveURL(URLS.CART_URL);
    await expect(cartPage.cartList).toContainText(orderedItem);
  });
  //CART-TC13 - Browser back/forward navigation
  test("CART-TC13 - Browser back/forward navigation", async ({
    page,
    inventoryPage,
    cartPage,
  }) => {
    const orderedItem = "Sauce Labs Backpack";

    await inventoryPage.addToCartSauceLabsBackpackonInventoryPage();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.moveToCartPage();
    await expect(page).toHaveURL(URLS.CART_URL);
    await page.goBack();
    await expect(page).toHaveURL(URLS.INVENTORY_URL);
    await page.goForward();
    await expect(page).toHaveURL(URLS.CART_URL);
    await expect(cartPage.cartList).toContainText(orderedItem);
  });
  //CART-TC14 - Add, remove, and re-add product
  test("CART-TC14 - Add, remove, and re-add product", async ({
    inventoryPage,
    cartPage,
  }) => {
    const orderedItem = "Sauce Labs Backpack";

    await inventoryPage.addToCartSauceLabsBackpackonInventoryPage();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.moveToCartPage();
    await expect(cartPage.cartList).toContainText(orderedItem);
    await cartPage.removeBackpackFromCartOnCartPage();
    await expect(cartPage.cartList).not.toContainText(orderedItem);
    await cartPage.continueShopping();
    await inventoryPage.addToCartSauceLabsBackpackonInventoryPage();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.moveToCartPage();
    await expect(cartPage.cartList).toContainText(orderedItem);
  });
});
