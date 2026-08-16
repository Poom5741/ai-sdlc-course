# Quest 21.4: Feature Flag System with AI Recommendations

**Block**: 21 - Full SDLC Integration | **Difficulty**: 🟡 Medium | **Time**: 30 minutes

## 🎯 Learning Objectives

- Feature flags with AI-driven rollout suggestions.
- **Controlled rollout** — use flags to de-risk deployments.

## 💡 Hints

- Use stable hashing of userId, NOT Math.random() — same user must always get the same result.
- 100% rollout always enabled, 0% never enabled.
- Support rule-based targeting (e.g., environment=staging).
