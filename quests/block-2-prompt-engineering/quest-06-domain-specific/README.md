# Quest 2.3: Domain-Specific Prompting (Thai formats)

**Block**: 2 - Prompt Engineering | **Difficulty**: 🔴 Hard | **Time**: 25 minutes

## 🎯 Learning Objectives

- Write prompts that encode domain rules.
- **Encode domain knowledge** — the AI will NOT guess Thai format rules.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/block-2-prompt-engineering/quest-06-domain-specific my-quest
cd my-quest
```

1. Read the domain rules in `problem.js` (Thai phone + Thai ID).
2. Write a prompt that includes BOTH rule sets verbatim.
3. Generate `isValidThaiPhone(s)` and `isValidThaiId(s)`.
4. Verify:
   ```bash
   node test.js
   ```

## Domain rules (do NOT let the AI guess these)

**Thai mobile phone**:
- Exactly 10 digits.
- Must start with `06`, `08`, or `09`.
- Normalize formatted forms (`0X-XXXX-XXXX`) by stripping non-digits first.

**Thai national ID (13 digits)**:
- Exactly 13 digits.
- Checksum: `sum = Σ_{i=1..12} digit_i × (14 − i)`, `check = (11 − (sum mod 11)) mod 10`; `check` MUST equal digit 13.

## ✅ Verification

`node test.js` checks valid phones (06/08/09 prefixes, formatted), invalid (9-digit, wrong prefix, letters, empty), valid ID with correct checksum, and rejects bad-length / bad-checksum / non-numeric IDs.

## 💡 Hints

- A generic "validate a phone number" prompt produces a generic regex that fails Thai edges.
- Put the rules in the prompt explicitly — and verify with `node test.js` (the bad-checksum test catches AI that faked the checksum).