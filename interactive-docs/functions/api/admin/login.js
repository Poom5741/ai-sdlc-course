// Cloudflare Pages Function: POST /api/admin/login
// Admin authentication - stateless token-based

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

// Generate a simple stateless token: base64(timestamp:hmac)
async function generateToken(env, ip) {
  const timestamp = Date.now();
  const expires = timestamp + 12 * 60 * 60 * 1000; // 12 hours
  const payload = `${timestamp}:${expires}:${ip}`;

  // Create HMAC signature
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(env.ADMIN_PASSWORD),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  const sigHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return btoa(`${payload}:${sigHex}`).replace(/=/g, "");
}

// Validate token (stateless)
export async function validateAdminToken(env, token) {
  try {
    const decoded = atob(token + "==");
    const parts = decoded.split(":");
    if (parts.length !== 4) return false;

    const [timestamp, expires, tokenIp, sigHex] = parts;

    // Check expiry
    if (Date.now() > parseInt(expires)) return false;

    // Verify HMAC
    const payload = `${timestamp}:${expires}:${tokenIp}`;
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(env.ADMIN_PASSWORD),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );
    const sigBytes = new Uint8Array(
      sigHex.match(/.{2}/g).map((b) => parseInt(b, 16)),
    );
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      new TextEncoder().encode(payload),
    );

    return valid;
  } catch {
    return false;
  }
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

    // Create stateless token (no KV needed)
    const token = await generateToken(env, ip);
    const expires = new Date(Date.now() + 12 * 60 * 60 * 1000);

    return new Response(
      JSON.stringify({
        success: true,
        sessionId: token,
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
