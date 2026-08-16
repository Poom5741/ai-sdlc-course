/**
 * Quest 4.5: Prompt Injection Defender — REFERENCE solution (do NOT import or read during the exercise)
 */

function detectInjection(userInput) {
  if (!userInput) return { safe: true, detections: [] };

  const detections = [];
  const lower = userInput.toLowerCase();

  // Role override patterns
  const rolePatterns = [
    /you are now/i, /act as/i, /pretend to be/i, /your new role/i,
    /role changes? to/i, /from now on you/i, /forget (?:your|all) (?:previous|prior)/i,
  ];
  for (const p of rolePatterns) {
    if (p.test(userInput)) {
      detections.push({ type: 'role_override', confidence: 0.8, evidence: userInput.match(p)[0] });
      break;
    }
  }

  // Ignore previous instructions
  if (/ignore\s+(?:all\s+)?previous\s+instructions/i.test(userInput)) {
    detections.push({ type: 'role_override', confidence: 0.95, evidence: 'ignore previous instructions' });
  }

  // Extraction attempts
  const extractPatterns = [
    /repeat (?:your|the) (?:system )?prompt/i,
    /show (?:me )?(?:your|the) (?:system )?prompt/i,
    /what (?:were|are) you (?:told|instructed)/i,
    /reveal (?:your|the) instructions/i,
    /print (?:your|the) (?:system )?prompt/i,
  ];
  for (const p of extractPatterns) {
    if (p.test(userInput)) {
      detections.push({ type: 'extraction', confidence: 0.9, evidence: userInput.match(p)[0] });
      break;
    }
  }

  // Delimiter breaks
  if (/^```/m.test(userInput) || /---\s*(?:NEW|SYSTEM|IGNORE)/im.test(userInput) ||
      /={3,}\s*(?:NEW|SYSTEM)/im.test(userInput)) {
    detections.push({ type: 'delimiter_break', confidence: 0.85, evidence: 'delimiter pattern found' });
  }

  // Base64-encoded suspicious content
  const b64Match = userInput.match(/(?:decode|eval|exec)\s*(?:this|the following)?:?\s*([A-Za-z0-9+/=]{20,})/i);
  if (b64Match) {
    try {
      const decoded = Buffer.from(b64Match[1], 'base64').toString('utf-8').toLowerCase();
      if (/ignore|previous|instructions|prompt|system|reveal|override/.test(decoded)) {
        detections.push({ type: 'encoded_injection', confidence: 0.75, evidence: `decoded: ${decoded.slice(0, 50)}` });
      }
    } catch {}
  }

  // Instruction smuggling — long text with imperative verbs embedded
  const imperativeCount = (userInput.match(/\b(you must|you should|do not|never|always|required to)\b/gi) || []).length;
  if (imperativeCount >= 3 && userInput.length > 100) {
    detections.push({ type: 'instruction_smuggling', confidence: 0.6, evidence: `${imperativeCount} imperative phrases` });
  }

  const safe = detections.length === 0;
  return { safe, detections };
}

module.exports = { detectInjection };
