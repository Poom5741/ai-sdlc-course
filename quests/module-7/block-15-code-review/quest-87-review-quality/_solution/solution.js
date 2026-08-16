/**
 * Quest 15.5: Review Quality Scorer — REFERENCE solution
 */

function scoreReview(comments) {
  if (!comments || comments.length === 0) return { score: 0, breakdown: {} };

  const breakdown = { actionable: 0, specific: 0, terse: 0, detailed: 0 };
  let total = 0;

  for (const c of comments) {
    const text = (c.text || '').toLowerCase();

    // Actionable: suggests what to do
    if (/\b(use|try|consider|change|replace|add|remove|check|fix|rename|refactor|please)\b/i.test(text)) {
      breakdown.actionable += 20;
    }

    // Specific: references line numbers, function names, or files
    if (/line\s+\d+|function\s+\w+|L\d+|per\s+\w+/i.test(text)) {
      breakdown.specific += 20;
    }

    // Terse: concise (< 80 chars is good, not too short)
    if (c.text && c.text.length > 10 && c.text.length < 80) {
      breakdown.terse += 20;
    }

    // Detailed: explains why
    if (/\b(because|since|why|reason|avoids?|prevents?|improves?|per\s+\w+)\b/i.test(text)) {
      breakdown.detailed += 20;
    }

    total += 20; // base score per comment
  }

  // Normalize to 0-100
  const raw = breakdown.actionable + breakdown.specific + breakdown.terse + breakdown.detailed;
  const maxPossible = comments.length * 80;
  const score = Math.min(100, Math.round((raw / maxPossible) * 100));

  return { score, breakdown };
}

module.exports = { scoreReview };
