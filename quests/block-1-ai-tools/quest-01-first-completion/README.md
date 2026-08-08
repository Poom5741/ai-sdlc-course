# Quest 1.1: First AI Code Completion

**Block**: 1 - AI Tools Setup | **Difficulty**: 🟢 Easy | **Time**: 15 minutes

## 🎯 Learning Objectives

- Use an AI coding tool for the first time
- Understand how AI suggestions work
- Write a simple recursive function

## 📋 Instructions

1. **Choose your AI tool**: GitHub Copilot, Claude Code, or any AI coding assistant
2. **Write a descriptive comment** in `index.js` explaining what you want
3. **Let the AI suggest** the implementation
4. **Accept the suggestion** and test it
5. **Run the tests** to verify your solution

## 🚀 Getting Started

### Option 1: Using GitHub Copilot (VS Code)

1. Open this folder in VS Code
2. Make sure GitHub Copilot is installed and enabled
3. Open `index.js`
4. Type the comment: `// Calculate factorial of n using recursion`
5. Press Enter and wait for Copilot to suggest the implementation
6. Press Tab to accept the suggestion

### Option 2: Using Claude Code (Terminal)

1. Open your terminal in this folder
2. Run: `claude`
3. Ask: "Write a JavaScript function to calculate factorial using recursion"
4. Copy the suggested code into `index.js`

### Option 3: Using ChatGPT/Claude Web

1. Open ChatGPT or Claude in your browser
2. Ask: "Write a JavaScript function to calculate factorial using recursion"
3. Copy the code into `index.js`

## ✅ Verification

Run the test suite to verify your solution:

```bash
npm test
```

You should see all tests passing:

```
✅ Test 1: factorial(0) = 1
✅ Test 2: factorial(1) = 1
✅ Test 3: factorial(2) = 2
✅ Test 4: factorial(3) = 6
✅ Test 5: factorial(5) = 120
✅ Test 6: factorial(10) = 3628800

🎉 Quest 1.1 Complete!
```

## 💡 Hints

- **Base case**: What should factorial(0) and factorial(1) return?
- **Recursive case**: How do you break down the problem?
- **Edge cases**: Should the function handle negative numbers?

## 🔍 What You'll Learn

- **AI Pair Programming**: How to effectively communicate with AI tools
- **Code Completion**: The difference between suggestions and completions
- **Testing**: Running automated tests to verify your code

## 📚 Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [Factorial (Wikipedia)](https://en.wikipedia.org/wiki/Factorial)

## ⏭️ Next Quest

Once you complete this quest, move on to [Quest 1.2: Multi-file Generation](../quest-02-multi-file/)

---

**Pro Tip**: Notice how different AI tools produce different implementations. Some might use a simple `if/else`, others might use a ternary operator. Both are valid! The key is understanding the logic.
