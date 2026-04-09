import { Locator, Page } from "@playwright/test";

export class SummaryPage {
  summaryPageHeader: Locator;
  closeSummaryPage: Locator;

  async closeSummary() {
    await this.closeSummaryPage.click();
  }

  constructor(private page: Page) {
    this.summaryPageHeader = page.locator(
      '[data-test="checkout-summary-header"]',
    );
    this.closeSummaryPage = page.locator('[data-test="back-to-products"]');
  }
}
