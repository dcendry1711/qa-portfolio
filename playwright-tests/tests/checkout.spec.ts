import { expect, test } from "../fixtures/sauceDemo.fixture";
import { userLoginData } from "../data/loginData.data";
import { checkoutFormData } from "../data/checkoutForm.data";
import { URLS } from "../constants/urls";
import { errorMessages } from "../constants/messages";

const VALID_USERNAME = userLoginData.userName;
const VALID_PASSWORD = userLoginData.password;

test.describe("Checkout Functionality", () => {
  test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
    await loginPage.fullLoginFlow(
      userLoginData.userName,
      userLoginData.password,
    );
    await inventoryPage.fullAddToCartFlow();
    await cartPage.moveToCheckout();
  });
  //CHECKOUT-TC01 - Succesfull checkout process
  test("CHECKOUT-TC01 - Succesfull checkout process", async ({
    checkoutPage,
  }) => {
    await checkoutPage.checkoutPageStepOne();
    await checkoutPage.checkoutPageStepTwo();
    await checkoutPage.finishCheckoutProcess();
  });
  //CHECKOUT-TC02 - checkout form with empty first name field
  test("CHECKOUT-TC02 - checkout form with empty first name field", async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillCheckoutForm(
      "",
      checkoutFormData.lastName,
      checkoutFormData.postalCode,
    );
    await checkoutPage.continueCheckout();
    await expect(checkoutPage.errorMsg).toBeVisible();
    await expect(checkoutPage.errorMsg).toHaveText(
      errorMessages.FIRST_NAME_REQUIRED,
    );
  });
  //CHECKOUT-TC03 - checkout form with empty last name field
  test("CHECKOUT-TC03 - checkout form with empty last name field", async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillCheckoutForm(
      checkoutFormData.firstName,
      "",
      checkoutFormData.postalCode,
    );
    await checkoutPage.continueCheckout();
    await expect(checkoutPage.errorMsg).toHaveText(
      errorMessages.LAST_NAME_REQUIRED,
    );
  });
  //CHECKOUT-TC04 - checkout form with empty postal code field
  test("CHECKOUT-TC04 - checkout form with empty postal code field", async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillCheckoutForm(
      checkoutFormData.firstName,
      checkoutFormData.lastName,
      "",
    );
    await checkoutPage.continueCheckout();
    await expect(checkoutPage.errorMsg).toHaveText(
      errorMessages.POSTAL_CODE_REQUIRED,
    );
  });
  //CHECKOUT-TC05 - cancel checkout form from checkout step one
  test("CHECKOUT-TC05 - cancel checkout form from checkout step one", async ({
    page,
    checkoutPage,
  }) => {
    await checkoutPage.cancelCheckoutBtn.click();
    await expect(page).toHaveURL(URLS.CART_URL);
  });
  //CHECKOUT-TC06 - navigate back from overview page to checkout step one
  test("CHECKOUT-TC06 - navigate back from overview page to checkout step one", async ({
    page,
    checkoutPage,
  }) => {
    await checkoutPage.checkoutPageStepOne();
    await expect(page).toHaveURL(URLS.CHECKOUT_STEP_TWO_URL);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText(
      "Checkout: Overview",
    );
    await page.goBack();
    await expect(page).toHaveURL(URLS.CHECKOUT_STEP_ONE_URL);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText(
      "Checkout: Your Information",
    );
  });
  //CHECKOUT-TC07 - verify products in checkout overview page
  test("CHECKOUT-TC07 - verify products in checkout overview page", async ({
    page,
    checkoutPage,
  }) => {
    await checkoutPage.checkoutPageStepOne();
    await expect(page).toHaveURL(URLS.CHECKOUT_STEP_TWO_URL);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText(
      "Checkout: Overview",
    );
    await checkoutPage.validateProductsInOverviewPage();
  });
  //CHECKOUT-TC08 - verify prices in checkout overview page
  test("CHECKOUT-TC08 - verify prices in checkout overview page", async ({
    page,
    checkoutPage,
  }) => {
    await checkoutPage.checkoutPageStepOne();
    await expect(page).toHaveURL(URLS.CHECKOUT_STEP_TWO_URL);
    await checkoutPage.validatePricesInOverviewPage();
  });
  //CHECKOUT-TC09 - continue button funcionality on checkout step one
  test("CHECKOUT-TC09 - continue button funcionality on checkout step one", async ({
    page,
    checkoutPage,
  }) => {
    await checkoutPage.checkoutPageStepOne();
    await expect(page).toHaveURL(URLS.CHECKOUT_STEP_TWO_URL);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText(
      "Checkout: Overview",
    );
  });
  //CHECKOUT-TC10 - finish button funcionality on checkout overview page
  test("CHECKOUT-TC10 - finish button funcionality on checkout overview page", async ({
    page,
    checkoutPage,
  }) => {
    await checkoutPage.checkoutPageStepOne();
    await checkoutPage.checkoutPageStepTwo();
    await expect(page).toHaveURL(URLS.CHECKOUT_COMPLETE_URL);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText(
      "Checkout: Complete!",
    );
  });
  //CHECKOUT-TC11 - refresh page during checkout process
  test("CHECKOUT-TC11 - refresh during checkout process", async ({
    page,
    checkoutPage,
  }) => {
    await checkoutPage.checkoutPageStepOne();
    await expect(page).toHaveURL(URLS.CHECKOUT_STEP_TWO_URL);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText(
      "Checkout: Overview",
    );
    await expect(checkoutPage.subtotalPrice).toHaveText("Item total: $55.97");
    await page.reload();
    await expect(page).toHaveURL(URLS.CHECKOUT_STEP_TWO_URL);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText(
      "Checkout: Overview",
    );
    await expect(checkoutPage.subtotalPrice).toHaveText("Item total: $55.97");
  });
  //CHECKOUT-TC12 - browser navigation during checkout process
  test("CHECKOUT-TC12 - browser navigation during checkout process", async ({
    page,
    checkoutPage,
  }) => {
    await checkoutPage.checkoutPageStepOne();
    await expect(page).toHaveURL(URLS.CHECKOUT_STEP_TWO_URL);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText(
      "Checkout: Overview",
    );
    await expect(checkoutPage.subtotalPrice).toHaveText("Item total: $55.97");
    await page.goBack();
    await expect(page).toHaveURL(URLS.CHECKOUT_STEP_ONE_URL);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText(
      "Checkout: Your Information",
    );
    await page.goForward();
    await expect(page).toHaveURL(URLS.CHECKOUT_STEP_TWO_URL);
    await expect(checkoutPage.checkoutHeaderTitle).toHaveText(
      "Checkout: Overview",
    );
    await expect(checkoutPage.subtotalPrice).toHaveText("Item total: $55.97");
  });
});
