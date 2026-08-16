# Quest 5.9: Rate Limiter for LLM APIs

**Block**: 12 - Production Patterns | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Implement a token bucket rate limiter.
- **Protect your budget** — LLM APIs have rate limits. A limiter prevents throttling.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-5/block-12-production/quest-71-rate-limiter my-quest
cd my-quest
```

Implement `createRateLimiter(config)` with token bucket: refill over time, consume, deny when empty.

## ✅ Verification

`node test.js` checks consume, deny, refill over time, reset, and the edge case: tokens must refill (not just reset at intervals).
