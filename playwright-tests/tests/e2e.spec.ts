import { test, expect } from "@playwright/test";

test.describe("E2E Tests - sauceDemo", () => {
  test("successful login", async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="inventory-container"]').click();
  });
});
