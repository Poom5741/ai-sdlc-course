# Quest 4.3: Input Validator

**Block**: 8 - Security | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Sanitize and validate user input with comprehensive rules.
- **Validate everything** — never trust user input. Check type, format, length, and dangerous content.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-4/block-8-security/quest-45-input-validator my-quest
cd my-quest
```

1. Read the contract in `problem.js`: implement `validateInput(data, rules)`.
2. Prompt the AI for the implementation. Be explicit about format validation (not just typeof).
3. Verify:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` asserts type checks, email format validation, HTML sanitization, min/max length, pattern matching, and required field handling.

## 💡 Hints

- The edge case: `"not-an-email"` is typeof string — naive AI passes it. You need format validation.
- Sanitize BEFORE pattern matching — trimmed input may match differently.
