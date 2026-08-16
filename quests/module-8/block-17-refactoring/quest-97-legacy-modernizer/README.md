# Quest 17.5: Legacy Code Modernizer

**Block**: 17 - AI Refactoring | **Difficulty**: 🔴 Hard | **Time**: 40 minutes

## 🎯 Learning Objectives

- Modernize callback-based code to async/await.
- **Modernize in place** — update patterns without rewriting everything.

## 💡 Hints

- Only wrap async operations (fetch, fs.readFile) in try/catch.
- Synchronous code should NOT be wrapped in try/catch.
- Add `async` keyword to functions that use `await`.
