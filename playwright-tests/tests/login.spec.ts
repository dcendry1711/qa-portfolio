import { test, expect } from "../fixtures/login.fixture";
import { userLoginData } from "../data/loginData.data";
import { errorMessages } from "../constants/messages";
import { URLS } from "../constants/urls";

const VALID_USERNAME = userLoginData.userName;
const VALID_PASSWORD = userLoginData.password;

test.describe("Login test cases - sauceDemo", () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
  });

  test("TC01 - Successful login", async ({ loginPage, inventoryPage }) => {
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await expect(inventoryPage.siteHeader).toContainText("Swag Labs");
  });

  test("TC02 - Login without password", async ({ loginPage }) => {
    await loginPage.login(VALID_USERNAME, "");
    await expect(loginPage.errorMsg).toHaveText(errorMessages.PASSWORD_REQUIRED);
  });

  test("TC03 - Login without username", async ({ loginPage }) => {
    await loginPage.login("", VALID_PASSWORD);
    await expect(loginPage.errorMsg).toHaveText(errorMessages.USER_REQUIRED);
  });

  test("TC04 - Login with invalid username", async ({ loginPage }) => {
    const invalidUser = "invalid_user";

    await loginPage.login(invalidUser, VALID_PASSWORD);
    await expect(loginPage.errorMsg).toHaveText(errorMessages.INVALID_CREDENTIALS);
  });

  test("TC05 - Login with invalid password", async ({ loginPage }) => {
    const invalidPassword = "wrong_pass";

    await loginPage.login(VALID_USERNAME, invalidPassword);
    await expect(loginPage.errorMsg).toHaveText(errorMessages.INVALID_CREDENTIALS);
  });

  test("TC06 - Login with empty fields", async ({ loginPage }) => {
    await loginPage.login("", "");
    await expect(loginPage.errorMsg).toHaveText(errorMessages.USER_REQUIRED);
  });

  test("TC07 - Username with leading/trailing whitespace", async ({ loginPage }) => {
    const userLogin = ` ${VALID_USERNAME} `; // Adding leading and trailing whitespace

    await loginPage.login(userLogin, VALID_PASSWORD);
    await expect(loginPage.errorMsg).toHaveText(errorMessages.INVALID_CREDENTIALS);
  });

  test("TC08 - Password with leading/trailing whitespace", async ({ loginPage }) => {
    const userPassword = ` ${VALID_PASSWORD} `;

    await loginPage.login(VALID_USERNAME, userPassword);
    await expect(loginPage.errorMsg).toHaveText(errorMessages.INVALID_CREDENTIALS);
  });

  test("TC09 - Login with locked user", async ({ loginPage }) => {
    const lockedUser = "locked_out_user";

    await loginPage.login(lockedUser, VALID_PASSWORD);
    await expect(loginPage.errorMsg).toHaveText(errorMessages.LOCKED_USER);
  });

  test("TC10 - Submit login with Enter key", async ({ page, loginPage, inventoryPage }) => {
    await loginPage.loginWithEnterKey(VALID_USERNAME, VALID_PASSWORD);
    await expect(page).toHaveURL(URLS.INVENTORY_URL);
    await expect(inventoryPage.siteHeader).toBeVisible();
  });

  test("TC11 - Refresh after successful login", async ({ page, loginPage, inventoryPage }) => {
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await page.reload();
    await expect(page).toHaveURL(URLS.INVENTORY_URL);
    await expect(inventoryPage.siteHeader).toBeVisible();
  });
});
