import { Locator, Page } from "@playwright/test";

export class LoginPage {
    
  usernameInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  inventoryContainer: Locator;

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
    this.inventoryContainer = this.page.locator(
      '[data-test="inventory-container"]',
    );
  }
}
