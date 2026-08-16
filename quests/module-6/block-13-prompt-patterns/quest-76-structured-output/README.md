# Quest 6.4: Structured Output Parser

**Block**: 13 - Prompt Patterns | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Parse JSON from LLM responses, including code-fenced output.
- **Structured output is reliable** — wrapping output in a schema ensures downstream code can consume it.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-6/block-13-prompt-patterns/quest-76-structured-output my-quest
cd my-quest
```

Implement `parseStructuredOutput(text, schema)` with code-block extraction, type coercion, and validation.

## ✅ Verification

`node test.js` checks plain JSON, code-fenced JSON, missing fields, type coercion, and invalid input.
