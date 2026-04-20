# Checkout – Test Cases 💳

| TC ID | Title                               | Type       | Priority | Preconditions                | Steps                                                                            | Expected Result                                 |
| ----- | ----------------------------------- | ---------- | -------- | ---------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------- |
| TC01  | Successful checkout                 | E2E        | Critical | User logged in, item in cart | 1. Go to cart<br>2. Click "Checkout"<br>3. Fill form<br>4. Continue<br>5. Finish | Order completed, confirmation message displayed |
| TC02  | Checkout with empty first name      | Negative   | High     | User in checkout step one    | 1. Leave first name empty<br>2. Fill other fields<br>3. Click "Continue"         | Error message displayed, cannot proceed         |
| TC03  | Checkout with empty last name       | Negative   | High     | User in checkout step one    | 1. Leave last name empty<br>2. Click "Continue"                                  | Validation error shown                          |
| TC04  | Checkout with empty postal code     | Negative   | High     | User in checkout step one    | 1. Leave postal code empty<br>2. Click "Continue"                                | Validation error shown                          |
| TC05  | Cancel checkout from step one       | Functional | Medium   | User in checkout step one    | 1. Click "Cancel"                                                                | User redirected to cart                         |
| TC06  | Navigate back from overview         | Functional | Medium   | User in checkout overview    | 1. Click "Cancel"                                                                | User redirected to inventory                    |
| TC07  | Verify product in checkout overview | Validation | High     | Product in cart              | 1. Go to checkout overview                                                       | Correct product name, price, quantity displayed |
| TC08  | Verify total price calculation      | Validation | High     | Multiple items in cart       | 1. Proceed to overview                                                           | Total = sum of items + tax                      |
| TC09  | Continue button functionality       | Functional | High     | User filled valid data       | 1. Click "Continue"                                                              | Redirect to checkout overview                   |
| TC10  | Finish button functionality         | Functional | High     | User in overview step        | 1. Click "Finish"                                                                | Order confirmation page displayed               |
| TC11  | Refresh during checkout             | Session    | Medium   | User in checkout step        | 1. Refresh page                                                                  | Checkout state persists or resets safely        |
| TC12  | Browser navigation during checkout  | Session    | Medium   | User in checkout flow        | 1. Use back/forward buttons                                                      | Flow remains consistent without errors          |

---

## Notes

* Include screenshots for key steps (form validation, overview, confirmation)
* Verify consistency between cart and checkout overview
* Test across different browsers (Chrome, Firefox)
* Pay attention to error messages and user guidance
* Use demo site https://www.saucedemo.com/ for reference