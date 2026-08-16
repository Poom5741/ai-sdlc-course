# Quest 17.2: Dead Code Eliminator

**Block**: 17 - AI Refactoring | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Find and safely remove unused code.
- **Delete with confidence** — dead code is a maintenance burden.

## 💡 Hints

- Exported functions are NOT dead code — they're used by module consumers.
- Check if a variable is only used in its own declaration line.
