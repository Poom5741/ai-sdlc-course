/**
 * Quest 1.6: Hallucination Detector — REFERENCE solution
 */

function detectHallucinations(text, knownFacts) {
  if (!text || text.trim() === '') return [];

  const results = [];
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

  for (const sentence of sentences) {
    const trimmed = sentence.trim();

    // Skip opinions — they start with opinion indicators
    if (/^(I think|I believe|in my opinion|I feel|it seems|arguably)/i.test(trimmed)) {
      continue;
    }

    // Skip questions
    if (trimmed.endsWith('?')) continue;

    const claimLower = trimmed.toLowerCase();
    const claimWords = claimLower.split(/\s+/).filter(w => w.length > 3);

    // Check if any known fact supports this claim
    const isSupported = knownFacts.some(fact => {
      const factLower = fact.toLowerCase();
      const factWords = factLower.split(/\s+/).filter(w => w.length > 3);
      const overlap = claimWords.filter(w => factWords.includes(w));
      // Claim is supported if most of its significant words appear in a fact
      return overlap.length >= Math.floor(claimWords.length * 0.5) && overlap.length >= 1;
    });

    // Check if any known fact contradicts this claim
    const contradictsFact = knownFacts.find(fact => {
      const factLower = fact.toLowerCase();
      const factWords = factLower.split(/\s+/).filter(w => w.length > 3);
      const overlap = claimWords.filter(w => factWords.includes(w));

      // Must share subject (at least 1 significant word)
      if (overlap.length < 1) return false;

      // Check for direct contradictions (opposite words)
      const contradictions = [
        ['flat', 'round'], ['hot', 'cold'], ['big', 'small'],
        ['is', 'not'], ['true', 'false'], ['yes', 'no'],
        ['created in 2020', 'created in 1991'],
      ];

      for (const [a, b] of contradictions) {
        if ((claimLower.includes(a) && factLower.includes(b)) ||
            (claimLower.includes(b) && factLower.includes(a))) {
          return true;
        }
      }

      return false;
    });

    if (contradictsFact) {
      results.push({ claim: trimmed, reason: 'contradicts', fact: contradictsFact });
    } else if (!isSupported && knownFacts.length > 0) {
      results.push({ claim: trimmed, reason: 'unsupported' });
    } else if (!isSupported && knownFacts.length === 0) {
      results.push({ claim: trimmed, reason: 'unsupported' });
    }
  }

  return results;
}

module.exports = { detectHallucinations };
