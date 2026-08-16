# Quest 3.1: User Story Generator

**Block**: 3 - Planning & Requirements | **Difficulty**: 🟢 Easy | **Time**: 20 minutes

## 🎯 Learning Objectives

- Generate structured user stories from raw notes.
- **Structure requirements** — user stories are testable and actionable.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-3/block-a/quest-23-user-story-generator my-quest
cd my-quest
```

1. Implement `generateUserStory(notes)` to parse notes into structured format.
2. Verify: `node test.js`

## ✅ Verification

`node test.js` checks all required fields are present and non-empty.

## 💡 Hints

- Parse "As a [role]" from the notes
- Extract "I want [feature]" and "so that [benefit]"
- Generate acceptance criteria from requirements mentioned
