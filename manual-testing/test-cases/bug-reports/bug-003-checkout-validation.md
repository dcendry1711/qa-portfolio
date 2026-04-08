# BUG-003 – No validation on checkout form ❌

| Attribute   | Value                                                |
|------------|------------------------------------------------------|
| Steps      | 1. Go to checkout <br> 2. Submit empty form         |
| Expected   | Validation errors displayed ✅                        |
| Actual     | Form is submitted ❌                                  |
| Severity   | Critical 🔴                                        |
| Priority   | High 🔴                                             |
| Status     | Open ⚠️                                              |

**Notes:**  
- Validation missing for required fields  
- Could lead to invalid orders

**Screenshots:**  
`screenshots/bug-003.png`