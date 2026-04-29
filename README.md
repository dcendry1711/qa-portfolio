# QA Portfolio – Daniel Cendry

## 👨‍💻 About Me

Manual Tester transitioning into Test Automation (Playwright + TypeScript).
Focused on UI and API testing, as well as writing clean, maintainable test code.

---

## 🚀 Why This Project?

This portfolio demonstrates a complete QA approach:

* Designing manual test cases
* Automating UI tests using Playwright
* Testing REST APIs
* Ensuring traceability between test cases and automation

The goal is to show how testing works end-to-end in a real project.

---

## 🛠 Skills

* Manual Testing
* Test Design
* API Testing (REST)
* Playwright (TypeScript)
* Git / GitHub

---

## 🔄 Example Test Flow

Login → Add to cart → Checkout → Order confirmation

This flow is covered across:

* Manual test cases
* UI automation (Playwright)
* Test coverage mapping

---

## 📁 Projects

### 🔍 Manual Testing

Contains test cases, bug reports, checklists, and a test plan.
Demonstrates test design and exploratory testing.

➡️ `./manual-testing`

---

### 🤖 Playwright Tests

Automated UI and API tests built with Playwright:

* Page Object Model (POM)
* Custom fixtures
* API testing
* Traceability with manual test cases

➡️ `./playwright-tests`

---

### 🌐 API Testing

REST API testing project covering:

* CRUD operations
* Contract validation
* Edge cases

➡️ `./api-testing`

---

## ▶️ How to Run Playwright Tests

```bash id="runfinal"
cd playwright-tests
npm install
npx playwright test
```

---

## 📊 Reports

```bash id="reportfinal"
npx playwright show-report
```

---

## 📸 Test Execution Evidence

### 🔹 Playwright HTML Report

![Report 1](./playwright-tests/evidence/report1.png)
![Report 2](./playwright-tests/evidence/report2.png)
![Report 3](./playwright-tests/evidence/report3.png)
![Report 4](./playwright-tests/evidence/report4.png)

---

### ✅ Successful Test (Checkout Flow)

![Success](./playwright-tests/evidence/test-success.png)

---

### ❌ Failed Test Example

![Failure 1](./playwright-tests/evidence/test-failure1.png)
![Failure 2](./playwright-tests/evidence/test-failure2.png)

---

## 🔗 Test Coverage Mapping

| Feature        | Manual Tests | UI Automation | API Tests |
| -------------- | ------------ | ------------- | --------- |
| Login          | ✔            | ✔             | ❌         |
| Products       | ✔            | ❌             | ✔         |
| Cart           | ✔            | ✔             | ❌         |
| Checkout       | ✔            | ✔             | ❌         |
| API Validation | ❌            | ✔             | ✔         |

---

## 🔍 Traceability Matrix

| Test Case ID  | Feature  | Description               | Automated Test File | Status |
| ------------- | -------- | ------------------------- | ------------------- | ------ |
| LOGIN-TC01    | Login    | Successful login          | login.spec.ts       | ✔      |
| LOGIN-TC02    | Login    | Invalid login             | login.spec.ts       | ✔      |
| LOGIN-TC06    | Login    | Empty fields validation   | login.spec.ts       | ✔      |
| CART-TC01     | Cart     | Add product to cart       | cart.spec.ts        | ✔      |
| CART-TC04     | Cart     | Remove product from cart  | cart.spec.ts        | ✔      |
| E2E-TC01 | Checkout | Successful checkout (E2E) | e2e.spec.ts         | ✔      |

---

## 💡 What I Bring

* End-to-end understanding of QA process
* Ability to connect manual testing with automation
* Clean and maintainable test code
* Focus on real-world testing scenarios

---

## 📚 What I Learned

* Designing effective test cases
* Building automation frameworks with Playwright
* API testing and validation
* Creating structured QA projects
