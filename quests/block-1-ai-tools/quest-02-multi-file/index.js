/**
 * Quest 1.2: Multi-file Generation
 * 
 * Block: 1 - AI Tools Setup
 * Difficulty: 🟡 Medium
 * Time: 20 minutes
 * 
 * Goal: Generate a complete utility library with multiple related files
 * 
 * Instructions:
 * 1. Use your AI coding tool to generate multiple related files
 * 2. Create a math utility library with:
 *    - index.js (main exports)
 *    - math.js (core math functions)
 *    - validators.js (input validation)
 * 3. Ensure all files work together
 */

const calculator = {
  add(a, b) { return a + b; },
  subtract(a, b) { return a - b; },
  multiply(a, b) { return a * b; },
  divide(a, b) { return b === 0 ? Infinity : a / b; },
  calculate(operation, a, b) {
    if (typeof this[operation] !== 'function') {
      throw new Error(`Unknown operation: ${operation}`);
    }
    return this[operation](a, b);
  }
};

module.exports = calculator;
