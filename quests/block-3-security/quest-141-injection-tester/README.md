# Quest: Injection Tester

**Block**: 3 - Security | **Difficulty**: 🔴 Hard | **Time**: 25 minutes

## 🎯 Learning Objectives

- Detect prompt injection attempts in user input.
- Understand the most common LLM security vulnerability.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/block-3-security/quest-141-injection-tester my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool (GitHub Copilot, Claude Code, etc.).
3. **Follow the contract** in `problem.js` — implement detectInjection.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` asserts that detectInjection() flags prompt injection patterns (e.g. 'ignore previous instructions') while not false-flagging benign input.

## 💡 Hints

- Attack phrases override system instructions — look for them.
- Benign user commands that don't attempt to hijack the prompt should not be flagged.
