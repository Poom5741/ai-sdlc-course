/**
 * Quest 3.1: User Story Generator — REFERENCE solution
 */
function generateUserStory(notes) {
  const lower = notes.toLowerCase();
  
  // Extract role
  const roleMatch = lower.match(/as\s+(?:a\s+)?(\w+)/i);
  const asA = roleMatch ? roleMatch[1] : 'user';
  
  // Extract feature
  const wantMatch = lower.match(/i\s+want\s+(.+?)(?:\s+so\s+that|\s*$)/i);
  const iWant = wantMatch ? wantMatch[1].trim() : notes.substring(0, 50);
  
  // Extract benefit
  const soThatMatch = lower.match(/so\s+that\s+(.+?)(?:\.|$)/i);
  const soThat = soThatMatch ? soThatMatch[1].trim() : 'improve user experience';
  
  // Extract acceptance criteria
  const criteria = [];
  if (lower.includes('email')) criteria.push('Email field is present');
  if (lower.includes('password')) criteria.push('Password field is present');
  if (lower.includes('must')) criteria.push('Meets specified requirements');
  if (criteria.length === 0) criteria.push('Feature works as described');
  
  return { asA, iWant, soThat, acceptanceCriteria: criteria };
}
module.exports = { generateUserStory };
