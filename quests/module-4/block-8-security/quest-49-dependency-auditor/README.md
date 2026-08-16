# Quest 4.7: Dependency Vulnerability Auditor

**Block**: 8 - Security | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Audit package.json for known vulnerabilities.
- **Dependencies are attack surface** — every npm package is code you trust.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-4/block-8-security/quest-49-dependency-auditor my-quest
cd my-quest
```

1. Read the contract in `problem.js`: implement `auditDependencies(packageJson, vulnDb)`.
2. Prompt the AI for the implementation. Be explicit about devDependencies.
3. Verify:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` asserts detection of vulnerable packages in both `dependencies` AND `devDependencies`, correct severity sorting, and fix version reporting.

## 💡 Hints

- The edge case: naive AI only checks `dependencies` but misses `devDependencies`.
- Simple semver range matching: `^1.2.3` includes `1.2.5` but not `2.0.0`.
- Sort results by severity: critical first.
