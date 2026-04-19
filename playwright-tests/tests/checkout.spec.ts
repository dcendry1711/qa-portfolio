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
    await loginPage.fullLoginFlow(userLoginData.userName,userLoginData.password);
    await inventoryPage.fullAddToCartFlow();
    await cartPage.moveToCheckout();
  });

  test("TC01 - Succesfull checkout process", async ({ page }) => {
    await checkoutPage.checkoutPageStepOne();
    await checkoutPage.checkoutPageStepTwo();
    await checkoutPage.finishCheckoutProcess();
  });

  test("TC02 - checkout form with empty first name field", async ({ page }) => {
    const emptyFirstName = "";
    const errorMsgTxt = "Error: First Name is required";
    
    await checkoutPage.fillCheckoutForm(emptyFirstName,checkoutFormData.lastName,checkoutFormData.postalCode);
    await checkoutPage.continueCheckout();
    await expect(checkoutPage.errorMsg).toBeVisible();
    await expect(checkoutPage.errorMsg).toHaveText(errorMsgTxt);
  })

  test("TC03 - checkout form with empty last name field", async ({ page }) => {
    const emptyLastName = "";
    const errorMsgTxt = "Error: Last Name is required";

    await checkoutPage.fillCheckoutForm(checkoutFormData.firstName,emptyLastName,checkoutFormData.postalCode);
    await checkoutPage.continueCheckout();
    await expect(checkoutPage.errorMsg).toBeVisible();
    await expect(checkoutPage.errorMsg).toHaveText(errorMsgTxt);
  })

  test("TC04 - checkout form with empty postal code field", async ({ page }) => {
    const emptyPostalCode = "";
    const errorMsgTxt = "Error: Postal Code is required";

    await checkoutPage.fillCheckoutForm(checkoutFormData.firstName,checkoutFormData.lastName,emptyPostalCode);
    await checkoutPage.continueCheckout();
    await expect(checkoutPage.errorMsg).toBeVisible();
    await expect(checkoutPage.errorMsg).toHaveText(errorMsgTxt);
  })

  test("TC05 - cancel checkout form from checkout step one", async ({ page }) => {
    await checkoutPage.cancelCheckoutBtn.click();
    await expect(page).toHaveURL(/cart.html/);
  })

  test("TC06 - navigate back from overview page to checkout step one", async ({ page }) => {
    await checkoutPage.checkoutPageStepOne();
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText("Checkout: Overview");
    await page.goBack();
    await expect(page).toHaveURL(/checkout-step-one.html/);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText("Checkout: Your Information");
  })

  test("TC07 - verify products in checkout overview page", async ({ page }) => {
    await checkoutPage.checkoutPageStepOne();
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText("Checkout: Overview");
    await checkoutPage.validateProductsInOverviewPage();
  })

  test("TC08 - verify prices in checkout overview page", async ({ page }) => {
    await checkoutPage.checkoutPageStepOne();
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await checkoutPage.validatePricesInOverviewPage();
  })

  test("TC09 - continue button funcionality on checkout step one", async ({ page }) => {
    await checkoutPage.checkoutPageStepOne();
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText("Checkout: Overview");
  })

  test("TC10 - finish button funcionality on checkout overview page", async ({ page }) => {
    await checkoutPage.checkoutPageStepOne();
    await checkoutPage.checkoutPageStepTwo();
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText("Checkout: Complete!");
  })

  test("TC11 - refresh during checkout process", async ({ page }) => {
    await checkoutPage.checkoutPageStepOne();
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText("Checkout: Overview");
    await expect(checkoutPage.subtotalPrice).toHaveText("Item total: $55.97");
    await page.reload();
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText("Checkout: Overview");
    await expect(checkoutPage.subtotalPrice).toHaveText("Item total: $55.97");
  })

  test("TC12 - browser navigation during checkout process", async ({ page }) => {
    await checkoutPage.checkoutPageStepOne();
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText("Checkout: Overview");
    await expect(checkoutPage.subtotalPrice).toHaveText("Item total: $55.97");
    await page.goBack();
    await expect(page).toHaveURL(/checkout-step-one.html/);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText("Checkout: Your Information");
    await page.goForward();
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText("Checkout: Overview");
    await expect(checkoutPage.subtotalPrice).toHaveText("Item total: $55.97");
  })
});
