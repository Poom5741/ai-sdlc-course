# Quest 4.13: Compliance Checklist Automator

**Block**: 9 - Governance & Compliance | **Difficulty**: 🔴 Hard | **Time**: 30 minutes

## 🎯 Learning Objectives

- Automate compliance checking against a checklist.
- **Automate the boring** — compliance checks are repetitive; automate them and review results.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-4/block-9-governance/quest-55-compliance-checker my-quest
cd my-quest
```

Implement `checkCompliance(codebase, checklist)` that evaluates all files against regex-based rules.

## ✅ Verification

`node test.js` checks counting, structure, regex matching, evidence, and the edge case: checking ALL files (not just the first match).
