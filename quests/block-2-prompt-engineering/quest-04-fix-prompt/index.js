/**
 * Quest 2.1: Fix the Vague Prompt
 * 
 * Block: 2 - Prompt Engineering
 * Difficulty: 🟢 Easy
 * Time: 15 minutes
 * 
 * Goal: Transform a vague prompt into a specific, effective prompt
 * 
 * Instructions:
 * 1. Analyze the vague prompt below
 * 2. Write an improved, specific prompt
 * 3. Use your improved prompt to generate the function
 * 4. Test the generated code
 */

// Vague prompt (BAD):
// "Make a function that handles users"

const improvedPrompt = `
Create a function called createUser that:
- Takes an object with name (string) and email (string)
- Validates that email matches standard format (user@domain.com)
- Returns { success: true, id, name, email } on success
- Returns { success: false, error: 'message' } on failure
- Generates a unique ID for the user
`;

function createUser(userData) {
  const { name, email } = userData || {};
  
  if (!name || typeof name !== 'string') {
    return { success: false, error: 'Name is required' };
  }
  
  if (!email || typeof email !== 'string') {
    return { success: false, error: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Invalid email format' };
  }
  
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
  console.log('User created:', { id, name, email });
  
  return { success: true, id, name, email };
}

module.exports = createUser;
