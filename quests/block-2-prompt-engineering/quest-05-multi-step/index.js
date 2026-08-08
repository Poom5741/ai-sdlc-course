/**
 * Quest 2.2: Multi-Step Prompting
 * 
 * Block: 2 - Prompt Engineering
 * Difficulty: 🟡 Medium
 * Time: 20 minutes
 * 
 * Goal: Break a complex task into manageable steps for AI
 * 
 * Instructions:
 * 1. Analyze the complex task below
 * 2. Break it into 3-5 clear steps
 * 3. Write prompts for each step
 * 4. Implement the complete solution
 */

// Complex task: Build a complete todo list manager with:
// - Add, remove, update, and list todos
// - Mark todos as complete
// - Filter by status
// - Save/load from JSON file
// - Command-line interface

// TODO: Write your multi-step prompts here
const prompts = {
  step1: '// Step 1: Define the todo data structure\n',
  step2: '// Step 2: Implement CRUD operations\n',
  step3: '// Step 3: Add filtering and sorting\n',
  step4: '// Step 4: Implement file storage\n',
  step5: '// Step 5: Create CLI interface\n',
};

// TODO: Implement the TodoManager class
class TodoManager {
  constructor() {
    this.todos = [];
  }

  addTodo(title, dueDate = null) {
    const todo = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      title,
      completed: false,
      dueDate,
      createdAt: new Date().toISOString(),
    };
    this.todos.push(todo);
    return todo;
  }

  removeTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  updateTodo(id, updates) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      Object.assign(todo, updates);
    }
    return todo;
  }

  completeTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = true;
    }
    return todo;
  }

  listTodos(filter = 'all') {
    if (filter === 'completed') {
      return this.todos.filter(t => t.completed);
    }
    if (filter === 'pending') {
      return this.todos.filter(t => !t.completed);
    }
    return [...this.todos];
  }

  async saveToFile(filename) {
    const fs = require('fs').promises;
    await fs.writeFile(filename, JSON.stringify(this.todos, null, 2));
  }

  async loadFromFile(filename) {
    const fs = require('fs').promises;
    const data = await fs.readFile(filename, 'utf8');
    this.todos = JSON.parse(data);
  }
}

module.exports = TodoManager;
