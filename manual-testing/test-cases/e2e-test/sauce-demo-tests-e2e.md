# SauceDemo – E2E Full Purchase Flow

## 📌 Overview

This document describes a complete end-to-end (E2E) purchase flow for [https://www.saucedemo.com/](https://www.saucedemo.com/).

The scope focuses on a single, critical business scenario:
➡️ Login → Add product to cart → Checkout → Finish order

---

## 🎯 Test Objective

Validate that a user can successfully complete the entire purchase journey without errors.

---

## 🧪 Test Data

* Username: standard_user
* Password: secret_sauce
* First Name: John
* Last Name: Doe
* Postal Code: 00-001

---

## 🔁 E2E Scenario – Full Purchase Flow

### 🧾 Description

User logs into the application, selects a product, adds it to the cart, completes the checkout process, and finishes the order.

---

## 📋 Test Case (Detailed)

| Field            | Value              |
| ---------------- | ------------------ |
| **Test Case ID** | E2E_01             |
| **Name**         | Full Purchase Flow |
| **Priority**     | High               |
| **Type**         | End-to-End         |

---

## ▶️ Steps & Expected Results

| Step | Action                                                               | Expected Result                          |
| ---- | -------------------------------------------------------------------- | ---------------------------------------- |
| 1    | Navigate to [https://www.saucedemo.com/](https://www.saucedemo.com/) | Login page is displayed                  |
| 2    | Enter username: `standard_user`                                      | Username field accepts input             |
| 3    | Enter password: `secret_sauce`                                       | Password field accepts input             |
| 4    | Click **Login**                                                      | User is redirected to Products page      |
| 5    | Click **Add to cart** on any product                                 | Button changes to "Remove"               |
| 6    | Click cart icon                                                      | Cart page is displayed                   |
| 7    | Verify product in cart                                               | Correct product is visible               |
| 8    | Click **Checkout**                                                   | Checkout Step One page is displayed      |
| 9    | Fill First Name                                                      | Field accepts input                      |
| 10   | Fill Last Name                                                       | Field accepts input                      |
| 11   | Fill Postal Code                                                     | Field accepts input                      |
| 12   | Click **Continue**                                                   | Checkout Step Two page is displayed      |
| 13   | Verify order summary                                                 | Correct product and price visible        |
| 14   | Click **Finish**                                                     | Order completion page is displayed       |
| 15   | Verify confirmation message                                          | "Thank you for your order!" is displayed |

---

## ✅ Acceptance Criteria

* User can log in successfully
* Product can be added to cart
* Cart reflects correct product
* Checkout form accepts valid data
* Order summary is correct
* Order is successfully completed

---

## ⚠️ Edge Cases (Recommended Extensions)

* Empty checkout form → validation errors
* Removing product before checkout
* Multiple products in cart
* Session timeout during checkout
* Back navigation during checkout

---

## 🔧 Automation Notes (Playwright)

* Use stable selectors: `[data-test="..."]`
* Add retries for flaky steps (especially login)
* Wait for navigation after login (`await page.waitForURL()`)
* Capture screenshot on failure

---

## 🚀 Next Step

Automate this flow as a single E2E test:

* One test = one full user journey
* Avoid splitting into smaller tests (true E2E philosophy)

---

## 🧠 Pro Tip

In real projects, this test should be part of a **smoke suite**, executed after every deployment to validate that the core business flow is not broken.
