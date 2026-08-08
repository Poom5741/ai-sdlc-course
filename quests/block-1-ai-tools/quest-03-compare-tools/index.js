/**
 * Quest 1.3: Compare Tools
 * 
 * Block: 1 - AI Tools Setup
 * Difficulty: 🟡 Medium
 * Time: 20 minutes
 * 
 * Goal: Compare different AI tools by generating the same function
 * 
 * Instructions:
 * 1. Use at least 2 different AI tools to generate a sorting function
 * 2. Document the differences in approach, readability, and performance
 * 3. Choose the best implementation based on your criteria
 */

function sortByKey(array, key, ascending = true) {
  if (!array || array.length === 0) return [];
  
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal === undefined) return 1;
    if (bVal === undefined) return -1;
    
    let comparison = 0;
    if (typeof aVal === 'string') {
      comparison = aVal.localeCompare(bVal);
    } else {
      comparison = aVal - bVal;
    }
    
    return ascending ? comparison : -comparison;
  });
}

module.exports = sortByKey;
