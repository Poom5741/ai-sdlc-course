# Quest 4.5: Prompt Injection Defender

**Block**: 8 - Security | **Difficulty**: 🔴 Hard | **Time**: 30 minutes

## 🎯 Learning Objectives

- Detect and block prompt injection attempts in user input.
- **Sanitize the boundary** — user input reaching an LLM must be scanned for injection patterns.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-4/block-8-security/quest-47-prompt-injection my-quest
cd my-quest
```

1. Read the contract in `problem.js`: implement `detectInjection(userInput)`.
2. Prompt the AI for the implementation. Be explicit about catching subtle injections.
3. Verify:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` checks detection of obvious injections, role overrides, extraction attempts, delimiter breaks, AND subtle patterns (role shifts, base64-encoded instructions, instruction smuggling).

## 💡 Hints

- The edge cases: "For the next task, your role changes to..." and base64-encoded "ignore previous instructions". Naive AI only catches literal "ignore previous".
- Multiple detection types should fire independently — don't stop at the first match.
