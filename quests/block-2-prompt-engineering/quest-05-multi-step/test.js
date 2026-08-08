/**
 * Quest 2.2: Multi-Step Prompting - Test Suite
 */

const TodoManager = require('./index.js');

let manager;
let passed = 0;
let failed = 0;

console.log("Quest 2.2: Multi-Step Prompting\n");
console.log("Running tests...\n");

// Setup
beforeEach(() => {
  manager = new TodoManager();
});

function test(description, fn) {
  try {
    fn();
    console.log(`✅ ${description}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${description}`);
    console.log(`   ${error.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, got ${actual}`);
  }
}

// Tests
test('addTodo creates a todo', () => {
  manager.addTodo('Test todo');
  const todos = manager.listTodos();
  assertEqual(todos.length, 1);
  assertEqual(todos[0].title, 'Test todo');
});

test('addTodo with due date', () => {
  manager.addTodo('Test todo', '2024-12-31');
  const todos = manager.listTodos();
  assertEqual(todos[0].dueDate, '2024-12-31');
});

test('removeTodo removes a todo', () => {
  manager.addTodo('Test todo');
  const todo = manager.listTodos()[0];
  manager.removeTodo(todo.id);
  assertEqual(manager.listTodos().length, 0);
});

test('completeTodo marks todo as complete', () => {
  manager.addTodo('Test todo');
  const todo = manager.listTodos()[0];
  manager.completeTodo(todo.id);
  const updated = manager.listTodos()[0];
  assertEqual(updated.completed, true);
});

test('listTodos with filter', () => {
  manager.addTodo('Todo 1');
  manager.addTodo('Todo 2');
  const todo1 = manager.listTodos()[0];
  manager.completeTodo(todo1.id);
  
  const completed = manager.listTodos('completed');
  const pending = manager.listTodos('pending');
  
  assertEqual(completed.length, 1);
  assertEqual(pending.length, 1);
});

test('updateTodo updates fields', () => {
  manager.addTodo('Original title');
  const todo = manager.listTodos()[0];
  manager.updateTodo(todo.id, { title: 'Updated title' });
  const updated = manager.listTodos()[0];
  assertEqual(updated.title, 'Updated title');
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log("\n🎉 Quest 2.2 Complete! You've mastered multi-step prompting.");
  process.exit(0);
} else {
  console.log("\n💡 Hint: Break the complex task into smaller, manageable pieces.");
  process.exit(1);
}
