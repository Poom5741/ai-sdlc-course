# Quest 1.7: Vibe Coding vs Vibe Engineering Analysis

**Block**: 1 - AI Tools Setup | **Difficulty**: 🟡 Medium | **Time**: 20 minutes

## 🎯 Learning Objectives

- Analyze the difference between vibe coding and vibe engineering.
- **Intentional engineering** — understand that AI-assisted development requires deliberate structure.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-1/block-a/quest-07-vibe-coding-analysis my-quest
cd my-quest
```

1. **Create `vibe-analysis.md`** in this folder.
2. **Write your analysis** covering:
   - Definition of vibe coding (what it is, when it works)
   - Definition of vibe engineering (what it adds)
   - At least 2 concrete examples of when vibe coding fails
   - A decision framework for when to use each approach
   - Risk assessment of vibe coding in production
3. **Verify:**
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` is a **design-doc validator** — it checks that `vibe-analysis.md` exists and contains the required sections with ≥ 400 characters.

## 💡 Hints

- Vibe coding works for prototypes and throwaway code.
- Vibe engineering adds structure: tests, types, reviews, deployment.
- Think about what happens when vibe-coded code goes to production.
