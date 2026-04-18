import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
  checkoutHeaderTitle: Locator;
  checkoutContainer: Locator;
  firstName: Locator;
  lastName: Locator;
  postalCode: Locator;
  continueCheckoutBtn: Locator;
  subtotalPrice: Locator;
  taxPrice: Locator;
  totalPrice: Locator;
  finishCheckoutBtn: Locator;
  tickIcon: Locator;
  completeHeader: Locator;
  completeParagraph: Locator;
  backHomeBtn: Locator;

  async fillCheckoutForm(
    firstName: string,
    lastName: string,
    postalCode: string,
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continueCheckout() {
    await this.continueCheckoutBtn.click();
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
    this.continueCheckoutBtn = page.locator('[data-test="continue"]');
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
