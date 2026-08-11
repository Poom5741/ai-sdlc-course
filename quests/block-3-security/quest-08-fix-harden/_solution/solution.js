/**
 * Quest 3.2: REFERENCE solution (do NOT import or read during the exercise)
 *
 * Fix the class: parameterized query + input validation on the boundary.
 */

function safeQuery(id) {
  return {
    query: 'SELECT * FROM users WHERE id = ?',
    params: [id],
  };
}

function validateUserId(s) {
  if (typeof s !== 'string') return false;
  if (s.length === 0) return false;
  if (!/^\d+$/.test(s)) return false;
  if (Number(s) < 0) return false;
  return true;
}

module.exports = { safeQuery, validateUserId };