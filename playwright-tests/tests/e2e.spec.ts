import { test, expect } from "../fixtures/sauceDemo.fixture";
import { userLoginData } from "../data/loginData.data";
import { checkoutFormData } from "../data/checkoutForm.data";
import { successMessages } from "../constants/messages";

const VALID_USERNAME = userLoginData.userName;
const VALID_PASSWORD = userLoginData.password;

//TC01 - Successfull checkout 
test("TC01 - user can complete purchase", async ({ loginPage, inventoryPage, cartPage, checkoutPage, summaryPage }) => {
  
  const itemsArr: string[] = [
    "Sauce Labs Backpack",
    "Sauce Labs Bolt T-Shirt",
    "Sauce Labs Bike Light",
  ];
  
  const removedItem = "Sauce Labs Backpack";
  
  await loginPage.navigateToLoginPage();
  await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
  await expect(inventoryPage.siteHeader).toBeVisible();

  await inventoryPage.add3ProductsToCart();
  await inventoryPage.moveToCartPage();

  await expect(cartPage.cartList).toBeVisible();
  itemsArr.forEach( item => expect(cartPage.cartList).toContainText(item));
  await cartPage.removeBackpackFromCartOnCartPage();
  await expect(cartPage.cartList).not.toContainText(removedItem);
  await cartPage.moveToCheckout();
  await expect(checkoutPage.checkoutContainer).toBeVisible();

  await checkoutPage.fillCheckoutForm(
    checkoutFormData.firstName,
    checkoutFormData.lastName,
    checkoutFormData.postalCode,
  );
  await checkoutPage.continueCheckout();
  await checkoutPage.finishCheckout();

  await expect(summaryPage.summaryPageHeader).toHaveText(successMessages.ORDER_SUCCESS);
  await summaryPage.closeSummary();
});
