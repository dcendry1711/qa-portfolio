import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  cartList: Locator;
  removeBackpack: Locator;
  checkout: Locator;
  continueShoppingBtn: Locator;

  async removeBackpackFromCart() {
    await this.removeBackpack.click();
  }

  async moveToCheckout() {
    await this.checkout.click();
    await expect(this.page).toHaveURL(/checkout-step-one.html/);
  }

  async continueShopping() {
    await this.continueShoppingBtn.click();
    await expect(this.page).toHaveURL(/inventory.html/);
  }

  constructor(private page: Page) {
    this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
    this.cartList = page.locator('[data-test="cart-list"]');
    this.removeBackpack = page.locator(
      '[data-test="remove-sauce-labs-backpack"]',
    );
    this.checkout = page.locator('[data-test="checkout"]');
  }
}
