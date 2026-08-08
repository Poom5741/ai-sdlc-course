# Quest 1.2: Multi-file Generation

**Block**: 1 - AI Tools Setup | **Difficulty**: 🟡 Medium | **Time**: 20 minutes

## 🎯 Learning Objectives

- Generate multiple related files with AI
- Understand file organization and imports
- Create a modular utility library

## 📋 Instructions

1. **Plan your library**: Think about what functions you need
2. **Generate files**: Use AI to create multiple related files
3. **Connect them**: Import functions between files
4. **Test everything**: Run the test suite

## 🚀 Getting Started

### Step 1: Create math.js

Use AI to generate a `math.js` file with:
- `add(a, b)` - Addition
- `subtract(a, b)` - Subtraction
- `multiply(a, b)` - Multiplication
- `divide(a, b)` - Division

### Step 2: Create validators.js

Use AI to generate a `validators.js` file with:
- `isNumber(value)` - Check if value is a number
- `isPositive(value)` - Check if value is positive
- `isNonZero(value)` - Check if value is not zero

### Step 3: Create index.js

Import all functions and create a calculator object with a `calculate` method.

## ✅ Verification

Run the test suite:

```bash
npm test
```

## 💡 Hints

- **Modularity**: Keep related functions in separate files
- **Exports**: Use `module.exports` to export functions
- **Imports**: Use `require()` to import functions
- **Error handling**: Consider what happens with invalid inputs

## 🔍 What You'll Learn

- **File Organization**: How to structure a multi-file project
- **Imports/Exports**: JavaScript module system
- **AI Code Generation**: Generating multiple related files

## 📚 Resources

- [Node.js Modules](https://nodejs.org/api/modules.html)
- [JavaScript import/export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

## ⏭️ Next Quest

[Quest 1.3: Compare Tools](../quest-03-compare-tools/)
