// Cloudflare Pages Function: GET /api/auth/me
// Returns the current user's profile from session token

export async function onRequestGet(context) {
  const { request, env } = context;

  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Not authenticated' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.slice(7);

    // Look up session in KV
    const session = await env.KV_NAMESPACE.get(`session:${token}`, { type: 'json' });
    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired session' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get user profile from D1
    const user = await env.DB.prepare(
      'SELECT id, email, display_name, current_belt, created_at FROM users WHERE id = ?'
    ).bind(session.userId).first();

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        userId: user.id,
        email: user.email,
        displayName: user.display_name,
        belt: user.current_belt,
        createdAt: user.created_at
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Me error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
