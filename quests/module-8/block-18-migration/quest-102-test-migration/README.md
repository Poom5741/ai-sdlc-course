# Quest 18.5: Test Migration

**Block**: 18 - AI Migration | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Sync tests with refactored code.
- **Tests follow code** — update tests when you refactor.

## 💡 Hints

- Use word-boundary-aware replacement (`\b`) to avoid corrupting similar names.
- Renaming "get" should NOT corrupt "getter" → "fetchter".
- Remove test cases for deleted functions.
