import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { userLoginData } from "../data/loginData.data";
import { errorMessages } from "../constants/messages";

const VALID_USERNAME = userLoginData.userName;
const VALID_PASSWORD = userLoginData.password;

test.describe("Login test cases - sauceDemo", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigateToLoginPage();
  });

  test("TC01 - Successful login", async () => {
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await expect(inventoryPage.siteHeader).toContainText("Swag Labs");
  });

  test("TC02 - Login without password", async () => {
    await loginPage.login(VALID_USERNAME, "");

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(errorMessages.PASSWORD_REQUIRED);
  });

  test("TC03 - Login without username", async () => {
    await loginPage.login("", VALID_PASSWORD);

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(errorMessages.USER_REQUIRED);
  });

  test("TC04 - Login with invalid username", async () => {
    const invalidUser = "invalid_user";

    await loginPage.login(invalidUser, VALID_PASSWORD);

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(errorMessages.INVALID_CREDENTIALS);
  });

  test("TC05 - Login with invalid password", async () => {
    const invalidPassword = "wrong_pass";

    await loginPage.login(VALID_USERNAME, invalidPassword);

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(errorMessages.INVALID_CREDENTIALS);
  });

  test("TC06 - Login with empty fields", async () => {
    await loginPage.login("", "");

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(errorMessages.USER_REQUIRED);
  });

  test("TC07 - Username with leading/trailing whitespace", async () => {
    const userLogin = ` ${VALID_USERNAME} `; // Adding leading and trailing whitespace

    await loginPage.login(userLogin, VALID_PASSWORD);

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(errorMessages.INVALID_CREDENTIALS);
  });

  test("TC08 - Password with leading/trailing whitespace", async () => {
    const userPassword = ` ${VALID_PASSWORD} `;

    await loginPage.login(VALID_USERNAME, userPassword);

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(errorMessages.INVALID_CREDENTIALS);
  });

  test("TC09 - Login with locked user", async () => {
    const lockedUser = "locked_out_user";

    await loginPage.login(lockedUser, VALID_PASSWORD);
    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(errorMessages.LOCKED_USER);
  });

  test("TC10 - Submit login with Enter key", async ({ page }) => {
    await loginPage.loginWithEnterKey(VALID_USERNAME, VALID_PASSWORD);
    await expect(page).toHaveURL("/inventory.html");
    await expect(inventoryPage.siteHeader).toBeVisible();
  });

  test("TC11 - Refresh after successful login", async ({ page }) => {
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await page.reload();
    await expect(page).toHaveURL("/inventory.html");
    await expect(inventoryPage.siteHeader).toBeVisible();
  });
});
