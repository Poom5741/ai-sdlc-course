// Cloudflare Pages Function: POST /api/capstones/submit
// Submits a capstone project for review

// Generate unique submission ID
function generateSubmissionId() {
  return 'cap_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
}

// Valid capstone IDs
const VALID_CAPSTONES = ['capstone-1-api-service', 'capstone-2-multi-agent', 'capstone-3-production-ai'];

export async function onRequestPost(context) {
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

    const body = await request.json();
    const { capstoneId, repoUrl, deployedUrl } = body;

    // Validate inputs
    if (!capstoneId || !VALID_CAPSTONES.includes(capstoneId)) {
      return new Response(
        JSON.stringify({ error: 'Invalid capstone ID' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!repoUrl) {
      return new Response(
        JSON.stringify({ error: 'Repository URL is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check for existing pending submission
    const existing = await env.DB.prepare(
      'SELECT id FROM capstone_submissions WHERE user_id = ? AND capstone_id = ? AND status = ?'
    ).bind(session.userId, capstoneId, 'submitted').first();

    if (existing) {
      // Update existing submission
      await env.DB.prepare(
        `UPDATE capstone_submissions 
         SET repo_url = ?, deployed_url = ?, submitted_at = datetime('now')
         WHERE id = ?`
      ).bind(repoUrl, deployedUrl || null, existing.id).run();

      return new Response(
        JSON.stringify({
          submissionId: existing.id,
          status: 'submitted',
          message: 'Submission updated'
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create new submission
    const submissionId = generateSubmissionId();
    await env.DB.prepare(
      `INSERT INTO capstone_submissions (id, user_id, capstone_id, repo_url, deployed_url, status)
       VALUES (?, ?, ?, ?, ?, 'submitted')`
    ).bind(submissionId, session.userId, capstoneId, repoUrl, deployedUrl || null).run();

    return new Response(
      JSON.stringify({
        submissionId,
        status: 'submitted'
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Capstone submit error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
