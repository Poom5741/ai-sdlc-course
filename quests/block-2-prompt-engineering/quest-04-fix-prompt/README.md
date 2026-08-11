# Quest 2.1: Fix the Vague Prompt

**Block**: 2 - Prompt Engineering | **Difficulty**: 🟢 Easy | **Time**: 15 minutes

## 🎯 Learning Objectives

- Rewrite a vague prompt into a specific, constraint-driven prompt.
- **Specify before you generate** — write the constraints, then ask the AI.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/block-2-prompt-engineering/quest-04-fix-prompt my-quest
cd my-quest
```

1. Read the BAD prompt in `problem.js`: `"Make a function that handles users"`.
2. Rewrite the prompt to specify constraints (input shape, email format, empty/null handling, success/error return shape).
3. Use the AI to generate `createUser(userData)` against your prompt.
4. Verify:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` checks: valid input → success shape with id; empty `{}` → no throw, returns `{success:false,error}`; null → error; invalid email → error.

## 💡 Hints

- Specify: input shape, validation, error path, success shape, id generation.
- Empty input must NOT throw — return an error result.
- Validate email with `user@domain.tld`.