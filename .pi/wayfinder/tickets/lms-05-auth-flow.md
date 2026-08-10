# Ticket: Authentication Flow Decision

## Question

How should the code validation flow work?

**Options:**

1. **Modal Popup on First Visit**
   - User visits protected page
   - Modal appears asking for code
   - Code validated against KV
   - Session stored in cookie/localStorage
   
2. **Dedicated Login Page**
   - User visits protected page
   - Redirect to `/login`
   - Enter code
   - Redirect back to original page

3. **Inline Form on Page**
   - Protected content shows form at top
   - Enter code inline
   - Content reveals after validation

4. **URL Parameter** (`?code=BBD-XXXX`)
   - User receives link with code
   - Code validated from URL
   - Session stored

**Considerations:**
- Should be seamless for students
- Code should persist across sessions
- Don't want to frustrate users
- Need to handle expired/invalid codes

**Recommendation:** Option 1 (Modal Popup) with localStorage persistence:

```
1. User visits /workshop/block-1
2. Check localStorage for valid code
3. If no code → Show modal
4. User enters code
5. Validate against KV via API
6. If valid → Store in localStorage, show content
7. If invalid → Show error, stay on modal
8. Future visits → Check localStorage first (no API call)
```

Benefits:
- Seamless experience
- Offline-capable after first validation
- No redirect friction

## Resolution

<!-- To be filled when ticket is resolved -->
