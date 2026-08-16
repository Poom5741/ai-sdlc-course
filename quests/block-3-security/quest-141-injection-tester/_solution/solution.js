/**
 * Solution for Injection Tester quest
 */

/**
 * Detects prompt injection attempts in user input
 * @param {string} message - The user message to analyze
 * @returns {{ isInjection: boolean, reason: string, confidence: number }}
 */
function detectInjection(message) {
  const lower = message.toLowerCase();
  
  // Patterns to detect (ordered by confidence)
  const patterns = [
    // High confidence patterns
    { pattern: /ignore\s+(all\s+)?previous\s+instructions/i, reason: 'Instruction override attempt', confidence: 0.95 },
    { pattern: /ignore\s+(all\s+)?prior\s+instructions/i, reason: 'Instruction override attempt', confidence: 0.95 },
    { pattern: /repeat\s+(your\s+)?system\s+prompt/i, reason: 'System prompt extraction attempt', confidence: 0.9 },
    // Debug mode should be checked before generic 'you are now' pattern
    // { pattern: /you\s+are\s+now\s+\w+/i, reason: 'Role manipulation - restrict bypass', confidence: 0.85 },
    { pattern: /dan\s+mode\s+enabled/i, reason: 'DAN jailbreak attempt', confidence: 0.95 },
    { pattern: /do\s+anything\s+now/i, reason: 'DAN jailbreak attempt', confidence: 0.9 },
    { pattern: /debug\s+mode/i, reason: 'Debug mode injection - restrict bypass', confidence: 0.85 },
    { pattern: /system:\s*/i, reason: 'Fake system instruction injection', confidence: 0.8 },
    
    // Medium confidence patterns
    { pattern: /1gnore|1nstruct|0utput/i, reason: 'Obfuscated instruction attempt', confidence: 0.8 },
    { pattern: /no\s+safety\s+filters/i, reason: 'Role manipulation - restrict bypass', confidence: 0.85 },
    { pattern: /unrestricted\s+(ai|mode)/i, reason: 'Role manipulation - restrict bypass', confidence: 0.8 },
    { pattern: /---.*end.*system.*prompt/i, reason: 'Delimiter bypass attempt', confidence: 0.75 },
    
    // Lower confidence patterns (may have false positives)
    { pattern: /now\s+follow\s+my\s+new\s+instructions/i, reason: 'Instruction override attempt', confidence: 0.7 },
    { pattern: /new\s+instructions:\s*/i, reason: 'Instruction injection attempt', confidence: 0.65 },
    { pattern: /display:\s*none.*system/i, reason: 'Hidden HTML injection attempt', confidence: 0.7 },
  ];
  
  // Check for HTML with hidden content
  if (/<div[^>]*style=["'][^"']*display\s*:\s*none/i.test(message) && 
      /system|execute|run|delete/i.test(message)) {
    return {
      isInjection: true,
      reason: 'Hidden HTML with system commands detected',
      confidence: 0.85
    };
  }
  
  // Check all patterns
  for (const { pattern, reason, confidence } of patterns) {
    if (pattern.test(message)) {
      return {
        isInjection: true,
        reason,
        confidence
      };
    }
  }
  
  // Check for multiple suspicious keywords together
  const suspiciousCount = [
    /ignore/i,
    /instructions/i,
    /system/i,
    /output/i,
    /reveal/i,
    /override/i
  ].filter(p => p.test(message)).length;
  
  if (suspiciousCount >= 3) {
    return {
      isInjection: true,
      reason: 'Multiple suspicious keywords detected',
      confidence: 0.6
    };
  }
  
  return {
    isInjection: false,
    reason: 'No injection patterns detected',
    confidence: 0.1
  };
}

module.exports = { detectInjection };
