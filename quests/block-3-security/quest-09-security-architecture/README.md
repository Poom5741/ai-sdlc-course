# Quest 3.3: Security Architecture

**Block**: 3 - Security | **Difficulty**: 🔴 Hard | **Time**: 25 minutes

## 🎯 Learning Objectives

- Use AI to design security controls.
- **Threat-model before building** — threats first, then a control per threat, then each control's failure mode.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/block-3-security/quest-09-security-architecture my-quest
cd my-quest
```

1. Pick the system: an API auth flow (API key + rate limiting), per the spec.
2. Create `design.md` in this folder with these sections:
   - **System**: the API auth flow you're securing
   - **Threats**: at least 3 threats
   - **Controls**: a control per threat (incl. API key + rate limiting)
   - **Failure Modes**: what happens when each control fails
3. Verify:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` is a **design-doc validator** — it checks `design.md` has the required sections (Threats, Controls incl. API key + rate limiting, Failure Modes), mentions the API/auth system, and is ≥400 characters. It does NOT run code.

## 💡 Hints

- Start with threats — a control with no threat is decoration.
- Every control must have a failure mode and a fallback.
- Examples: credential theft → API key + rotation; abuse → rate limiting; brute force → uniform 401 + escalation.