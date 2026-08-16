/**
 * Solution for Monitoring Dashboard quest
 */

/**
 * Creates a monitoring dashboard configuration
 * @param {object} config - Dashboard configuration
 * @param {string} config.appName - Application name
 * @param {string[]} config.models - LLM models used
 * @param {number} config.budget - Monthly budget in USD
 * @returns {{ metrics: object[], alerts: object[], widgets: object[] }}
 */
function createDashboard(config) {
  const { appName, models, budget } = config;
  
  const metrics = [
    {
      name: 'Latency',
      description: 'Response time in milliseconds',
      type: 'histogram',
      unit: 'ms',
      aggregation: 'p95',
      tags: ['model', 'endpoint']
    },
    {
      name: 'Cost',
      description: 'API cost in USD',
      type: 'counter',
      unit: 'usd',
      aggregation: 'sum',
      tags: ['model', 'user']
    },
    {
      name: 'Token Usage',
      description: 'Tokens consumed per request',
      type: 'counter',
      unit: 'tokens',
      aggregation: 'sum',
      tags: ['model', 'type']
    },
    {
      name: 'Error Rate',
      description: 'Percentage of failed requests',
      type: 'gauge',
      unit: 'percent',
      aggregation: 'avg',
      tags: ['model', 'error_type']
    },
    {
      name: 'Request Count',
      description: 'Total requests',
      type: 'counter',
      unit: 'count',
      aggregation: 'sum',
      tags: ['model', 'endpoint']
    }
  ];
  
  const alerts = [
    {
      name: 'High Latency Alert',
      description: 'Triggers when p95 latency exceeds threshold',
      metric: 'Latency',
      threshold: 5000,
      operator: '>',
      severity: 'warning',
      actions: ['notify_team', 'log_incident']
    },
    {
      name: 'Budget Alert',
      description: 'Triggers when cost approaches budget limit',
      metric: 'Cost',
      threshold: budget * 0.8,
      operator: '>',
      severity: 'critical',
      actions: ['notify_team', 'throttle_requests']
    },
    {
      name: 'Budget Exceeded Alert',
      description: 'Triggers when budget is exceeded',
      metric: 'Cost',
      threshold: budget,
      operator: '>',
      severity: 'critical',
      actions: ['notify_team', 'block_requests', 'page_oncall']
    },
    {
      name: 'Error Rate Alert',
      description: 'Triggers when error rate is too high',
      metric: 'Error Rate',
      threshold: 5,
      operator: '>',
      severity: 'warning',
      actions: ['notify_team']
    },
    {
      name: 'High Error Rate Alert',
      description: 'Triggers when error rate is critical',
      metric: 'Error Rate',
      threshold: 15,
      operator: '>',
      severity: 'critical',
      actions: ['notify_team', 'page_oncall']
    }
  ];
  
  const widgets = [
    {
      type: 'timeseries',
      title: 'Request Latency (p95)',
      metric: 'Latency',
      timeRange: '24h',
      aggregation: 'p95'
    },
    {
      type: 'timeseries',
      title: 'Cost Over Time',
      metric: 'Cost',
      timeRange: '30d',
      aggregation: 'sum'
    },
    {
      type: 'stat',
      title: 'Total Cost (MTD)',
      metric: 'Cost',
      timeRange: '30d',
      aggregation: 'sum'
    },
    {
      type: 'timeseries',
      title: 'Token Usage by Model',
      metric: 'Token Usage',
      timeRange: '7d',
      aggregation: 'sum',
      groupBy: 'model'
    },
    {
      type: 'gauge',
      title: 'Error Rate',
      metric: 'Error Rate',
      timeRange: '1h',
      aggregation: 'avg'
    },
    {
      type: 'table',
      title: 'Top Expensive Requests',
      metric: 'Cost',
      timeRange: '24h',
      aggregation: 'top',
      limit: 10
    }
  ];
  
  return {
    metrics,
    alerts,
    widgets
  };
}

module.exports = { createDashboard };
