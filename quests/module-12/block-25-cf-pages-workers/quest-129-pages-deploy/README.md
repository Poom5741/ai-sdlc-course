# Quest 25.1: Pages Deployment

**Block**: 25 - Cloudflare Pages & Workers | **Difficulty**: 🟢 Easy | **Time**: 15 minutes

## 🎯 Learning Objectives

- Configure wrangler.toml for Cloudflare Pages deployment.
- **Configure build correctly** — naive AI uses wrong output directory and deployment fails silently; every config must be validated.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/module-12/block-25-cf-pages-workers/quest-129-pages-deploy my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool.
3. **Implement `generateWranglerConfig(projectName, buildCmd, outputDir)`** that returns wrangler.toml content.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

```bash
node test.js
```

All 10 tests pass when your function:
- Generates valid TOML with `[project]` section.
- Uses the specified output directory (not hardcoded "dist").
- Validates project name and output dir are non-empty.

## 💡 Hints

- Naive AI hardcodes output dir as "dist" — use `outputDir` parameter.
- The TOML must include `name`, `compatibility_date`, and `pages_build_output_dir`.
