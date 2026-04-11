# 🧪 Test Plan – Login Functionality (SauceDemo)

## 1. Objective
The purpose of this testing effort is to verify the correctness and reliability of the login functionality in the SauceDemo application. The testing focuses on:
- Successful user authentication
- Handling invalid credentials
- Input validation
- Basic security scenarios
- Session behavior

---

## 2. Scope

### ✅ In Scope:
- Login form functionality
- Username and password validation
- Error messages
- Navigation after login

### ❌ Out of Scope:
- User registration
- Password reset functionality
- Backend/API testing

---

## 3. Test Environment
- **Application URL:** https://www.saucedemo.com/
- **Browser:** Google Chrome (latest)
- **Operating System:** Windows 10/11

---

## 4. Test Data

| Username             | Password       | Description              |
|---------------------|---------------|--------------------------|
| standard_user       | secret_sauce  | Valid user               |
| locked_out_user     | secret_sauce  | Locked user              |
| problem_user        | secret_sauce  | User with bugs in order process      |
| performance_glitch_user        | secret_sauce  | User with problems during login process      |
| visual_user        | secret_sauce  | User with ui issues     |
| invalid_user        | secret_sauce  | Invalid username         |
| standard_user       | wrong_pass    | Invalid password         |

## 5. Risks
- Missing input validation
- Improper error handling
- Session management issues
- UI inconsistencies

---

## 6. Entry Criteria
- Application is accessible
- Test environment is ready
- Test data is available

---

## 7. Exit Criteria
- All test cases executed
- Critical defects resolved
- Test results documented

---

## 8. Deliverables
- Test documentation
- Test cases
- Bug reports
- Screenshots (if applicable)