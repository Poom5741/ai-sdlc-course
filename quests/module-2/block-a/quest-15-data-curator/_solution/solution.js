/**
 * Quest 2.3: Data Curator — REFERENCE solution
 */
function curateData(rawData) {
  const seen = new Set();
  const result = [];
  
  for (const line of rawData) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    if (seen.has(trimmed.toLowerCase())) continue;
    if (trimmed.length < 6) continue;
    
    const punctCount = (trimmed.match(/[^a-zA-Z0-9\s]/g) || []).length;
    if (punctCount / trimmed.length > 0.5) continue;
    
    seen.add(trimmed.toLowerCase());
    result.push(trimmed);
  }
  
  return result;
}
module.exports = { curateData };
