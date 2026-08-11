# Quest 1.2: Multi-file Generation

**Block**: 1 - AI Tools Setup | **Difficulty**: 🟡 Medium | **Time**: 20 minutes

## 🎯 Learning Objectives

- Generate multiple related files with AI.
- **Decompose before generating** — specify the public interface first, then ask the AI to fill each file.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/block-1-ai-tools/quest-02-multi-file my-quest
cd my-quest
```

1. **Specify the interface** (write it as comments in `problem.js`):
   ```js
   // add(a,b), subtract(a,b), multiply(a,b), divide(a,b), calculate(op,a,b)
   ```
2. **Decompose**: plan `math.js`, `validators.js`, `index.js`.
3. **Generate each file** with your AI tool against the interface.
4. **Wire them** with `require()` / `module.exports`.
5. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` checks the public API matches the specified interface, plus edge
cases (divide-by-zero returns `Infinity`; unknown op throws).

## 💡 Hints

- **Specify before generate**: write the interface, then ask AI to fill it — do not ask for "some utils."
- **Modularity**: keep related functions in separate files.
- **Verify before trust**: check `divide(10, 0)` returns `Infinity`, not `NaN`.