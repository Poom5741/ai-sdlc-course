# Quest 4.15: IaC Generator

**Block**: 10 - DevOps & Deployment | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Generate infrastructure-as-code (Terraform-style).
- **Infrastructure as code** — version control it, review it, test it, roll it back.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-4/block-10-devops/quest-57-iac-generator my-quest
cd my-quest
```

Implement `generateIaC(infra)` returning Terraform HCL with provider, resources, variables (for secrets), and outputs.

## ✅ Verification

`node test.js` checks provider blocks, resource blocks, variable declarations for secrets, no hardcoded passwords, and outputs.
