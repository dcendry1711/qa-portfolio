import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  cartList: Locator;
  removeSauceLabsBackpackBtnOnCartPage: Locator;
  checkoutBtn: Locator;
  continueShoppingBtn: Locator;

  async removeBackpackFromCartOnCartPage() {
    await this.removeSauceLabsBackpackBtnOnCartPage.click();
  }

  async moveToCheckout() {
    await this.checkoutBtn.click();
    await expect(this.page).toHaveURL(/checkout-step-one.html/);
  }

  async continueShopping() {
    await this.continueShoppingBtn.click();
    await expect(this.page).toHaveURL(/inventory.html/);
  }

  constructor(private page: Page) {
    this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
    this.cartList = page.locator('[data-test="cart-list"]');
    this.removeSauceLabsBackpackBtnOnCartPage = page.locator(
      '[data-test="remove-sauce-labs-backpack"]',
    );
    this.checkoutBtn = page.locator('[data-test="checkout"]');
  }
}
