/**
 * Quest 18.3: Framework Migration — REFERENCE solution
 */

function expressToFastify(code) {
  if (!code) return '';

  let result = code;

  // app.METHOD → fastify.METHOD
  result = result.replace(/\bapp\.(get|post|put|delete|patch)\(/g, 'fastify.$1(');

  // req.body → request.body
  result = result.replace(/\breq\.body\b/g, 'request.body');

  // req.params → request.params
  result = result.replace(/\breq\.params\b/g, 'request.params');

  // req.query → request.query
  result = result.replace(/\breq\.query\b/g, 'request.query');

  // res.status(N).send() → reply.code(N).send()
  result = result.replace(/res\.status\((\d+)\)\.send\(/g, 'reply.code($1).send(');

  // res.send() → reply.send()
  result = result.replace(/res\.send\(/g, 'reply.send(');

  // res.json() → reply.send()
  result = result.replace(/res\.json\(/g, 'reply.send(');

  // Handler params: (req, res) → (request, reply)
  result = result.replace(/\(req,\s*res\)/g, '(request, reply)');
  result = result.replace(/\(req\)/g, '(request)');
  result = result.replace(/,\s*res\)/g, ', reply)');

  return result;
}

module.exports = { expressToFastify };
