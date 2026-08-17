// Cloudflare Pages Function: POST /api/auth/login
// Authenticates a user and returns a session token

// Rate limiting: 10 attempts per IP per minute
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 });
    return true;
  }
  
  if (record.count >= 10) {
    return false;
  }
  
  record.count++;
  return true;
}

// Verify password using PBKDF2
async function verifyPassword(password, storedHash) {
  const [saltHex, hashHex] = storedHash.split(':');
  
  // Convert hex salt to Uint8Array
  const saltBytes = new Uint8Array(saltHex.match(/.{2}/g).map(b => parseInt(b, 16)));
  
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
      salt: saltBytes,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    256
  );
  
  const computedHash = Array.from(new Uint8Array(bits)).map(b => b.toString(16).padStart(2, '0')).join('');
  return computedHash === hashHex;
}

// Generate random hex token
function generateToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function onRequestPost(context) {
  const { request, env, cf } = context;
  const ip = cf?.connectingIp || 'unknown';
  
  // Rate limiting
  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ error: 'Too many login attempts. Please try again later.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Find user by email
    const user = await env.DB.prepare(
      'SELECT id, email, password_hash, display_name, current_belt, role FROM users WHERE email = ?'
    ).bind(email.toLowerCase().trim()).first();

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Invalid email or password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify password
    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return new Response(
        JSON.stringify({ error: 'Invalid email or password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate session token
    const token = generateToken();
    const sessionData = {
      userId: user.id,
      email: user.email,
      createdAt: new Date().toISOString()
    };

    // Store session in KV (expires in 30 days)
    await env.KV_NAMESPACE.put(`session:${token}`, JSON.stringify(sessionData), {
      expirationTtl: 60 * 60 * 24 * 30
    });

    return new Response(
      JSON.stringify({
        token,
        userId: user.id,
        email: user.email,
        displayName: user.display_name,
        belt: user.current_belt,
        role: user.role || 'user'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
