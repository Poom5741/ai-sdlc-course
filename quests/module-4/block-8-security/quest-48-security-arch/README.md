# Quest 4.6: Security Architecture Design

**Block**: 8 - Security | **Difficulty**: 🔴 Hard | **Time**: 30 minutes

## 🎯 Learning Objectives

- Design a security architecture for an AI application.
- **Security by design** — plan security controls before writing code. Threat modeling catches design flaws that code review misses.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-4/block-8-security/quest-48-security-arch my-quest
cd my-quest
```

1. Design a security architecture for an AI customer support chatbot in `security-arch.md`.
2. Cover: threat model (4+ threats), auth, input validation, output guardrails, audit logging, incident response.
3. Verify:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` is a **design-doc validator** — it checks that `security-arch.md` exists and contains the required sections with sufficient detail.

## 💡 Hints

- Use STRIDE or a similar threat modeling framework for systematic coverage.
- Output guardrails are unique to AI apps: what must the AI refuse to do?
- An incident response plan without a "who gets paged" step is incomplete.
