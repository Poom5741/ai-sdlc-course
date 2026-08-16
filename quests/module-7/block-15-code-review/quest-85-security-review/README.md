# Quest 15.3: Security Review Automator

**Block**: 15 - AI Code Review | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Auto-detect security issues in code.
- **Security by default** — catch vulnerabilities before they reach production.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-7/block-15-code-review/quest-85-security-review my-quest
cd my-quest
```

1. Read `problem.js`: implement `securityReview(code)`.
2. Verify: `node test.js`

## 💡 Hints

- Destructured imports like `const { password } = req.body` are NOT hardcoded secrets.
- Only flag actual string assignments to secret-like variable names.
