/**
 * Quest 6.4: Structured Output Parser — REFERENCE solution (do NOT import or read during the exercise)
 */

function parseStructuredOutput(text, schema) {
  const errors = [];

  // Extract JSON from code blocks or raw text
  let jsonStr = text;
  const codeBlockMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  if (codeBlockMatch) {
    jsonStr = codeBlockMatch[1];
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonStr.trim());
  } catch {
    // Try to find JSON-like content
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        parsed = JSON.parse(jsonMatch[0]);
      } catch {
        return { parsed: null, errors: ['Invalid JSON'], valid: false };
      }
    } else {
      return { parsed: null, errors: ['No JSON found'], valid: false };
    }
  }

  // Validate against schema
  for (const [field, rules] of Object.entries(schema)) {
    if (rules.required && !(field in parsed)) {
      errors.push(`Missing required field: ${field}`);
    }
    if (field in parsed) {
      // Type coercion
      if (rules.type === 'number' && typeof parsed[field] === 'string') {
        const num = Number(parsed[field]);
        if (!isNaN(num)) parsed[field] = num;
      }
      if (rules.type === 'boolean' && typeof parsed[field] === 'string') {
        parsed[field] = parsed[field] === 'true';
      }
    }
  }

  return { parsed, errors, valid: errors.length === 0 };
}

module.exports = { parseStructuredOutput };
