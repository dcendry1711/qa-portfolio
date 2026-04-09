import { Locator, Page } from "@playwright/test";

export class SummaryPage {
  summaryPageHeader: Locator;
  closeSummaryPage: Locator;

  async closeSummary() {
    await this.closeSummaryPage.click();
  }

  constructor(private page: Page) {
    this.summaryPageHeader = page.locator(
      '[data-test="complete-header"]',
    );
    this.closeSummaryPage = page.locator('[data-test="back-to-products"]');
  }
}
