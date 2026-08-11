# Quest 3.2: Fix and Harden

**Block**: 3 - Security | **Difficulty**: 🟡 Medium | **Time**: 20 minutes

## 🎯 Learning Objectives

- Ask AI to fix + harden vulnerable code.
- **Fix the class, not the instance** — patch the vulnerability pattern, not just one example.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/block-3-security/quest-08-fix-harden my-quest
cd my-quest
```

1. Recall the SQL injection from Quest 3.1.
2. Write a prompt that fixes the *class*: parameterized query + input validation on the boundary.
3. Generate `safeQuery(id)` (returns `{ query, params }` with `?` placeholder) and `validateUserId(s)` (rejects non-numeric / empty / null / negative / injection payloads).
4. Verify:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` checks: `safeQuery("1 OR 1=1")` returns a parameterized shape (query has `?`, payload only in `params`, never in query text); `validateUserId` accepts valid numerics and rejects empty/null/non-numeric/negative/injection.

## 💡 Hints

- Don't just escape the one bad string — fix the pattern: placeholder + params.
- Validation happens at the boundary (before the query), not inside it.