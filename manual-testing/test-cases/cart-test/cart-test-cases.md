# Cart – Test Cases 🛒

| TC ID | Title | Type | Priority | Preconditions | Steps | Expected Result |
|------|------|------|----------|--------------|------|----------------|
| TC01 | Add product to cart | Functional | High | User is logged in | 1. Click "Add to cart" on a product | Product is added, cart badge updates |
| TC02 | Add multiple products | Functional | High | User is logged in | 1. Add multiple different products | All products appear in cart |
| TC03 | Remove product from inventory page | Functional | High | Product is in cart | 1. Click "Remove" | Product is removed |
| TC04 | Remove product from cart page | Functional | High | Product is in cart | 1. Go to cart<br>2. Click "Remove" | Product is removed |
| TC05 | Navigate to cart | Functional | High | User is logged in | 1. Click cart icon | User is redirected to cart page |
| TC06 | Remove non-existing product | Negative | Low | Cart is empty | 1. Attempt remove action | No error occurs |
| TC07 | Empty cart view | Negative | Medium | Cart is empty | 1. Open cart | Empty cart message/UI displayed |
| TC08 | Cart badge update | Validation | High | User is logged in | 1. Add/remove products | Badge count updates correctly |
| TC09 | Cart persistence after navigation | Functional | High | Product added to cart | 1. Navigate to another page<br>2. Return | Cart state is preserved |
| TC10 | Button state change | UI/UX | Medium | Product not in cart | 1. Click "Add to cart" | Button changes to "Remove" |
| TC11 | Cart icon visibility | UI/UX | Low | User is logged in | Observe UI | Cart icon visible at all times |
| TC12 | Continue shopping button | Functional | Medium | User is in cart | 1. Click "Continue Shopping" | Redirect to inventory page |
| TC13 | Checkout button | Functional | High | Product in cart | 1. Click "Checkout" | Redirect to checkout step |
| TC14 | Access cart without login | Security | High | User not logged in | 1. Open /cart.html | Redirect to login page |
| TC15 | Rapid clicking "Add to cart" | Edge Case | Medium | User is logged in | 1. Click button rapidly | No duplicates or errors |
| TC16 | Refresh cart page | Session | Medium | Product in cart | 1. Refresh page | Cart state persists |
| TC17 | Browser back/forward navigation | Session | Medium | Product in cart | 1. Use browser navigation | Cart state remains correct |
| TC18 | Full user flow (E2E) | Functional | High | User not logged in | 1. Login<br>2. Add product<br>3. Open cart | Product visible in cart |
| TC19 | Add → Remove → Add again | Edge Case | Medium | User is logged in | 1. Add product<br>2. Remove it<br>3. Add again | Flow works without issues |

---

## Notes
- Include screenshots for each action
- Check behavior on different browsers