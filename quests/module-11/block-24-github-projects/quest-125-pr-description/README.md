# Quest 24.2: PR Description Generator

**Block**: 24 - GitHub Project Management | **Difficulty**: 🟡 Medium | **Time**: 20 minutes

## 🎯 Learning Objectives

- Generate PR descriptions with type, changes, testing steps, breaking changes.
- **Document how to test** — naive AI skips the "how to test" section and reviewers have no way to verify the change works.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/module-11/block-24-github-projects/quest-125-pr-description my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool.
3. **Implement `generatePRDescription(type, title, changes, breaking?)`** that returns a structured PR description.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

```bash
node test.js
```

All 10 tests pass when your function:
- Includes type badge ([Feature], [Fix], [Refactor]).
- Lists all changes in the description.
- Includes "How to Test" section.
- Shows breaking change notice when `breaking` is true.

## 💡 Hints

- Naive AI skips "How to Test" — that's the edge case.
- Use type badges: [Feature], [Fix], [Refactor], [Docs], [Test], [Chore].
- Breaking changes need a ⚠️ notice.
