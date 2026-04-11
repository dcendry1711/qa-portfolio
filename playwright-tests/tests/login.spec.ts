import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ProductsListPage } from "../pages/productsList.page";
import { userLoginData } from "../data/loginData.data";

test.describe("Login test cases - sauceDemo", () => {
  let loginPage: LoginPage;
  let productsListPage: ProductsListPage;
  let userLogin: string = userLoginData.userName;
  let userPassword: string = userLoginData.password;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsListPage = new ProductsListPage(page);
    await loginPage.navigate();
  });

  test("TC01 - Successful login", async ({page}) => {
    await loginPage.login(userLogin, userPassword);
    await expect(productsListPage.productsListHeader).toContainText("Products");
  });

  test("TC02 - Login without password", async ({}) => {
    const errorTxt = "Epic sadface: Password is required";

    await loginPage.login(userLogin, "");

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(errorTxt);
  });

  test("TC03 - Login without username", async ({}) => {
    const errorTxt = "Epic sadface: Username is required";

    await loginPage.login("", userPassword);

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(errorTxt);
  });

  test("TC04 - Login with invalid username", async ({}) => {
    userLogin = "invalid_user";
    const errorTxt =
      "Epic sadface: Username and password do not match any user in this service";

    await loginPage.login(userLogin, userPassword);

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(errorTxt);
  });

  test("TC05 - Login with invalid password", async ({}) => {
    userPassword = "wrong_pass";
    const errorTxt =
      "Epic sadface: Username and password do not match any user in this service";

    await loginPage.login(userLogin, userPassword);

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(errorTxt);
  });

  test("TC06 - Login with empty fields", async ({}) => {
    const errorTxt = "Epic sadface: Username is required";

    await loginPage.login("", "");

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(errorTxt);
  });

  test("TC07 - Username with leading/trailing whitespace", async ({}) => {
    userLogin = ` ${userLogin} `; // Adding leading and trailing whitespace
    const errorTxt =
      "Epic sadface: Username and password do not match any user in this service";

    await loginPage.login(userLogin, userPassword);

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(errorTxt);
  });

  test("TC08 - Password with leading/trailing whitespace", async ({}) => {
    userPassword = ` ${userPassword} `;
    const errorTxt =
      "Epic sadface: Username and password do not match any user in this service";

    await loginPage.login(userLogin, userPassword);

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(errorTxt);
  });

  test("TC09 - Login with locked user", async ({}) => {
    userLogin = "locked_out_user";
    const lockedUserError = "Epic sadface: Sorry, this user has been locked out.";

    await loginPage.login(userLogin, userPassword);
    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(lockedUserError);
  });

  test("TC10 - Submit login with Enter key", async ({ page }) => {
    await loginPage.usernameInput.fill(userLogin);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.passwordInput.press("Enter");
    await expect(page).toHaveURL(/inventory/);
    await expect(productsListPage.productsListHeader).toBeVisible();
  });

  test("TC11 - Refresh after successful login", async ({ page }) => {
    await loginPage.login(userLogin, userPassword);
    await expect(page).toHaveURL(/inventory/);
    await page.reload();
    await expect(productsListPage.productsListHeader).toBeVisible();
  });
});
