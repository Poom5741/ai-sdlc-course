# Quest 4.2: Generate-Review-Fix Loop

**Block**: 4 - Agentic Workflows | **Difficulty**: 🟡 Medium | **Time**: 20 minutes

## 🎯 Learning Objectives

- Create an iterative code improvement loop
- Implement AI-powered code review
- Build automatic fix mechanisms

## 📋 Instructions

1. **Implement the loop**: Build generate-review-fix logic
2. **Add AI review**: Use AI to review code quality
3. **Implement fixes**: Automatically fix identified issues
4. **Test convergence**: Verify the loop reaches quality standards

## 🚀 Getting Started

### The GRF Loop

```
┌─────────────┐
│  GENERATE   │
│ (AI writes) │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   REVIEW    │
│ (AI checks) │
└──────┬──────┘
       │
       ▼
   Issues? ──No──► Quality Check
       │
       Yes
       │
       ▼
┌─────────────┐
│    FIX      │
│ (AI fixes)  │
└──────┬──────┘
       │
       └──────► Back to REVIEW
```

## ✅ Verification

Run the test suite:

```bash
npm test
```

## 💡 Hints

- **Generate**: Start with initial code generation
- **Review**: Use AI to identify issues and improvements
- **Fix**: Apply fixes based on review feedback
- **Iterate**: Continue until quality standards are met

## 🔍 What You'll Learn

- **Iterative Improvement**: How to improve code automatically
- **AI Code Review**: Using AI for quality checks
- **Convergence**: When to stop iterating

## 📚 Resources

- [Code Review Best Practices](https://github.com/blog/1943-code-review-best-practices)
- [Automated Code Review Tools](https://github.com/topics/code-review)

## ⏭️ Next Quest

[Quest 4.3: Multi-Agent Pipeline](../quest-12-multi-agent/)
