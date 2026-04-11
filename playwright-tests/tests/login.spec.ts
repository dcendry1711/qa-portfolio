import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { userLoginData } from "../data/loginData.data";

test.describe("Login test cases - sauceDemo", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test("Successful login with right credentials", async ({}) => {
    
    const userLogin = userLoginData.userName;
    const userPassword = userLoginData.password;

    await loginPage.login(userLogin, userPassword);
    await expect(loginPage.inventoryContainer).toBeVisible();
  });

  test("Invalid login with wrong credentials (wrong user password)", async ({}) => {
    const userLogin = userLoginData.userName;
    const userPassword = "wrong_password";

    await loginPage.login(userLogin, userPassword);
    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });
});
