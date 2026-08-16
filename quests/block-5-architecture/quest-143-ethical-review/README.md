# Quest: Ethical Review

**Block**: 5 - Architecture | **Difficulty**: 🟡 Medium | **Time**: 20 minutes

## 🎯 Learning Objectives

- Audit AI-generated code for ethical concerns.
- Build responsible AI development habits.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/block-5-architecture/quest-143-ethical-review my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool (GitHub Copilot, Claude Code, etc.).
3. **Follow the contract** in `problem.js` — implement auditCode.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` asserts that auditCode() flags bias indicators, privacy concerns, and transparency issues, returning { issues, score, recommendations }.

## 💡 Hints

- Hardcoded demographic assumptions are a bias indicator.
- Code that collects personal data without consent is a privacy concern.
