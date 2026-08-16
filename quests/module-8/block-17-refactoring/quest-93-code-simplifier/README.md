# Quest 17.1: Code Simplifier

**Block**: 17 - AI Refactoring | **Difficulty**: 🟢 Easy | **Time**: 20 minutes

## 🎯 Learning Objectives

- Reduce cyclomatic complexity while preserving behavior.
- **Simplify before you ship** — complex code is buggy code.

## 💡 Hints

- Only remove `else` after `return`/`throw`/`continue` — keep it for side effects.
- if/else returning true/false can be simplified to `return condition`.
