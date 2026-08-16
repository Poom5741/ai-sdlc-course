// Cloudflare Pages Function: GET /api/admin/users
// Returns paginated list of users with search and filter

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

  const user = await env.DB.prepare(
    "SELECT id, email, display_name, current_belt FROM users WHERE id = ?",
  )
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
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const search = url.searchParams.get("search") || "";
    const belt = url.searchParams.get("belt") || "";

    const offset = (page - 1) * limit;

    let query =
      "SELECT id, email, display_name, current_belt, created_at FROM users";
    let countQuery = "SELECT COUNT(*) as total FROM users";
    const params = [];
    const conditions = [];

    if (search) {
      conditions.push("(email LIKE ? OR display_name LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }

    if (belt) {
      conditions.push("current_belt = ?");
      params.push(belt);
    }

    if (conditions.length > 0) {
      const whereClause = " WHERE " + conditions.join(" AND ");
      query += whereClause;
      countQuery += whereClause;
    }

    query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";

    const countResult = await env.DB.prepare(countQuery)
      .bind(...params)
      .first();
    const total = countResult?.total || 0;

    const users = await env.DB.prepare(query)
      .bind(...params, limit, offset)
      .all();

    return new Response(
      JSON.stringify({
        users: users.results || [],
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Admin users error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
