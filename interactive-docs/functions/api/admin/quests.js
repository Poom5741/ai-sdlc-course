// Cloudflare Pages Function: GET /api/admin/quests
// Returns quest list with completion statistics

function getAuthToken(request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.slice(7);
}

async function verifyAdmin(token, env) {
  const session = await env.KV_NAMESPACE.get(`session:${token}`, {
    type: "json",
  });
  if (!session) {
    return null;
  }

  const user = await env.DB.prepare("SELECT id, email FROM users WHERE id = ?")
    .bind(session.userId)
    .first();

  if (!user || user.email !== "admin@bluebeltdojo.ai") {
    return null;
  }

  return user;
}

export async function onRequestGet(context) {
  const { request, env } = context;

  // Verify admin authentication
  const token = getAuthToken(request);
  if (!token) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const admin = await verifyAdmin(token, env);
  if (!admin) {
    return new Response(JSON.stringify({ error: "Admin access required" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Get quest completion statistics
    const stats = await env.DB.prepare(`
      SELECT 
        quest_id,
        COUNT(*) as total_attempts,
        COUNT(DISTINCT user_id) as unique_users,
        SUM(CASE WHEN completed_at IS NOT NULL THEN 1 ELSE 0 END) as completions
      FROM quest_progress
      GROUP BY quest_id
      ORDER BY quest_id
    `).all();

    // Get total users
    const userCount = await env.DB.prepare(
      "SELECT COUNT(*) as total FROM users",
    ).first();

    return new Response(
      JSON.stringify({
        quests: stats.results || [],
        totalUsers: userCount?.total || 0,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Admin quests error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
