// Cloudflare Pages Function: GET /api/capstones
// Lists user's capstone submissions

export async function onRequestGet(context) {
  const { request, env } = context;

  try {
    // Require authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.slice(7);
    const session = await env.KV_NAMESPACE.get(`session:${token}`, { type: 'json' });
    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Invalid session' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get user's submissions
    const submissions = await env.DB.prepare(
      `SELECT id, capstone_id, repo_url, deployed_url, status, 
              submitted_at, graded_at, score, feedback
       FROM capstone_submissions 
       WHERE user_id = ?
       ORDER BY submitted_at DESC`
    ).bind(session.userId).all();

    return new Response(
      JSON.stringify({
        submissions: (submissions?.results || []).map(s => ({
          id: s.id,
          capstoneId: s.capstone_id,
          repoUrl: s.repo_url,
          deployedUrl: s.deployed_url,
          status: s.status,
          submittedAt: s.submitted_at,
          gradedAt: s.graded_at,
          score: s.score,
          feedback: s.feedback
        }))
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Capstone list error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
