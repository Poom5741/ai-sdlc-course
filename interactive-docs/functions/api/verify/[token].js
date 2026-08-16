// Cloudflare Pages Function: GET /api/verify/:token
// Public certificate verification endpoint

export async function onRequestGet(context) {
  const { params, env } = context;
  const { token } = params;

  try {
    if (!token) {
      return new Response(
        JSON.stringify({ error: 'Verification token is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Look up certificate by verification token
    const cert = await env.DB.prepare(
      `SELECT c.id, c.belt, c.issued_at, c.verification_token, c.skills,
              u.display_name
       FROM certificates c
       JOIN users u ON c.user_id = u.id
       WHERE c.verification_token = ?`
    ).bind(token).first();

    if (!cert) {
      return new Response(
        JSON.stringify({ error: 'Certificate not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Count completed quests for context
    const user = await env.DB.prepare(
      'SELECT id FROM users WHERE display_name = ?'
    ).bind(cert.display_name).first();

    let completedQuests = 0;
    if (user) {
      const progressResult = await env.DB.prepare(
        'SELECT COUNT(*) as completed FROM quest_progress WHERE user_id = ? AND completed_at IS NOT NULL'
      ).bind(user.id).first();
      completedQuests = progressResult?.completed || 0;
    }

    return new Response(
      JSON.stringify({
        certificateId: cert.id,
        displayName: cert.display_name,
        belt: cert.belt,
        issuedAt: cert.issued_at,
        completedQuests,
        skills: JSON.parse(cert.skills || '[]'),
        verificationToken: cert.verification_token,
        verified: true
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Verify error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
