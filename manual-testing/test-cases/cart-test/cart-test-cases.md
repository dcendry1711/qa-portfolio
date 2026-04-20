# Cart – Test Cases 🛒

| TC ID | Title                              | Type       | Priority | Preconditions         | Steps                                          | Expected Result                      |
| ----- | ---------------------------------- | ---------- | -------- | --------------------- | ---------------------------------------------- | ------------------------------------ |
| TC01  | Add product to cart                | Functional | High     | User is logged in     | 1. Click "Add to cart" on a product            | Product is added, cart badge updates |
| TC02  | Add multiple products              | Functional | High     | User is logged in     | 1. Add multiple different products             | All products appear in cart          |
| TC03  | Remove product from inventory page | Functional | High     | Product is in cart    | 1. Click "Remove"                              | Product is removed                   |
| TC04  | Remove product from cart page      | Functional | High     | Product is in cart    | 1. Go to cart<br>2. Click "Remove"             | Product is removed                   |
| TC05  | Navigate to cart                   | Functional | High     | User is logged in     | 1. Click cart icon                             | User is redirected to cart page      |
| TC06  | Cart badge update                  | Validation | High     | User is logged in     | 1. Add/remove products                         | Badge count updates correctly        |
| TC07  | Cart persistence after navigation  | Functional | High     | Product added to cart | 1. Navigate to another page<br>2. Return       | Cart state is preserved              |
| TC08  | Button state change                | UI/UX      | Medium   | Product not in cart   | 1. Click "Add to cart"                         | Button changes to "Remove"           |
| TC09  | Cart icon visibility               | UI/UX      | Low      | User is logged in     | Observe UI                                     | Cart icon visible at all times       |
| TC10  | Continue shopping button           | Functional | Medium   | User is in cart       | 1. Click "Continue Shopping"                   | Redirect to inventory page           |
| TC11  | Checkout button                    | Functional | High     | Product in cart       | 1. Click "Checkout"                            | Redirect to checkout step            |
| TC12  | Refresh cart page                  | Session    | Medium   | Product in cart       | 1. Refresh page                                | Cart state persists                  |
| TC13  | Browser back/forward navigation    | Session    | Medium   | Product in cart       | 1. Use browser navigation                      | Cart state remains correct           |
| TC14  | Add → Remove → Add again           | Edge Case  | Medium   | User is logged in     | 1. Add product<br>2. Remove it<br>3. Add again | Flow works without issues            |

---

## Notes

- Include screenshots for each action
- Check behavior on different browsers
- Use demo site https://www.saucedemo.com/ for reference
