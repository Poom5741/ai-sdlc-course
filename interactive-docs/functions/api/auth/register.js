// Cloudflare Pages Function: POST /api/auth/register
// Registers a new user account

// Rate limiting: 5 registrations per IP per hour
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 });
    return true;
  }
  
  if (record.count >= 5) {
    return false;
  }
  
  record.count++;
  return true;
}

// Hash password using PBKDF2 with Web Crypto API
async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    256
  );
  
  return {
    hash: Array.from(new Uint8Array(bits)).map(b => b.toString(16).padStart(2, '0')).join(''),
    salt: Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('')
  };
}

// Validate email format
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Generate unique user ID
function generateUserId() {
  return 'usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
}

export async function onRequestPost(context) {
  const { request, env, cf } = context;
  const ip = cf?.connectingIp || 'unknown';
  
  // Rate limiting
  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ error: 'Too many registration attempts. Please try again later.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await request.json();
    const { email, password, displayName } = body;

    // Validate inputs
    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: 'Valid email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!password || password.length < 8) {
      return new Response(
        JSON.stringify({ error: 'Password must be at least 8 characters' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!displayName || displayName.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Display name is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if email already exists
    const existingUser = await env.DB.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(email.toLowerCase().trim()).first();

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'Email already registered' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Hash password
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const { hash, salt: saltHex } = await hashPassword(password, salt);
    const passwordHash = `${saltHex}:${hash}`;

    // Create user
    const userId = generateUserId();
    await env.DB.prepare(
      `INSERT INTO users (id, email, password_hash, display_name, current_belt)
       VALUES (?, ?, ?, ?, 'white')`
    ).bind(
      userId,
      email.toLowerCase().trim(),
      passwordHash,
      displayName.trim()
    ).run();

    return new Response(
      JSON.stringify({
        userId,
        email: email.toLowerCase().trim(),
        belt: 'white'
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Register error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
