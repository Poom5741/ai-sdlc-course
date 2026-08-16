/**
 * Solution for Hallucination Detector quest
 */

/**
 * Detects hallucination risk in LLM output
 * @param {string} output - The LLM's response
 * @param {string[]} sources - Source documents for verification
 * @returns {{ riskScore: number, issues: object[], confidence: number }}
 */
function detectHallucination(output, sources) {
  const issues = [];
  let riskScore = 0;

  if (!output || output.trim().length === 0) {
    return { riskScore: 0, issues: [], confidence: 1 };
  }

  // Split output into sentences
  const sentences = output.split(/[.!?]+/).filter(s => s.trim().length > 0);

  // Check each sentence against sources
  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (trimmed.length < 10) continue;

    // Split by 'and' to check clauses separately
    const clauses = trimmed.split(/\s+and\s+/i);
    let clauseUnsupported = 0;

    for (const clause of clauses) {
      const clauseTrimmed = clause.trim();
      if (clauseTrimmed.length < 5) continue;

      const isSupported = sources.some(source => {
        const sourceLower = source.toLowerCase();
        const clauseLower = clauseTrimmed.toLowerCase();
        const clauseWords = clauseLower.split(/\s+/).filter(w => w.length > 3);
        const sourceWords = sourceLower.split(/\s+/);
        let matches = 0;
        for (const word of clauseWords) {
          if (sourceWords.includes(word)) matches++;
        }
        return clauseWords.length > 0 && matches / clauseWords.length >= 0.4;
      });

      if (!isSupported && sources.length > 0) {
        clauseUnsupported++;
      }
    }

    // If most clauses are unsupported, flag the sentence
    if (clauseUnsupported > 0 && sources.length > 0) {
      issues.push({
        type: 'unsupported_claim',
        description: `Claim not well-supported: "${trimmed.slice(0, 50)}..."`,
        severity: 'high',
        claim: trimmed
      });
      riskScore += 0.6;
    }
  }

  // Check for contradictions
  const contradictionPairs = [
    ['flat', 'round'],
    ['blue', 'green'],
    ['hot', 'cold'],
    ['big', 'small'],
    ['light', 'dark'],
    ['up', 'down'],
    ['yes', 'no'],
    ['true', 'false']
  ];

  const lowerOutput = output.toLowerCase();
  for (const [word1, word2] of contradictionPairs) {
    if (lowerOutput.includes(word1) && lowerOutput.includes(word2)) {
      issues.push({
        type: 'contradiction',
        description: `Potential contradiction: "${word1}" vs "${word2}"`,
        severity: 'critical'
      });
      riskScore += 0.4;
      break;
    }
  }

  // Check for made-up citations
  const citationPatterns = [
    /(?:according to|as reported by|study by)\s+[A-Z][a-z]+/gi,
    /\([A-Z][a-z]+(?:\s+et\s+al\.)?,?\s*\d{4}\)/gi
  ];

  for (const pattern of citationPatterns) {
    const citations = output.match(pattern) || [];
    for (const citation of citations) {
      const citationSupported = sources.some(source =>
        source.toLowerCase().includes(citation.toLowerCase().slice(0, 20))
      );

      if (!citationSupported) {
        issues.push({
          type: 'made_up_citation',
          description: `Possible made-up citation: "${citation}"`,
          severity: 'high'
        });
        riskScore += 0.25;
      }
    }
  }

  // Check for overconfident language
  const overconfidentPatterns = [
    /\b(absolutely|certainly|definitely|undoubtedly|always|never|impossible|guaranteed)\b/gi
  ];

  for (const pattern of overconfidentPatterns) {
    if (pattern.test(output)) {
      issues.push({
        type: 'overconfidence',
        description: 'Overconfident language without supporting evidence',
        severity: 'medium'
      });
      riskScore += 0.1;
      break;
    }
  }

  riskScore = Math.min(1, riskScore);
  const confidence = Math.max(0, 1 - riskScore);

  return { riskScore, issues, confidence };
}

module.exports = { detectHallucination };
