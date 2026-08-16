# Quest 4.14: Dockerfile Generator

**Block**: 10 - DevOps & Deployment | **Difficulty**: 🟢 Easy | **Time**: 20 minutes

## 🎯 Learning Objectives

- Generate optimized Dockerfiles from project descriptions.
- **Optimize containers** — multi-stage builds, non-root user, healthchecks.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-4/block-10-devops/quest-56-dockerfile-generator my-quest
cd my-quest
```

Implement `generateDockerfile(project)` returning a complete Dockerfile string with multi-stage build, non-root user, and healthcheck.

## ✅ Verification

`node test.js` checks multi-stage builds, non-root USER, correct port, HEALTHCHECK, and language adaptation.
