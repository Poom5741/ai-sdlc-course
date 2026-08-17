// Cloudflare Pages Function: POST /api/admin/login
// Admin authentication

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
  return "sess_" + Math.random().toString(36).substring(2, 15);
}

export async function onRequestPost(context) {
  const { request, cf } = context;
  const ip = cf?.connectingIp || "unknown";

  // Rate limiting
  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Too many attempts. Please try again later.",
      }),
      { status: 429, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const { env } = context;

    if (!env.ADMIN_PASSWORD) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Admin password not configured",
        }),
        { status: 503, headers: { "Content-Type": "application/json" } },
      );
    }

    const body = await request.json();
    const { password } = body;

    if (!password) {
      return new Response(
        JSON.stringify({ success: false, error: "Password is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Validate password from environment
    if (password !== env.ADMIN_PASSWORD) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid password" }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    // Create session in KV (persists across worker instances)
    const sessionId = generateSessionId();
    const now = new Date();
    const expires = new Date(now.getTime() + 12 * 60 * 60 * 1000); // 12 hours

    await env.KV_NAMESPACE.put(
      `admin:session:${sessionId}`,
      JSON.stringify({
        created: now.toISOString(),
        expires: expires.toISOString(),
        ip,
      }),
      { expirationTtl: 12 * 60 * 60 },
    ); // Auto-expire after 12 hours

    return new Response(
      JSON.stringify({
        success: true,
        sessionId,
        expires: expires.toISOString(),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

// Helper to validate session from KV
export async function validateSession(env, sessionId) {
  if (!sessionId) return false;
  const data = await env.KV_NAMESPACE.get(`admin:session:${sessionId}`, {
    type: "json",
  });
  if (!data) return false;
  if (new Date(data.expires) < new Date()) {
    await env.KV_NAMESPACE.delete(`admin:session:${sessionId}`);
    return false;
  }
  return true;
}
