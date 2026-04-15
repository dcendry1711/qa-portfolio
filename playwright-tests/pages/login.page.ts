import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {

  loginPageHeader: Locator;
  usernameInputField: Locator;
  passwordInputField: Locator;
  loginBtn: Locator;
  errorMsg: Locator;

  async navigateToLoginPage() {
    await this.page.goto("/");
    await expect(this.loginPageHeader).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.usernameInputField.fill(username);
    await this.passwordInputField.fill(password);
    await this.loginBtn.click();
  }

  async loginWithEnterKey(username: string, password: string) {
    await this.usernameInputField.fill(username);
    await this.passwordInputField.fill(password);
    await this.passwordInputField.press("Enter");
  }

  async fullLoginFlow(username: string, password: string) {
    await this.navigateToLoginPage();
    await this.login(username, password);
  }

  constructor(private page: Page) {
    this.loginPageHeader = this.page.locator(".login_logo");
    this.usernameInputField = this.page.locator('[data-test="username"]');
    this.passwordInputField = this.page.locator('[data-test="password"]');
    this.loginBtn = this.page.locator('[data-test="login-button"]');
    this.errorMsg = this.page.locator('[data-test="error"]');
  }
}
