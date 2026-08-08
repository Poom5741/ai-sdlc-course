# Quest 2.1: Fix the Vague Prompt

**Block**: 2 - Prompt Engineering | **Difficulty**: 🟢 Easy | **Time**: 15 minutes

## 🎯 Learning Objectives

- Identify problems with vague prompts
- Write specific, actionable prompts
- Understand prompt structure

## 📋 Instructions

1. **Analyze the vague prompt**: "Make a function that handles users"
2. **Identify problems**: What's missing? What's ambiguous?
3. **Write an improved prompt**: Make it specific and actionable
4. **Generate code**: Use your improved prompt with an AI tool
5. **Test the result**: Verify the generated code works

## 🚀 Getting Started

### The Vague Prompt (BAD)

```
Make a function that handles users
```

### Problems with This Prompt

- ❌ What does "handle" mean? Create? Read? Update? Delete?
- ❌ What data does a user have?
- ❌ What validation is needed?
- ❌ What should the function return?
- ❌ What error handling is required?

### Your Improved Prompt

Write a prompt that addresses all these issues!

## ✅ Verification

Run the test suite:

```bash
npm test
```

## 💡 Hints

A good prompt should include:

1. **Function name and purpose**
2. **Input parameters** with types
3. **Output format** and structure
4. **Validation rules**
5. **Error handling**
6. **Example usage**

## 🔍 What You'll Learn

- **Prompt Structure**: The anatomy of an effective prompt
- **Specificity**: How details improve AI output quality
- **Requirements Gathering**: Translating needs into clear instructions

## 📝 Example Improved Prompt

```
Create a function called createUser that:
- Takes an object with name (string) and email (string)
- Validates that email matches standard format (user@domain.com)
- Returns { success: true, id, name, email } on success
- Returns { success: false, error: 'message' } on failure
- Generates a unique ID for the user
```

## 📚 Resources

- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [OpenAI Prompt Engineering](https://platform.openai.com/docs/guides/prompt-engineering)

## ⏭️ Next Quest

[Quest 2.2: Multi-Step Prompting](../quest-05-multi-step/)
