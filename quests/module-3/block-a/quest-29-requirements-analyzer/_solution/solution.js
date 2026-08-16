function analyzeRequirements(req) {
  const issues = [];
  const suggestions = [];
  let score = 100;
  
  if (/fast|user.friendly|lots/i.test(req)) {
    issues.push('Requirements contain vague terms (fast, user-friendly, lots)');
    suggestions.push('Quantify requirements: "response time < 200ms", "support 1000 concurrent users"');
    score -= 30;
  }
  
  if (req.split('.').length < 3) {
    issues.push('Too few requirements specified');
    suggestions.push('Add more specific functional and non-functional requirements');
    score -= 20;
  }
  
  if (!/must|shall|will/i.test(req)) {
    issues.push('No mandatory requirements marked');
    suggestions.push('Use "must", "shall", or "will" for mandatory requirements');
    score -= 15;
  }
  
  return { score: Math.max(0, score), issues, suggestions };
}
module.exports = { analyzeRequirements };
