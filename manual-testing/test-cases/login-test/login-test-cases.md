# Login – Test Cases 🗝️

| TC ID | Title | Type | Priority | Preconditions | Steps | Expected Result |
|------|------|------|----------|--------------|------|----------------|
| TC01 | Successful login | Functional | High | User is on login page | 1. Enter valid username<br>2. Enter valid password<br>3. Click Login | User is redirected to inventory page |
| TC02 | Login without password | Negative | High | User is on login page | 1. Enter username<br>2. Leave password empty<br>3. Click Login | Error message: "Password is required" |
| TC03 | Login without username | Negative | High | User is on login page | 1. Enter password<br>2. Leave username empty<br>3. Click Login | Error message: "Username is required" |
| TC04 | Login with invalid username | Negative | High | User is on login page | 1. Enter invalid username<br>2. Enter valid password<br>3. Click Login | Error message is displayed |
| TC05 | Login with invalid password | Negative | High | User is on login page | 1. Enter valid username<br>2. Enter invalid password<br>3. Click Login | Error message is displayed |
| TC06 | Login with empty fields | Negative | Medium | User is on login page | 1. Leave both fields empty<br>2. Click Login | Validation error is displayed |
| TC07 | Username with leading/trailing whitespace | Validation | Medium | User is on login page | 1. Enter username with spaces<br>2. Enter password<br>3. Click Login | System handles or rejects input correctly |
| TC08 | Password with leading/trailing whitespace | Validation | Medium | User is on login page | 1. Enter username<br>2. Enter password with spaces<br>3. Click Login | System handles or rejects input correctly |
| TC09 | Login with locked user | Negative | High | User is on login page | 1. Enter locked_out_user<br>2. Enter password<br>3. Click Login | Error message about locked account |
| TC10 | Submit login using Enter key | Functional | Medium | User is on login page | 1. Enter valid credentials<br>2. Press Enter | Login is successful |
| TC11 | Refresh after login | Session | Medium | User is logged in | 1. Refresh page | User remains logged in |

---

## Notes
- Each test case should include screenshots where possible
- Use demo site https://www.saucedemo.com/ for reference