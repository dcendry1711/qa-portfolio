import { Page, Locator } from "@playwright/test";

export class ProductsListPage {
  
  productsListHeader: Locator;
  addToCartBackpack: Locator;
  addToCartBoltTShirt: Locator;
  addToCartBikeLight: Locator;
  moveToCart: Locator;
  cartList: Locator;
  itemQuantity: Locator;
  shoppingCartBadge: Locator;
  removeFromCartBackpackBtn: Locator;
  removeFromCartBoltTShirtBtn: Locator;
  removeFromCartBikeLightBtn: Locator;

  async add1ProductToCart() {
    await this.addToCartBackpack.click();
  }

  async add3ProductsToCart() {
    await this.addToCartBackpack.click();
    await this.addToCartBoltTShirt.click();
    await this.addToCartBikeLight.click();
  }

  async removeBackpackFromCart() {
    await this.removeFromCartBackpackBtn.click();
  }

  async removeBoltTShirtFromCart() {
    await this.removeFromCartBoltTShirtBtn.click();
  } 

  async removeBikeLightFromCart() {
    await this.removeFromCartBikeLightBtn.click();
  }

  async moveToCartPage() {
    await this.moveToCart.click();
  }

  constructor(private page: Page) {
    this.productsListHeader = page.locator('[data-test="title"]');
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
    this.cartList = page.locator('[data-test="cart-list"]');
    this.itemQuantity = page.locator('[data-test="item-quantity"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.removeFromCartBackpackBtn = page.locator(
      '[data-test="remove-sauce-labs-backpack"]',
    );
    this.removeFromCartBoltTShirtBtn = page.locator(
      '[data-test="remove-sauce-labs-bolt-t-shirt"]',
    );
    this.removeFromCartBikeLightBtn = page.locator(
      '[data-test="remove-sauce-labs-bike-light"]',
    );

  }
}
