# Quest 24.5: CI/CD Pipeline Configurator

**Block**: 24 - GitHub Project Management | **Difficulty**: 🔴 Hard | **Time**: 30 minutes

## 🎯 Learning Objectives

- Generate GitHub Actions YAML for common workflows (test, build, deploy).
- **Configure correctly** — naive AI uses wrong node version or missing env vars; every pipeline must be production-ready.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/module-11/block-24-github-projects/quest-128-cicd-pipeline my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool.
3. **Implement `generateWorkflow(config)`** that returns GitHub Actions YAML content.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

```bash
node test.js
```

All 10 tests pass when your function:
- Generates valid YAML with `runs-on: ubuntu-latest`.
- Uses the specified node version (not hardcoded '16').
- Includes all requested steps (install, lint, test, build).
- Handles env vars and deploy configuration.

## 💡 Hints

- Naive AI hardcodes node version "16" — use `config.nodeVersion` instead.
- Use `actions/setup-node@v4` with the specified version.
- Format env vars as `key: value` under the `env:` section.
