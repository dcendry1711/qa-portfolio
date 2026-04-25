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

  test("TC01 - Add product to cart", async ({ inventoryPage, cartPage }) => {

    await inventoryPage.addSingleProductToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.moveToCartPage();
    await expect(cartPage.cartList).toContainText("Sauce Labs Backpack");
  });

  test("TC02 - Add multiple products to cart", async ({ inventoryPage, cartPage }) => {

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

  test("TC03 - Remove product from inventory page", async ({ inventoryPage }) => {
    await inventoryPage.addSingleProductToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.removeFromCartSauceLabsBackpackBtnOnInventoryPage.click();
    await expect(inventoryPage.shoppingCartBadge).toBeHidden();
  });

  test("TC04 - Remove product from cart page", async ({ inventoryPage, cartPage }) => {
    const orderedItem = "Sauce Labs Backpack";

    await inventoryPage.addSingleProductToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.moveToCartPage();
    await expect(cartPage.cartList).toContainText(orderedItem);
    await cartPage.removeSauceLabsBackpackBtnOnCartPage.click();
    await expect(cartPage.cartList).not.toContainText(orderedItem);
    await expect(inventoryPage.shoppingCartBadge).toBeHidden();
  });

  test("TC05 - navigate to cart page", async ({ page, inventoryPage }) => {
    await inventoryPage.moveToCartPage();
    await expect(page).toHaveURL(URLS.CART_URL);
  });

  test("TC06 - Cart badge update", async ({ inventoryPage }) => {
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

  test("TC07 - Cart persistence after navigation", async ({ page, inventoryPage }) => {
    await inventoryPage.add3ProductsToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("3");
    await inventoryPage.moveToCartPage();
    await expect(page).toHaveURL(URLS.CART_URL);
    await page.goBack();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("3");
  })

  test("TC08 - Button state change after adding to cart", async ({ inventoryPage }) => {
    await expect(inventoryPage.addToCartSauceLabsBackpackOnInventoryPage).toHaveText("Add to cart");
    await inventoryPage.addToCartSauceLabsBackpackOnInventoryPage.click();
    await expect(inventoryPage.removeFromCartSauceLabsBackpackBtnOnInventoryPage).toHaveText("Remove");
  })

  test("TC09 - Cart icon visibility", async ({ inventoryPage }) => {
    await expect(inventoryPage.moveToCart).toBeVisible();
  })

  test("TC10 - continue shopping button", async ({ page, inventoryPage, cartPage }) => {
    await inventoryPage.addSingleProductToCart();
    await inventoryPage.moveToCartPage();
    await expect(page).toHaveURL(URLS.CART_URL);
    await expect(cartPage.continueShoppingBtn).toBeVisible();
    await cartPage.continueShopping();
    await expect(inventoryPage.siteHeader).toBeVisible();
    await expect(page).toHaveURL(URLS.INVENTORY_URL);
  })

  test("TC11 - checkout button", async ({ page, inventoryPage, cartPage }) => {
    await inventoryPage.addSingleProductToCart();
    await inventoryPage.moveToCartPage();
    await expect(page).toHaveURL(URLS.CART_URL);
    await expect(cartPage.checkoutBtn).toBeVisible();
    await cartPage.moveToCheckout();
  })

  test("TC12 - Refresh cart page", async ({ page, inventoryPage, cartPage }) => {
    const orderedItem = "Sauce Labs Backpack";

    await inventoryPage.addSingleProductToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.moveToCartPage();
    await expect(page).toHaveURL(URLS.CART_URL);
    await page.reload();
    await expect(page).toHaveURL(URLS.CART_URL);
    await expect(cartPage.cartList).toContainText(orderedItem);
  })

  test("TC13 - Browser back/forward navigation", async ({ page, inventoryPage, cartPage }) => {
    const orderedItem = "Sauce Labs Backpack";

    await inventoryPage.addSingleProductToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.moveToCartPage();
    await expect(page).toHaveURL(URLS.CART_URL);
    await page.goBack();
    await expect(page).toHaveURL(URLS.INVENTORY_URL);
    await page.goForward();
    await expect(page).toHaveURL(URLS.CART_URL);
    await expect(cartPage.cartList).toContainText(orderedItem);
  })

  test("TC14 - Add, remove, and re-add product", async ({ inventoryPage, cartPage }) => {
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
