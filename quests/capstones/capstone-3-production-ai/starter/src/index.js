/**
 * Capstone 3: Production AI Application — Starter Code
 *
 * Basic scaffold with monitoring hooks. Extend with your AI feature.
 */

const http = require('http');

const PORT = process.env.PORT || 3000;

// Simple metrics collector
const metrics = {
  requests: 0,
  errors: 0,
  aiCalls: 0,
  totalTokens: 0,
};

const server = http.createServer(async (req, res) => {
  metrics.requests++;

  // Health check
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'healthy', metrics }));
    return;
  }

  // TODO: Add your AI-powered endpoints here

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Production AI App running', metrics }));
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = { server, metrics };
