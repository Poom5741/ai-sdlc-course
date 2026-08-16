function generateADR(title, context, decision, consequences) {
  return `# ADR: ${title}\n\n## Status\nAccepted\n\n## Context\n${context}\n\n## Decision\n${decision}\n\n## Consequences\n${consequences}`;
}
module.exports = { generateADR };
