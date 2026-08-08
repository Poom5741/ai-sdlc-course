# Quest 2.2: Multi-Step Prompting

**Block**: 2 - Prompt Engineering | **Difficulty**: 🟡 Medium | **Time**: 20 minutes

## 🎯 Learning Objectives

- Break complex tasks into manageable steps
- Write prompts for each step
- Build incrementally with AI assistance

## 📋 Instructions

1. **Analyze the task**: Understand all requirements
2. **Break it down**: Create 3-5 clear steps
3. **Write prompts**: Create specific prompts for each step
4. **Implement**: Use AI to generate code for each step
5. **Test**: Verify the complete solution works

## 🚀 Getting Started

### The Complex Task

Build a complete todo list manager with:
- Add, remove, update, and list todos
- Mark todos as complete
- Filter by status
- Save/load from JSON file
- Command-line interface

### Your Multi-Step Approach

1. **Step 1**: Define the todo data structure
2. **Step 2**: Implement CRUD operations
3. **Step 3**: Add filtering and sorting
4. **Step 4**: Implement file storage
5. **Step 5**: Create CLI interface

## ✅ Verification

Run the test suite:

```bash
npm test
```

## 💡 Hints

- **Start simple**: Get basic add/list working first
- **Build incrementally**: Add features one at a time
- **Test frequently**: Run tests after each step
- **Refactor when needed**: Improve code structure as you go

## 🔍 What You'll Learn

- **Decomposition**: Breaking complex problems into simple parts
- **Incremental Development**: Building features step by step
- **Prompt Chaining**: Using output from one prompt as input for the next

## 📝 Step-by-Step Prompts

### Step 1: Data Structure
```
Create a Todo class with properties:
- id: unique identifier
- title: string
- completed: boolean (default: false)
- dueDate: optional date string
- createdAt: timestamp
```

### Step 2: CRUD Operations
```
Add methods to TodoManager:
- addTodo(title, dueDate?): Creates and stores a new todo
- removeTodo(id): Removes todo by id
- updateTodo(id, updates): Updates todo fields
- completeTodo(id): Marks todo as completed
```

### Step 3: Filtering
```
Add listTodos(filter) method:
- filter: 'all' | 'completed' | 'pending'
- Returns filtered array of todos
```

## 📚 Resources

- [Prompt Chaining](https://www.promptingguide.ai/techniques/prompt_chaining)
- [Chain of Thought Prompting](https://www.promptingguide.ai/techniques/cot)

## ⏭️ Next Quest

[Quest 2.3: Domain-Specific Prompting](../quest-06-domain-specific/)
