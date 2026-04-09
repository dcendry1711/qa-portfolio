import { Page, Locator } from "@playwright/test";

export class CartPage {
  cartList: Locator;
  removeBackpack: Locator;
  checkout: Locator;

  async removeBackpackFromCart() {
    await this.removeBackpack.click();
  }

  async moveToCheckout() {
    await this.checkout.click();
  }

  constructor(private page: Page) {
    this.cartList = page.locator('[data-test="cart-list"]');
    this.removeBackpack = page.locator(
      '[data-test="remove-sauce-labs-backpack"]',
    );
    this.checkout = page.locator('[data-test="checkout"]');
  }
}
