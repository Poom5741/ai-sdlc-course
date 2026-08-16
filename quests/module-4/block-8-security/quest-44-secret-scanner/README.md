# Quest 4.2: Secret Scanner

**Block**: 8 - Security | **Difficulty**: 🟢 Easy | **Time**: 20 minutes

## 🎯 Learning Objectives

- Detect hardcoded credentials, API keys, and tokens in code.
- **Never commit secrets** — hardcoded credentials are the #1 cause of data breaches.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-4/block-8-security/quest-44-secret-scanner my-quest
cd my-quest
```

1. Read the contract in `problem.js`: implement `scanSecrets(code)` that detects hardcoded secrets.
2. Prompt the AI for the implementation.
3. Verify:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` asserts detection of AWS keys, API keys, passwords, private keys, and connection strings — while NOT flagging placeholder values or bare variable names.

## 💡 Hints

- The edge case: `"your-api-key-here"` is a placeholder, not a real secret. Don't flag it.
- Variable names like `apiKey` with no assigned value are not secrets — only the VALUES matter.
