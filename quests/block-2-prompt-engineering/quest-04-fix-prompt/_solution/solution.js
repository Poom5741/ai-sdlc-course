/**
 * Quest 2.1: REFERENCE solution (do NOT import or read during the exercise)
 */

function createUser(userData) {
  const { name, email } = userData || {};
  if (!name || typeof name !== 'string') {
    return { success: false, error: 'Name is required' };
  }
  if (!email || typeof email !== 'string') {
    return { success: false, error: 'Email is required' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Invalid email format' };
  }
  return {
    success: true,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    name,
    email,
  };
}

module.exports = createUser;