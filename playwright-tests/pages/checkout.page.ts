import { expect, Locator, Page } from "@playwright/test";
import { checkoutFormData } from "../data/checkoutForm.data";

export class CheckoutPage {
  checkoutHeaderTitle: Locator;
  checkoutContainer: Locator;
  firstName: Locator;
  lastName: Locator;
  postalCode: Locator;
  errorMsg: Locator;
  cancelCheckoutBtn: Locator;
  continueCheckoutBtn: Locator;
  firstProduct: Locator;
  secondProduct: Locator;
  thirdProduct: Locator;
  subtotalPrice: Locator;
  taxPrice: Locator;
  totalPrice: Locator;
  finishCheckoutBtn: Locator;
  tickIcon: Locator;
  completeHeader: Locator;
  completeParagraph: Locator;
  backHomeBtn: Locator;

  async checkoutPageStepOne() {
    await expect(this.page).toHaveURL(/checkout-step-one.html/);
    await expect(this.checkoutHeaderTitle).toHaveText("Checkout: Your Information");
    await this.fillCheckoutForm(checkoutFormData.firstName,checkoutFormData.lastName,checkoutFormData.postalCode);
    await this.continueCheckout();
  }

  async checkoutPageStepTwo() {
    await expect(this.page).toHaveURL(/checkout-step-two.html/);
    await expect(this.checkoutHeaderTitle).toHaveText("Checkout: Overview");
    await expect(this.subtotalPrice).toHaveText("Item total: $55.97");
    await expect(this.taxPrice).toHaveText("Tax: $4.48");
    await expect(this.totalPrice).toHaveText("Total: $60.45");
    await this.finishCheckout();
  }

  async finishCheckoutProcess() {
    await expect(this.page).toHaveURL(/checkout-complete.html/);
    await expect(this.checkoutHeaderTitle).toHaveText("Checkout: Complete!");
    await expect(this.tickIcon).toBeVisible();
    await expect(this.completeHeader).toHaveText("Thank you for your order!");
    await expect(this.completeParagraph).toContainText("Your order has been dispatched");
    await expect(this.backHomeBtn).toBeVisible();
    await this.backToHome();
    await expect(this.page).toHaveURL(/inventory.html/);
  }

  async fillCheckoutForm(firstName: string,lastName: string,postalCode: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continueCheckout() {
    await this.continueCheckoutBtn.click();
  }

  async validateProductsInOverviewPage() {
    await expect(this.firstProduct).toContainText("Sauce Labs Backpack");
    await expect(this.secondProduct).toContainText("Sauce Labs Bolt T-Shirt");
    await expect(this.thirdProduct).toContainText("Sauce Labs Bike Light");
  }

  async validatePricesInOverviewPage() {
    await expect(this.subtotalPrice).toHaveText("Item total: $55.97");
    await expect(this.taxPrice).toHaveText("Tax: $4.48");
    await expect(this.totalPrice).toHaveText("Total: $60.45");
  }

  async finishCheckout() {
    await this.finishCheckoutBtn.click();
  }

  async backToHome() {
    await this.backHomeBtn.click();
  }

  constructor(private page: Page) {
    this.checkoutHeaderTitle = page.locator(".title");
    this.checkoutContainer = page.locator(".checkout_info");
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.errorMsg = page.locator('[data-test="error"]');
    this.cancelCheckoutBtn = page.locator('[data-test="cancel"]');
    this.continueCheckoutBtn = page.locator('[data-test="continue"]');
    this.firstProduct = page.locator(".inventory_item_name").nth(0);
    this.secondProduct = page.locator(".inventory_item_name").nth(1);
    this.thirdProduct = page.locator(".inventory_item_name").nth(2);
    this.subtotalPrice = page.locator('[data-test="subtotal-label"]');
    this.taxPrice = page.locator('[data-test="tax-label"]');
    this.totalPrice = page.locator('[data-test="total-label"]');
    this.finishCheckoutBtn = page.locator('[data-test="finish"]');
    this.tickIcon = page.locator(".pony_express");
    this.completeHeader = page.locator(".complete-header");
    this.completeParagraph = page.locator(".complete-text");
    this.backHomeBtn = page.locator('[data-test="back-to-products"]');
  }
}
