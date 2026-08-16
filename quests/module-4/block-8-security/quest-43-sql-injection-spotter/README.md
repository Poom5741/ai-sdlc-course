# Quest 4.1: SQL Injection Spotter

**Block**: 8 - Security | **Difficulty**: 🟢 Easy | **Time**: 15 minutes

## 🎯 Learning Objectives

- Identify SQL injection vulnerabilities in code snippets.
- **Trust but verify** — AI-generated code may look safe but still be vulnerable to injection. Always check string interpolation in SQL queries.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-4/block-8-security/quest-43-sql-injection-spotter my-quest
cd my-quest
```

1. Read the contract in `problem.js`: implement `findSQLInjection(code)` that scans code and returns vulnerability objects.
2. Prompt the AI for the implementation. Be explicit: only flag strings that clearly form SQL queries.
3. Verify:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` asserts detection of template literal injection (HIGH), string concat injection (HIGH), correct line numbers, and — crucially — that non-SQL string concatenation is NOT flagged. The stub returns `[]` → fails.

## 💡 Hints

- Naive AI often flags ALL string concatenation as injection — but `'Hello ' + name` is not SQL injection.
- Only flag strings that contain SQL keywords (SELECT, INSERT, UPDATE, DELETE, WHERE, FROM).
- Line numbers are 1-indexed.
