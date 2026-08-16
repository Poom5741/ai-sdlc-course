# Quest: Guardrail Builder

**Block**: 3 - Security | **Difficulty**: 🔴 Hard | **Time**: 25 minutes

## 🎯 Learning Objectives

- Design input/output guardrails for LLM applications.
- Apply defense-in-depth security architecture.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/block-3-security/quest-142-guardrail-builder my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool (GitHub Copilot, Claude Code, etc.).
3. **Follow the contract** in `problem.js` — implement ChatGuardrail.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` asserts that the ChatGuardrail class blocks known injection patterns in inputs, filters sensitive data (emails, phone numbers, API keys) from outputs, rate-limits per user, and logs suspicious activity.

## 💡 Hints

- Rate limiting should be per user, not global.
- Sensitive-data filtering must catch realistic formats of emails and phone numbers.
