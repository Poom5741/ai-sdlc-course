# Quest 4.4: Auth System Hardener

**Block**: 8 - Security | **Difficulty**: 🔴 Hard | **Time**: 35 minutes

## 🎯 Learning Objectives

- Implement JWT-like token authentication with password hashing.
- **Defense in depth** — combine password hashing, token signing, expiration, and integrity checks.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-4/block-8-security/quest-46-auth-system my-quest
cd my-quest
```

1. Read the contract in `problem.js`: implement `hashPassword`, `verifyPassword`, `createToken`, `verifyToken`.
2. Prompt the AI for the implementation. Be explicit about expiration checking.
3. Verify:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` checks password strength validation, hash uniqueness, verify correctness, token creation/verification, expiration checking, wrong-secret rejection, and tamper detection.

## 💡 Hints

- The critical edge case: naive AI creates tokens but NEVER checks expiration. `verifyToken` must compare `Date.now()` against the expiry timestamp.
- Use `crypto.pbkdf2Sync` for password hashing (Argon2-like behavior).
- HMAC for token signatures — never store the secret in the token.
