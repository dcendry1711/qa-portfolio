import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { userLoginData } from "../data/loginData.data";

test.describe("E2E Tests - sauceDemo", () => {
  test("successful login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const userLogin = userLoginData.userName;
    const userPassword = userLoginData.password;

    await loginPage.navigate();
    await loginPage.login(userLogin, userPassword);
    await expect(loginPage.inventoryContainer).toBeVisible();
  });
});
