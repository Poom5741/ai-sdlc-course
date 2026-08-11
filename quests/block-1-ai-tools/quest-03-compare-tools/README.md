# Quest 1.3: Compare Tools

**Block**: 1 - AI Tools Setup | **Difficulty**: 🟡 Medium | **Time**: 20 minutes

## 🎯 Learning Objectives

- Run the SAME prompt in 2+ AI tools and compare.
- **Calibrate your tools** — know which tool is better for which job, and why.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/block-1-ai-tools/quest-03-compare-tools my-quest
cd my-quest
```

1. Pick ONE prompt, e.g. `"Write a sortByKey(array, key, ascending) function in JavaScript that returns a new sorted array without mutating the input."`
2. Run it in **at least 2** AI tools (Copilot vs Claude Code, ChatGPT vs Gemini, …).
3. Create `comparison.md` in this folder with these sections:
   - **Tool**: which tools you used
   - **Output**: what each produced
   - **Better**: which was better
   - **Why**: your reasoning
4. Verify:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` is a **checklist validator** — it checks that `comparison.md`
exists and has the required sections (Tool, Output, Better, Why) plus ≥200
characters of substance. It does NOT run code.

## 💡 Hints

- Use the same prompt verbatim in both tools — only the tool varies.
- "Better" must be a verdict, not "both are fine." Pick one and justify.
- Capture concrete differences (length, edge-case handling, defensiveness).