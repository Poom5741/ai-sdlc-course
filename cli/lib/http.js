// HTTP utilities using Node.js built-in https/http modules
'use strict';

const https = require('https');
const http = require('http');
const { URL } = require('url');

/**
 * Make an HTTP(S) request
 * @param {string} url - The URL to request
 * @param {object} options - Request options
 * @param {string} options.method - HTTP method (GET, POST, etc.)
 * @param {object} options.headers - Request headers
 * @param {string|object} options.body - Request body (will be JSON.stringify'd if object)
 * @returns {Promise<{status: number, headers: object, data: any}>}
 */
function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const isHttps = parsedUrl.protocol === 'https:';
    const client = isHttps ? https : http;

    const method = options.method || 'GET';
    const headers = options.headers || {};

    let body = options.body;
    if (body && typeof body === 'object') {
      body = JSON.stringify(body);
      if (!headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
      }
    }

    if (body && !headers['Content-Length']) {
      headers['Content-Length'] = Buffer.byteLength(body);
    }

    const reqOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (isHttps ? 443 : 80),
      path: parsedUrl.pathname + parsedUrl.search,
      method,
      headers
    };

    const req = client.request(reqOptions, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const rawBody = Buffer.concat(chunks).toString();
        let data;
        try {
          data = JSON.parse(rawBody);
        } catch {
          data = rawBody;
        }

        resolve({
          status: res.statusCode,
          headers: res.headers,
          data
        });
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(body);
    }

    req.end();
  });
}

/**
 * GET request helper
 */
function get(url, headers = {}) {
  return request(url, { method: 'GET', headers });
}

/**
 * POST request helper
 */
function post(url, body, headers = {}) {
  return request(url, { method: 'POST', headers, body });
}

module.exports = {
  request,
  get,
  post
};
