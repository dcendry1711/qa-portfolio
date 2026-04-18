import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { userLoginData } from "../data/loginData.data";

test.describe("Login test cases - sauceDemo", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let userLogin: string = userLoginData.userName;
  let userPassword: string = userLoginData.password;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigateToLoginPage();
  });

  test("TC01 - Successful login", async ({page}) => {
    await loginPage.login(userLogin, userPassword);
    await expect(inventoryPage.siteHeader).toContainText("Swag Labs");
  });

  test("TC02 - Login without password", async ({}) => {

    const passwordRequiredMsg = "Epic sadface: Password is required";

    await loginPage.login(userLogin, "");

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(passwordRequiredMsg);
  });

  test("TC03 - Login without username", async ({}) => {
    const usernameRequiredMsg = "Epic sadface: Username is required";

    await loginPage.login("", userPassword);

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(usernameRequiredMsg);
  });

  test("TC04 - Login with invalid username", async ({}) => {
    userLogin = "invalid_user";
    const invalidUserMsg =
      "Epic sadface: Username and password do not match any user in this service";

    await loginPage.login(userLogin, userPassword);

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(invalidUserMsg);
  });

  test("TC05 - Login with invalid password", async ({}) => {
    userPassword = "wrong_pass";
    const invalidPasswordMsg = "Epic sadface: Username and password do not match any user in this service";

    await loginPage.login(userLogin, userPassword);

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(invalidPasswordMsg);
  });

  test("TC06 - Login with empty fields", async ({}) => {
    const errorMsg = "Epic sadface: Username is required";

    await loginPage.login("", "");

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(errorMsg);
  });

  test("TC07 - Username with leading/trailing whitespace", async ({}) => {
    userLogin = ` ${userLogin} `; // Adding leading and trailing whitespace
    const invalidUserMsg =
      "Epic sadface: Username and password do not match any user in this service";

    await loginPage.login(userLogin, userPassword);

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(invalidUserMsg);
  });

  test("TC08 - Password with leading/trailing whitespace", async ({}) => {
    userPassword = ` ${userPassword} `;
    const invalidPasswordMsg = "Epic sadface: Username and password do not match any user in this service";

    await loginPage.login(userLogin, userPassword);

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(invalidPasswordMsg);
  });

  test("TC09 - Login with locked user", async ({}) => {
    userLogin = "locked_out_user";
    const lockedUserMsg = "Epic sadface: Sorry, this user has been locked out.";

    await loginPage.login(userLogin, userPassword);
    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(lockedUserMsg);
  });

  test("TC10 - Submit login with Enter key", async ({ page }) => {
    await loginPage.loginWithEnterKey(userLogin, userPassword);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(inventoryPage.siteHeader).toBeVisible();
  });

  test("TC11 - Refresh after successful login", async ({ page }) => {
    await loginPage.login(userLogin, userPassword);
    await page.reload();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(inventoryPage.siteHeader).toBeVisible();
  });
});
