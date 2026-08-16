/**
 * Solution for Guardrail Builder quest
 */

class ChatGuardrail {
  constructor(options = {}) {
    this.maxRequestsPerMinute = options.maxRequestsPerMinute || 10;
    this.blockedPatterns = options.blockedPatterns || [
      /ignore\s+(all\s+)?previous\s+instructions/i,
      /ignore\s+(all\s+)?prior\s+instructions/i,
      /you\s+are\s+now\s+\w+/i,
      /dan\s+mode/i,
      /system:\s*/i,
      /repeat\s+(your\s+)?system\s+prompt/i
    ];
    this.requestLog = new Map();
  }

  /**
   * Check rate limit using sliding window
   */
  checkRateLimit(userId) {
    const now = Date.now();
    const windowMs = 60000; // 1 minute
    
    if (!this.requestLog.has(userId)) {
      this.requestLog.set(userId, []);
    }
    
    const timestamps = this.requestLog.get(userId);
    
    // Remove old timestamps outside the window
    const validTimestamps = timestamps.filter(t => now - t < windowMs);
    this.requestLog.set(userId, validTimestamps);
    
    return validTimestamps.length < this.maxRequestsPerMinute;
  }

  /**
   * Record a request timestamp
   */
  recordRequest(userId) {
    if (!this.requestLog.has(userId)) {
      this.requestLog.set(userId, []);
    }
    this.requestLog.get(userId).push(Date.now());
  }

  /**
   * Validate and sanitize user input before sending to LLM
   */
  validateInput(userId, message) {
    // 1. Check rate limit
    if (!this.checkRateLimit(userId)) {
      return {
        allowed: false,
        sanitized: '',
        reason: 'Rate limit exceeded. Please wait before sending another message.'
      };
    }
    
    // 2. Check for injection patterns
    for (const pattern of this.blockedPatterns) {
      if (pattern.test(message)) {
        this.logSuspicious(userId, 'injection_attempt', { pattern: pattern.source });
        return {
          allowed: false,
          sanitized: '',
          reason: 'Message blocked: potential injection attempt detected.'
        };
      }
    }
    
    // 3. Sanitize input (remove potential HTML/script tags)
    const sanitized = message
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]+>/g, '')
      .trim();
    
    // 4. Record the request
    this.recordRequest(userId);
    
    return {
      allowed: true,
      sanitized,
      reason: undefined
    };
  }

  /**
   * Validate and filter LLM output before returning to user
   */
  validateOutput(output) {
    const redacted = [];
    let filtered = output;
    
    // 1. Redact emails
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = filtered.match(emailRegex) || [];
    emails.forEach(email => {
      redacted.push(`email:${email}`);
      filtered = filtered.replace(email, '[REDACTED_EMAIL]');
    });
    
    // 2. Redact phone numbers (US format)
    const phoneRegex = /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const phones = filtered.match(phoneRegex) || [];
    phones.forEach(phone => {
      redacted.push(`phone:${phone}`);
      filtered = filtered.replace(phone, '[REDACTED_PHONE]');
    });
    
    // 3. Redact API keys (common patterns)
    const apiKeyRegex = /(?:sk|pk|api)[-_][a-zA-Z0-9]{20,}/g;
    const keys = filtered.match(apiKeyRegex) || [];
    keys.forEach(key => {
      redacted.push(`apikey:${key.substring(0, 8)}...`);
      filtered = filtered.replace(key, '[REDACTED_KEY]');
    });
    
    // 4. Check for system prompt leakage
    const systemPatterns = [
      /you are a (?:helpful|unrestricted)/i,
      /your (?:system|initial) prompt/i
    ];
    
    let safe = true;
    for (const pattern of systemPatterns) {
      if (pattern.test(filtered)) {
        safe = false;
        break;
      }
    }
    
    return {
      safe,
      filtered,
      redacted
    };
  }

  /**
   * Log suspicious activity for monitoring
   */
  logSuspicious(userId, event, details) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      userId,
      event,
      details: {
        ...details,
        // Do NOT log actual message content
        messageLength: details.messageLength || undefined
      }
    };
    
    // In production, this would send to a logging service
    // For now, we just store it in memory
    if (!this.suspiciousLog) {
      this.suspiciousLog = [];
    }
    this.suspiciousLog.push(logEntry);
  }
}

module.exports = { ChatGuardrail };
