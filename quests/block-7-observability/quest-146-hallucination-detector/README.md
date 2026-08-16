# Quest: Hallucination Detector

**Block**: 7 - Observability | **Difficulty**: 🔴 Hard | **Time**: 25 minutes

## 🎯 Learning Objectives

- Detect hallucination risk in LLM outputs.
- Quality assurance for AI-generated content.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/block-7-observability/quest-146-hallucination-detector my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool (GitHub Copilot, Claude Code, etc.).
3. **Follow the contract** in `problem.js` — implement detectHallucination.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` asserts that detectHallucination() checks LLM output against source documents for support and returns { riskScore, issues, confidence }.

## 💡 Hints

- Claims not supported by the source documents raise the risk score.
- Confidence should reflect how much of the output is cited.
