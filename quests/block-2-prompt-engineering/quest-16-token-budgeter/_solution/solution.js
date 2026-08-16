/**
 * Solution for Token Budgeter quest
 */

class TokenBudgeter {
  constructor(options = {}) {
    this.dailyLimit = options.dailyLimit || 100000;
    this.monthlyLimit = options.monthlyLimit || 2000000;
    this.alertThreshold = options.alertThreshold || 0.8;
    this.usage = new Map();
  }

  /**
   * Get today's date string
   */
  getToday() {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * Get current month string
   */
  getCurrentMonth() {
    return new Date().toISOString().slice(0, 7);
  }

  /**
   * Get or initialize user usage record
   */
  getUserUsage(userId) {
    if (!this.usage.has(userId)) {
      this.usage.set(userId, {
        daily: { date: this.getToday(), tokens: 0 },
        monthly: { month: this.getCurrentMonth(), tokens: 0 }
      });
    }
    
    const userUsage = this.usage.get(userId);
    const today = this.getToday();
    const currentMonth = this.getCurrentMonth();
    
    // Reset daily if new day
    if (userUsage.daily.date !== today) {
      userUsage.daily = { date: today, tokens: 0 };
    }
    
    // Reset monthly if new month
    if (userUsage.monthly.month !== currentMonth) {
      userUsage.monthly = { month: currentMonth, tokens: 0 };
    }
    
    return userUsage;
  }

  /**
   * Record token usage for a user
   */
  recordUsage(userId, inputTokens, outputTokens, model) {
    const totalTokens = inputTokens + outputTokens;
    const userUsage = this.getUserUsage(userId);
    const alerts = [];
    
    // Check daily limit before adding
    if (userUsage.daily.tokens + totalTokens > this.dailyLimit) {
      return {
        allowed: false,
        usage: {
          daily: userUsage.daily.tokens,
          monthly: userUsage.monthly.tokens
        },
        alerts: ['Daily token limit exceeded']
      };
    }
    
    // Check monthly limit before adding
    if (userUsage.monthly.tokens + totalTokens > this.monthlyLimit) {
      return {
        allowed: false,
        usage: {
          daily: userUsage.daily.tokens,
          monthly: userUsage.monthly.tokens
        },
        alerts: ['Monthly token limit exceeded']
      };
    }
    
    // Record usage
    userUsage.daily.tokens += totalTokens;
    userUsage.monthly.tokens += totalTokens;
    
    // Check for alerts
    const dailyPercentage = userUsage.daily.tokens / this.dailyLimit;
    const monthlyPercentage = userUsage.monthly.tokens / this.monthlyLimit;
    
    if (dailyPercentage >= this.alertThreshold) {
      alerts.push(`Daily usage at ${Math.round(dailyPercentage * 100)}%`);
    }
    
    if (monthlyPercentage >= this.alertThreshold) {
      alerts.push(`Monthly usage at ${Math.round(monthlyPercentage * 100)}%`);
    }
    
    return {
      allowed: true,
      usage: {
        daily: userUsage.daily.tokens,
        monthly: userUsage.monthly.tokens
      },
      alerts
    };
  }

  /**
   * Get current budget status for a user
   */
  getStatus(userId) {
    const userUsage = this.getUserUsage(userId);
    const dailyUsed = userUsage.daily.tokens;
    const monthlyUsed = userUsage.monthly.tokens;
    const alerts = [];
    
    const dailyPercentage = dailyUsed / this.dailyLimit;
    const monthlyPercentage = monthlyUsed / this.monthlyLimit;
    
    if (dailyPercentage >= this.alertThreshold) {
      alerts.push(`Daily usage at ${Math.round(dailyPercentage * 100)}%`);
    }
    
    if (monthlyPercentage >= this.alertThreshold) {
      alerts.push(`Monthly usage at ${Math.round(monthlyPercentage * 100)}%`);
    }
    
    return {
      daily: {
        used: dailyUsed,
        limit: this.dailyLimit,
        percentage: dailyPercentage
      },
      monthly: {
        used: monthlyUsed,
        limit: this.monthlyLimit,
        percentage: monthlyPercentage
      },
      alerts
    };
  }

  /**
   * Reset daily usage
   */
  resetDaily() {
    const today = this.getToday();
    for (const [userId, userUsage] of this.usage.entries()) {
      userUsage.daily = { date: today, tokens: 0 };
    }
  }

  /**
   * Reset monthly usage
   */
  resetMonthly() {
    const currentMonth = this.getCurrentMonth();
    for (const [userId, userUsage] of this.usage.entries()) {
      userUsage.monthly = { month: currentMonth, tokens: 0 };
    }
  }
}

module.exports = { TokenBudgeter };
