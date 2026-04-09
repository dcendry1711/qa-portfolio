import { Page, Locator } from "@playwright/test";

export class ProductsListPage {
  addToCartBackpack: Locator;
  addToCartBoltTShirt: Locator;
  addToCartBikeLight: Locator;
  moveToCart: Locator;

  async addProductsToCart() {
    await this.addToCartBackpack.click();
    await this.addToCartBoltTShirt.click();
    await this.addToCartBikeLight.click();
  }

  async moveToCartPage() {
    await this.moveToCart.click();
  }

  constructor(private page: Page) {
    this.addToCartBackpack = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    );
    this.addToCartBoltTShirt = page.locator(
      '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]',
    );
    this.addToCartBikeLight = page.locator(
      '[data-test="add-to-cart-sauce-labs-bike-light"]',
    );
    this.moveToCart = page.locator('[data-test="shopping-cart-link"]');
  }
}
