// Cloudflare Pages Function: POST /api/admin/login
// Admin authentication

// Session storage (in-memory for now, use KV in production)
const sessions = new Map();

// Rate limiting: 10 attempts per hour per IP
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 }); // 1 hour
    return true;
  }
  
  if (record.count >= 10) {
    return false;
  }
  
  record.count++;
  return true;
}

// Generate session ID
function generateSessionId() {
  return 'sess_' + Math.random().toString(36).substring(2, 15);
}

export async function onRequestPost(context) {
  const { request, cf } = context;
  const ip = cf?.connectingIp || 'unknown';
  
  // Rate limiting
  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Too many attempts. Please try again later.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { env } = context;

    if (!env.ADMIN_PASSWORD) {
      return new Response(
        JSON.stringify({ success: false, error: 'Admin password not configured' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const { password } = body;

    if (!password) {
      return new Response(
        JSON.stringify({ success: false, error: 'Password is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate password from environment
    if (password !== env.ADMIN_PASSWORD) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create session
    const sessionId = generateSessionId();
    const now = new Date();
    const expires = new Date(now.getTime() + 12 * 60 * 60 * 1000); // 12 hours

    sessions.set(sessionId, {
      created: now,
      expires,
      ip
    });

    return new Response(
      JSON.stringify({
        success: true,
        sessionId,
        expires: expires.toISOString()
      }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Set-Cookie': `admin_session=${sessionId}; Path=/admin; HttpOnly; SameSite=Strict; Expires=${expires.toUTCString()}`
        } 
      }
    );

  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Helper to validate session
export function validateSession(sessionId, ip) {
  const session = sessions.get(sessionId);
  if (!session) return false;
  if (session.expires < new Date()) {
    sessions.delete(sessionId);
    return false;
  }
  return true;
}
