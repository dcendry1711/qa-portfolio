import { Locator, Page } from "@playwright/test";

export class LoginPage {
  reload() {
    throw new Error("Method not implemented.");
  }
  usernameInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  errorMsg: Locator;

  async navigate() {
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  constructor(private page: Page) {
    this.usernameInput = this.page.locator('[data-test="username"]');
    this.passwordInput = this.page.locator('[data-test="password"]');
    this.loginButton = this.page.locator('[data-test="login-button"]');
    this.errorMsg = this.page.locator('[data-test="error"]');
  }
}
