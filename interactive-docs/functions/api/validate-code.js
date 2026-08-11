// Cloudflare Pages Function: POST /api/validate-code
// Validates access codes against KV storage

// Code pattern: BBD-XXXX-XXXX (X = alphanumeric uppercase)
const CODE_PATTERN = /^BBD-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

// Normalize code input (remove hyphens, uppercase)
function normalizeCode(code) {
  return code.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
}

// Format as BBD-XXXX-XXXX
function formatCode(code) {
  const normalized = normalizeCode(code);
  if (normalized.length < 10) return normalized;
  return `BBD-${normalized.slice(3, 7)}-${normalized.slice(7, 11)}`;
}

// Rate limiting: 5 attempts per minute per IP
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 });
    return true;
  }
  
  if (record.count >= 5) {
    return false;
  }
  
  record.count++;
  return true;
}

export async function onRequestPost(context) {
  const { request, env, cf } = context;
  const ip = cf?.connectingIp || 'unknown';
  
  // Rate limiting
  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ valid: false, error: 'Too many attempts. Please try again later.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Code is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Normalize and validate format
    const normalizedCode = formatCode(code);
    
    if (!CODE_PATTERN.test(normalizedCode)) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Invalid code format. Expected: BBD-XXXX-XXXX' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check KV for code
    const codeData = await env.KV_NAMESPACE.get(`code:${normalizedCode}`, { type: 'json' });

    if (!codeData) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Invalid or expired code' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if code has expired
    if (codeData.expires && new Date(codeData.expires) < new Date()) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Code has expired' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Mark code as used
    if (!codeData.used) {
      codeData.used = true;
      codeData.usedAt = new Date().toISOString();
      await env.KV_NAMESPACE.put(`code:${normalizedCode}`, JSON.stringify(codeData));
    }

    // Update usage stats
    const statsKey = `stats:${normalizedCode}`;
    const stats = await env.KV_NAMESPACE.get(statsKey, { type: 'json' }) || {
      code: normalizedCode,
      accessCount: 0,
      pagesVisited: []
    };
    stats.lastAccess = new Date().toISOString();
    stats.accessCount++;
    if (!stats.firstAccess) {
      stats.firstAccess = stats.lastAccess;
    }
    await env.KV_NAMESPACE.put(statsKey, JSON.stringify(stats));

    return new Response(
      JSON.stringify({
        valid: true,
        code: normalizedCode,
        expires: codeData.expires,
        plan: codeData.plan
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Validation error:', error);
    return new Response(
      JSON.stringify({ valid: false, error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
