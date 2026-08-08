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

  // TODO: Implement addTodo method
  addTodo(title, dueDate = null) {
    // Your implementation here
  }

  // TODO: Implement removeTodo method
  removeTodo(id) {
    // Your implementation here
  }

  // TODO: Implement updateTodo method
  updateTodo(id, updates) {
    // Your implementation here
  }

  // TODO: Implement completeTodo method
  completeTodo(id) {
    // Your implementation here
  }

  // TODO: Implement listTodos method
  listTodos(filter = 'all') {
    // Your implementation here
    return [];
  }

  // TODO: Implement saveToFile method
  async saveToFile(filename) {
    // Your implementation here
  }

  // TODO: Implement loadFromFile method
  async loadFromFile(filename) {
    // Your implementation here
  }
}

module.exports = TodoManager;
