// Cloudflare Pages Function: POST /api/certificates/generate, GET /api/certificates
// Generates and lists certificates

// Generate unique ID
function generateId() {
  return 'cert_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
}

// Generate verification token
function generateToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(24)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Belt requirements for validation
const BELT_REQUIREMENTS = {
  blue: { questsNeeded: 25, capstone: 'capstone-1-api-service' },
  purple: { questsNeeded: 60, capstone: 'capstone-2-multi-agent' },
  brown: { questsNeeded: 100, capstone: 'capstone-3-production-ai' },
  black: { questsNeeded: 147, capstone: null }
};

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

    // Get user
    const user = await env.DB.prepare(
      'SELECT id, display_name, current_belt FROM users WHERE id = ?'
    ).bind(session.userId).first();

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Count completed quests
    const progressResult = await env.DB.prepare(
      'SELECT COUNT(*) as completed FROM quest_progress WHERE user_id = ? AND completed_at IS NOT NULL'
    ).bind(user.id).first();
    const completedQuests = progressResult?.completed || 0;

    // Check approved capstones
    const capstoneResult = await env.DB.prepare(
      'SELECT capstone_id FROM capstone_submissions WHERE user_id = ? AND status = ?'
    ).bind(user.id, 'approved').all();
    const approvedCapstones = (capstoneResult?.results || []).map(r => r.capstone_id);

    // Determine which belt the user qualifies for
    let qualifiedBelt = null;
    for (const [belt, req] of Object.entries(BELT_REQUIREMENTS)) {
      if (completedQuests >= req.questsNeeded) {
        if (!req.capstone || approvedCapstones.includes(req.capstone)) {
          qualifiedBelt = belt;
        }
      }
    }

    if (!qualifiedBelt || qualifiedBelt === 'white') {
      return new Response(
        JSON.stringify({ error: 'You have not yet earned a belt certificate' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if user already has this belt certificate
    const existingCert = await env.DB.prepare(
      'SELECT id FROM certificates WHERE user_id = ? AND belt = ?'
    ).bind(user.id, qualifiedBelt).first();

    if (existingCert) {
      return new Response(
        JSON.stringify({ 
          certificateId: existingCert.id,
          message: 'Certificate already exists for this belt'
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create certificate
    const certId = generateId();
    const verificationToken = generateToken();
    
    // Collect skills from completed quests (simplified)
    const skills = [
      'AI-Assisted Development',
      'Prompt Engineering', 
      'Code Review',
      'Security Best Practices',
      'Testing with AI',
      'Agentic Workflows'
    ].slice(0, Math.min(6, Math.ceil(completedQuests / 20)));

    await env.DB.prepare(
      `INSERT INTO certificates (id, user_id, belt, verification_token, skills)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(
      certId,
      user.id,
      qualifiedBelt,
      verificationToken,
      JSON.stringify(skills)
    ).run();

    return new Response(
      JSON.stringify({
        certificateId: certId,
        verificationToken,
        belt: qualifiedBelt,
        displayName: user.display_name,
        completedQuests,
        skills
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Certificate generation error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

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

    // Get user's certificates
    const certs = await env.DB.prepare(
      'SELECT id, belt, issued_at, verification_token, skills FROM certificates WHERE user_id = ? ORDER BY issued_at DESC'
    ).bind(session.userId).all();

    return new Response(
      JSON.stringify({
        certificates: (certs?.results || []).map(c => ({
          id: c.id,
          belt: c.belt,
          issuedAt: c.issued_at,
          verificationToken: c.verification_token,
          skills: JSON.parse(c.skills || '[]'),
          verifyUrl: `/verify/${c.verification_token}`
        }))
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Certificate list error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
