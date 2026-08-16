# Quest 25.4: Worker Environment Config

**Block**: 25 - Cloudflare Pages & Workers | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Parse wrangler.toml, validate bindings (KV, D1, R2, secrets).
- **Separate secrets from config** — naive AI puts production secrets in wrangler.toml instead of .dev.vars; never commit secrets.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/module-12/block-25-cf-pages-workers/quest-132-worker-env-config my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool.
3. **Implement `validateBindings(tomlContent, envVars)`** that validates bindings and generates .dev.vars.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

```bash
node test.js
```

All 10 tests pass when your function:
- Validates KV has id and preview_id.
- Validates D1 has database_id.
- Warns when secrets are found in tomlContent.
- Generates .dev.vars in KEY=VALUE format.

## 💡 Hints

- Naive AI puts production secrets in wrangler.toml — that's the edge case.
- Secrets should go in .dev.vars (never committed to git).
- Use regex to parse TOML sections and validate required fields.
