// Cloudflare Pages Function: GET /api/health
// Health check endpoint for monitoring

export async function onRequestGet(context) {
  const { env } = context;

  // Check D1 database connectivity
  let dbStatus = "ok";
  try {
    await env.DB.prepare("SELECT 1").first();
  } catch (e) {
    dbStatus = "error: " + e.message;
  }

  // Check KV connectivity
  let kvStatus = "ok";
  try {
    await env.KV_NAMESPACE.get("health-check");
  } catch (e) {
    kvStatus = "error: " + e.message;
  }

  const status =
    dbStatus === "ok" && kvStatus === "ok" ? "healthy" : "degraded";

  return new Response(
    JSON.stringify({
      status,
      timestamp: new Date().toISOString(),
      services: {
        database: dbStatus,
        kv: kvStatus,
      },
    }),
    {
      status: status === "healthy" ? 200 : 503,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    },
  );
}
