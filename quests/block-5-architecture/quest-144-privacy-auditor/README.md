# Quest: Privacy Auditor

**Block**: 5 - Architecture | **Difficulty**: 🔴 Hard | **Time**: 25 minutes

## 🎯 Learning Objectives

- Detect personally identifiable information (PII) in data strings.
- Apply privacy-by-design principles to AI systems.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/block-5-architecture/quest-144-privacy-auditor my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool (GitHub Copilot, Claude Code, etc.).
3. **Follow the contract** in `problem.js` — implement detectPII.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` asserts that detectPII() identifies emails, phone numbers, and other PII while not flagging benign strings.

## 💡 Hints

- Realistic PII formats (emails, phone numbers) should be caught.
- Strings that merely look like variable names are not PII.
