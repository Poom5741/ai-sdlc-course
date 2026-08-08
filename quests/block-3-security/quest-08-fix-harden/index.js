/**
 * Quest 3.2: Fix and Harden
 * 
 * Block: 3 - Security
 * Difficulty: 🟡 Medium
 * Time: 20 minutes
 * 
 * Goal: Fix security vulnerabilities in AI-generated code
 * 
 * Instructions:
 * 1. Review the vulnerable code
 * 2. Fix each vulnerability
 * 3. Apply security hardening
 * 4. Test your fixes
 */

// TODO: Implement secure versions of the vulnerable functions

function getUserById(userId) {
  // Parameterized query - no SQL injection
  const query = 'SELECT * FROM users WHERE id = ?';
  // In real code: db.query(query, [userId])
  return { query, params: [userId] };
}

function getApiKey() {
  // Use environment variable - no hardcoded secrets
  return process.env.API_KEY || '';
}

function hashPassword(password) {
  // Use strong hashing (SHA-256 with salt for demo, use bcrypt in production)
  const crypto = require('crypto');
  const salt = crypto.randomBytes(16).toString('hex');
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

function processPayment(amount, cardNumber) {
  // Input validation
  if (typeof amount !== 'number' || amount <= 0) {
    return { success: false, error: 'Invalid amount' };
  }
  if (!/^\d{13,19}$/.test(cardNumber)) {
    return { success: false, error: 'Invalid card number' };
  }
  return { success: true };
}

function readFile(filename) {
  // Path traversal prevention
  const path = require('path');
  const safePath = path.normalize(filename).replace(/^\.\.\//g, '');
  if (safePath.includes('..')) {
    throw new Error('Path traversal detected');
  }
  return safePath;
}

function renderComment(comment) {
  // XSS prevention - sanitize HTML
  return comment
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

module.exports = {
  getUserById,
  getApiKey,
  hashPassword,
  processPayment,
  readFile,
  renderComment,
};
