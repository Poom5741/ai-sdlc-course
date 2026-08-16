// Cloudflare Pages Function: GET /api/admin/analytics
// Returns platform analytics and metrics

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
    // Get registration trends (last 30 days)
    const registrations = await env.DB.prepare(`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count
      FROM users
      WHERE created_at >= datetime('now', '-30 days')
      GROUP BY DATE(created_at)
      ORDER BY date
    `).all();

    // Get belt distribution
    const beltDistribution = await env.DB.prepare(`
      SELECT 
        current_belt,
        COUNT(*) as count
      FROM users
      GROUP BY current_belt
    `).all();

    // Get quest completion rates
    const questCompletion = await env.DB.prepare(`
      SELECT 
        quest_id,
        COUNT(*) as attempts,
        SUM(CASE WHEN completed_at IS NOT NULL THEN 1 ELSE 0 END) as completions
      FROM quest_progress
      GROUP BY quest_id
      ORDER BY quest_id
    `).all();

    // Get total stats
    const totalUsers = await env.DB.prepare(
      "SELECT COUNT(*) as total FROM users",
    ).first();
    const totalQuests = await env.DB.prepare(
      "SELECT COUNT(DISTINCT quest_id) as total FROM quest_progress",
    ).first();
    const totalCompletions = await env.DB.prepare(
      "SELECT COUNT(*) as total FROM quest_progress WHERE completed_at IS NOT NULL",
    ).first();

    return new Response(
      JSON.stringify({
        registrations: registrations.results || [],
        beltDistribution: beltDistribution.results || [],
        questCompletion: questCompletion.results || [],
        totals: {
          users: totalUsers?.total || 0,
          quests: totalQuests?.total || 0,
          completions: totalCompletions?.total || 0,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Admin analytics error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
