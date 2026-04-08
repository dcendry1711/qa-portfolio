# BUG-001 – Login fails with valid credentials ❌

| Attribute   | Value                                                   |
|------------|---------------------------------------------------------|
| Steps      | 1. Open login page <br> 2. Enter valid credentials <br> 3. Click "Login" |
| Expected   | User should be logged in ✅                             |
| Actual     | Error message displayed ❌                               |
| Environment| Chrome 120 / Windows 10                                 |
| Severity   | High 🔴                                                |
| Priority   | High 🔴                                                |
| Status     | Open ⚠️                                               |

**Notes:**  
- Happens intermittently when network is slow  
- Suggest adding logging for failed login attempts  

**Screenshots:**  
`screenshots/bug-001.png`