# Quest 23.3: Commit Message Writer

**Block**: 23 - Git Fundamentals | **Difficulty**: 🟡 Medium | **Time**: 20 minutes

## 🎯 Learning Objectives

- Write conventional commit messages (feat:, fix:, chore:).
- **Write meaningful commits** — vague messages without scope make git history useless; naive AI writes "update code" without context.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/module-11/block-23-git-fundamentals/quest-121-commit-message my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool.
3. **Implement `formatConventionalCommit(type, scope, description, body?)`** that returns a properly formatted conventional commit message.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

```bash
node test.js
```

All 10 tests pass when your function correctly:
- Formats type(scope): description.
- Validates type is one of: feat, fix, chore, docs, style, refactor, test, perf, ci, build.
- Rejects past tense descriptions ("added" → "add").
- Enforces max 72 chars and lowercase start.

## 💡 Hints

- Naive AI writes past tense ("added") instead of imperative ("add") — that's the edge case.
- Scope is optional — handle both `feat: ...` and `feat(scope): ...`.
- Description must be lowercase, no period, imperative mood.
