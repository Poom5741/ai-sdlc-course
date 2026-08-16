# Quest 15.4: Performance Review Analyzer

**Block**: 15 - AI Code Review | **Difficulty**: 🔴 Hard | **Time**: 30 minutes

## 🎯 Learning Objectives

- Identify performance anti-patterns in code.
- **Measure before optimizing** — catch obvious issues but flag for measurement.

## 💡 Hints

- Module-level `readFileSync` for config loading is acceptable — only flag sync ops inside functions.
- N+1 queries are DB calls inside loops.
- `JSON.parse(JSON.stringify())` is a large-payload anti-pattern — suggest `structuredClone()`.
