# Quest 1.6: Hallucination Detector

**Block**: 1 - AI Tools Setup | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Detect when AI output contains fabricated information.
- **Verify before trust** — cross-reference AI claims against known sources.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-1/block-a/quest-06-hallucination-detector my-quest
cd my-quest
```

1. **Open `problem.js`** in editor with AI tool.
2. **Implement `detectHallucinations(text, knownFacts)`** that identifies unsupported or contradictory claims.
3. **Verify:**
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` checks contradiction detection, unsupported claims, opinion filtering, empty inputs.

## 💡 Hints

- Opinions like "I think Python is best" should NOT be flagged — only factual claims.
- A claim "contradicts" if it opposes a known fact; "unsupported" if no fact relates to it.
- Empty text or empty knownFacts are edge cases to handle.
