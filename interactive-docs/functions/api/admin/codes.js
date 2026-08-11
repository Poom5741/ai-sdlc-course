// Cloudflare Pages Function: /api/admin/codes
// CRUD operations for access codes

// Code pattern: BBD-XXXX-XXXX
const CODE_PATTERN = /^BBD-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

// Generate random code
function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No ambiguous chars
  const segment = () => {
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  return `BBD-${segment()}-${segment()}`;
}

// Check if code exists
async function codeExists(env, code) {
  const data = await env.KV_NAMESPACE.get(`code:${code}`, { type: 'json' });
  return data !== null;
}

// Generate unique code
async function generateUniqueCode(env) {
  let code = generateCode();
  let attempts = 0;
  while (await codeExists(env, code) && attempts < 100) {
    code = generateCode();
    attempts++;
  }
  return code;
}

// Validate session from cookie
function getSessionFromCookie(request) {
  const cookies = request.headers.get('cookie') || '';
  const sessionMatch = cookies.match(/admin_session=([^;]+)/);
  return sessionMatch?.[1];
}

export async function onRequestGet(context) {
  const { request, env } = context;
  
  // Check authentication
  const sessionId = getSessionFromCookie(request);
  if (!sessionId) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status') || 'all';
    const plan = url.searchParams.get('plan');
    const batch = url.searchParams.get('batch');
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '50');

    // List all code keys
    const listResult = await env.KV_NAMESPACE.list({ prefix: 'code:' });
    const keys = listResult.keys || [];
    
    // Fetch all codes
    const allCodes = [];
    for (const key of keys) {
      const codeData = await env.KV_NAMESPACE.get(key.name, { type: 'json' });
      if (codeData) {
        allCodes.push(codeData);
      }
    }

    // Filter by status
    let filteredCodes = allCodes;
    if (status === 'used') {
      filteredCodes = allCodes.filter(c => c.used);
    } else if (status === 'unused') {
      filteredCodes = allCodes.filter(c => !c.used);
    } else if (status === 'expired') {
      filteredCodes = allCodes.filter(c => c.expires && new Date(c.expires) < new Date());
    }

    // Filter by plan
    if (plan) {
      filteredCodes = filteredCodes.filter(c => c.plan === plan);
    }

    // Filter by batch
    if (batch) {
      filteredCodes = filteredCodes.filter(c => c.metadata?.batch === batch);
    }

    // Sort by created date (newest first)
    filteredCodes.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

    // Pagination
    const total = filteredCodes.length;
    const start = (page - 1) * limit;
    const paginatedCodes = filteredCodes.slice(start, start + limit);

    return new Response(
      JSON.stringify({
        codes: paginatedCodes,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('List codes error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  
  // Check authentication
  const sessionId = getSessionFromCookie(request);
  if (!sessionId) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await request.json();
    const { 
      count = 1, 
      plan = 'workshop-2024',
      expires = '2025-12-31T23:59:59Z',
      batch,
      metadata = {}
    } = body;

    // Validate count
    if (count < 1 || count > 100) {
      return new Response(
        JSON.stringify({ error: 'Count must be between 1 and 100' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const created = [];

    for (let i = 0; i < count; i++) {
      const code = await generateUniqueCode(env);
      
      const codeData = {
        code,
        created: new Date().toISOString(),
        createdBy: 'admin',
        used: false,
        usedAt: null,
        expires,
        plan,
        metadata: {
          ...metadata,
          batch: batch || `batch-${new Date().toISOString().split('T')[0]}`
        }
      };

      await env.KV_NAMESPACE.put(`code:${code}`, JSON.stringify(codeData));
      created.push(code);
    }

    return new Response(
      JSON.stringify({
        created,
        count: created.length
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Create codes error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function onRequestDelete(context) {
  const { request, env } = context;
  
  // Check authentication
  const sessionId = getSessionFromCookie(request);
  if (!sessionId) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return new Response(
        JSON.stringify({ error: 'Code parameter is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Normalize code
    const normalizedCode = code.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    const formattedCode = `BBD-${normalizedCode.slice(3, 7)}-${normalizedCode.slice(7, 11)}`;

    if (!CODE_PATTERN.test(formattedCode)) {
      return new Response(
        JSON.stringify({ error: 'Invalid code format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const codeData = await env.KV_NAMESPACE.get(`code:${formattedCode}`, { type: 'json' });

    if (!codeData) {
      return new Response(
        JSON.stringify({ error: 'Code not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Mark as revoked instead of deleting
    codeData.revoked = true;
    codeData.revokedAt = new Date().toISOString();
    await env.KV_NAMESPACE.put(`code:${formattedCode}`, JSON.stringify(codeData));

    return new Response(
      JSON.stringify({
        success: true,
        code: formattedCode,
        revoked: codeData.revokedAt
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Revoke code error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
