# Quest 2.2: Multi-Step Prompting

**Block**: 2 - Prompt Engineering | **Difficulty**: 🟡 Medium | **Time**: 20 minutes

## 🎯 Learning Objectives

- Break a task into sequential prompts.
- **Decompose before coding** — core layer first, edge-case layer second.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/block-2-prompt-engineering/quest-05-multi-step my-quest
cd my-quest
```

1. **Step 1 prompt** (core): "Write `isValidUrl(url)` returning true for well-formed http/https URLs with a host, false otherwise." Implement, run `node test.js` — Layer 1 passes.
2. **Step 2 prompt** (edge): "Now handle: empty, whitespace-only, `javascript:` scheme, no-protocol (`example.com` → false), `https://` with no host. Reject all." Implement, run `node test.js` — all pass.
3. Implement `isValidUrl(url)` in `problem.js` from those two prompts.

## ✅ Verification

`node test.js` checks Layer 1 (3 valid + 2 invalid) and Layer 2 (5 edge cases).

## 💡 Hints

- Don't ask one giant prompt for "validate a URL with all edge cases" — that's where AI guesses wrong.
- Prompt the core, get it green, THEN prompt the edge layer.