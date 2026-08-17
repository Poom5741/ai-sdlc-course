# Quest 1.1: First AI Code Completion

**Block**: 1 - AI Tools Setup | **Difficulty**: 🟢 Easy | **Time**: 15 minutes

## 🎯 Learning Objectives

- Use an AI coding tool for the first time to generate a function from a comment.
- **Verify AI output before trusting it** — naive output passes glossy cases and fails edge cases.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/block-1-ai-tools/quest-01-first-completion my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool (GitHub Copilot, Claude Code, etc.).
3. **Write a comment** describing what you want:
   ```js
   // Calculate factorial of n using recursion
   ```
4. **Let the AI suggest**, then accept and run:
   ```bash
   node test.js
   ```
5. **Read the failing test.** Look at the negative-input edge case. Do NOT just
   accept the first green run — fix the edge case.
6. **Stuck?** Peek at `_solution/solution.js` — but try first.

## ✅ Verification

```bash
node test.js
```

All 7 tests pass when your `factorial(n)` handles:
- Positive and zero inputs (recursion).
- **Negative inputs** (must throw — factorial is undefined for negatives).

## 🧠 Why this quest

The naive AI suggestion `if (n <= 1) return 1` silently returns `1` for
`factorial(-1)`. The lesson is not "factorial is hard" — it is **verify before
trust**: AI output that looks correct can be wrong on the edge case you didn't
ask about.