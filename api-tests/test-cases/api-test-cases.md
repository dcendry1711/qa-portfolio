# Products API – Test Cases 📦

## 📌 Overview

Test coverage for Products endpoints in Fake Store API.
Focus: correctness, validation, error handling, and edge cases.

---

## 🧪 Test Cases

| TC ID | Endpoint       | Method | Description                     | Type       | Priority | Expected Result            |
| ----- | -------------- | ------ | ------------------------------- | ---------- | -------- | -------------------------- |
| TC01  | /products      | GET    | Get all products                | Functional | High     | 200 OK + array of products |
| TC02  | /products/1    | GET    | Get single product              | Functional | High     | 200 OK + product object    |
| TC03  | /products      | POST   | Create new product (valid data) | Functional | High     | 200 OK + created product   |
| TC04  | /products/1    | DELETE | Delete product                  | Functional | Medium   | 200 OK or success response |
| TC05  | /products/9999 | GET    | Get non-existing product        | Negative   | High     | 404 or error response      |

---

## 🔍 Validation Tests

| TC ID | Endpoint    | Method | Description                 | Type       | Priority | Expected Result                       |
| ----- | ----------- | ------ | --------------------------- | ---------- | -------- | ------------------------------------- |
| TC06  | /products   | GET    | Validate response structure | Validation | High     | Each object has id, title, price      |
| TC07  | /products/1 | GET    | Validate data types         | Validation | High     | id:number, title:string, price:number |
| TC08  | /products   | GET    | Validate non-empty response | Validation | Medium   | Array length > 0                      |

---

## ❌ Negative Tests

| TC ID | Endpoint      | Method | Description             | Type     | Priority | Expected Result       |
| ----- | ------------- | ------ | ----------------------- | -------- | -------- | --------------------- |
| TC09  | /products/abc | GET    | Invalid ID format       | Negative | High     | 400 or error response |
| TC10  | /products     | POST   | Missing required fields | Negative | High     | Error response        |
| TC11  | /products     | POST   | Invalid data types      | Negative | High     | Validation error      |
| TC12  | /products     | POST   | Empty request body      | Negative | High     | Error response        |

---

## ⚠️ Edge Cases

| TC ID | Endpoint  | Method | Description                | Type      | Priority | Expected Result                      |
| ----- | --------- | ------ | -------------------------- | --------- | -------- | ------------------------------------ |
| TC13  | /products | GET    | Large response handling    | Edge Case | Medium   | Response handled without crash       |
| TC14  | /products | POST   | Very long product title    | Edge Case | Medium   | Accepted or properly validated       |
| TC15  | /products | POST   | Extremely high price value | Edge Case | Medium   | Correct handling or validation error |
| TC16  | /products | GET    | Multiple rapid requests    | Edge Case | Medium   | No failures / stable responses       |

---

## 🔐 Security / Robustness

| TC ID | Endpoint  | Method | Description                    | Type     | Priority | Expected Result               |
| ----- | --------- | ------ | ------------------------------ | -------- | -------- | ----------------------------- |
| TC17  | /products | POST   | SQL Injection attempt          | Security | Medium   | Request rejected or sanitized |
| TC18  | /products | POST   | Script injection (XSS payload) | Security | Medium   | Input sanitized               |

---

## 🧠 Notes

* Validate both **status codes and response body**
* Focus on **data correctness, not only response success**
* Compare responses across multiple calls (consistency)
* Pay attention to error handling behavior
* Use these test cases as base for **Playwright API automation**

---

## 🔗 Next Step

Map test cases to automation:

* TC01–TC05 → basic API tests
* TC06–TC08 → schema validation
* TC09–TC12 → negative tests
* TC13–TC18 → advanced / edge tests
