import { Locator, Page } from "@playwright/test";

export class checkoutPage {
    
    firstName: Locator;
    lastName: Locator
    postalCode: Locator;
    continueBtn: Locator;
    subtotalPrice: Locator;
    taxPrice: Locator;
    totalPrice: Locator;
    finishBtn: Locator

    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
        await this.continueBtn.click();
    }

    async finishCheckout() {
        await this.finishBtn.click();
    }
    
    constructor(private page: Page) {
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueBtn = page.locator('[data-test="continue"]');
        this.subtotalPrice = page.locator('[data-test="subtotal-label"]');
        this.taxPrice = page.locator('[data-test="tax-label"]');
        this.totalPrice = page.locator('[data-test="total-label"]');
        this.finishBtn = page.locator('[data-test="finish"]');
    }
}