/**
 * Capstone 1: API Service — Starter Code
 *
 * This is a basic scaffold. You may modify or replace this entirely.
 * The goal is to build a complete REST API with AI assistance.
 */

const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'API is running', status: 'ok' }));
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = { server };
