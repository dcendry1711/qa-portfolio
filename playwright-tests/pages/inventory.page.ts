import { Page, Locator, expect } from "@playwright/test";

export class InventoryPage {
  
  siteHeader: Locator;
  addToCartSauceLabsBackpackOnInventoryPage: Locator;
  addToCartSauceLabsBoltTShirtOnInventoryPage: Locator;
  addToCartSauceLabsBikeLightOnInventoryPage: Locator;
  removeFromCartSauceLabsBackpackBtnOnInventoryPage: Locator;
  removeFromCartSauceLabsBoltTShirtBtnOnInventoryPage: Locator;
  removeFromCartSauceLabsBikeLightBtnOnInventoryPage: Locator;
  moveToCart: Locator;
  shoppingCartBadge: Locator;

  async fullAddToCartFlow() {
    await this.addToCartSauceLabsBackpackOnInventoryPage.click();
    await this.addToCartSauceLabsBoltTShirtOnInventoryPage.click();
    await this.addToCartSauceLabsBikeLightOnInventoryPage.click();
    await this.moveToCart.click();
    await expect(this.page).toHaveURL("/cart.html");
  }

  async addSingleProductToCart() {
    await this.addToCartSauceLabsBackpackOnInventoryPage.click();
  }

  async add3ProductsToCart() {
    await this.addToCartSauceLabsBackpackOnInventoryPage.click();
    await this.addToCartSauceLabsBoltTShirtOnInventoryPage.click();
    await this.addToCartSauceLabsBikeLightOnInventoryPage.click();
  }

  async removeBackpackFromCartOnInventoryPage() {
    await this.removeFromCartSauceLabsBackpackBtnOnInventoryPage.click();
  }

  async removeBoltTShirtFromCartOnInventoryPage() {
    await this.removeFromCartSauceLabsBoltTShirtBtnOnInventoryPage.click();
  } 

  async removeBikeLightFromCartOnInventoryPage() {
    await this.removeFromCartSauceLabsBikeLightBtnOnInventoryPage.click();
  }

  async moveToCartPage() {
    await this.moveToCart.click();
  }

  constructor(private page: Page) {
    this.siteHeader = page.locator(".app_logo");
    this.addToCartSauceLabsBackpackOnInventoryPage = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    );
    this.addToCartSauceLabsBoltTShirtOnInventoryPage = page.locator(
      '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]',
    );
    this.addToCartSauceLabsBikeLightOnInventoryPage = page.locator(
      '[data-test="add-to-cart-sauce-labs-bike-light"]',
    );
    this.moveToCart = page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.removeFromCartSauceLabsBackpackBtnOnInventoryPage = page.locator(
      '[data-test="remove-sauce-labs-backpack"]',
    );
    this.removeFromCartSauceLabsBoltTShirtBtnOnInventoryPage = page.locator(
      '[data-test="remove-sauce-labs-bolt-t-shirt"]',
    );
    this.removeFromCartSauceLabsBikeLightBtnOnInventoryPage = page.locator(
      '[data-test="remove-sauce-labs-bike-light"]',
    );

  }
}
