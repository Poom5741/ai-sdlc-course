// Cloudflare Pages Function: GET /api/progress
// Returns quest completion status for a given access code or authenticated user

// Code pattern: BBD-XXXX-XXXX
const CODE_PATTERN = /^BBD-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

// Total number of quests
const TOTAL_QUESTS = 147;

function normalizeCode(code) {
  return code.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
}

function formatCode(code) {
  const normalized = normalizeCode(code);
  if (normalized.length < 10) return normalized;
  return `BBD-${normalized.slice(3, 7)}-${normalized.slice(7, 11)}`;
}

export async function onRequestGet(context) {
  const { request, env } = context;

  try {
    const url = new URL(request.url);
    
    // Check for authenticated user first
    const authHeader = request.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      const session = await env.KV_NAMESPACE.get(`session:${token}`, { type: 'json' });
      
      if (session) {
        // Get progress from D1
        const user = await env.DB.prepare(
          'SELECT id, current_belt FROM users WHERE id = ?'
        ).bind(session.userId).first();
        
        if (user) {
          const progressResult = await env.DB.prepare(
            'SELECT quest_id, completed_at, attempts FROM quest_progress WHERE user_id = ?'
          ).bind(user.id).all();
          
          const quests = {};
          let completedCount = 0;
          
          for (const row of (progressResult?.results || [])) {
            quests[row.quest_id] = {
              completed: !!row.completed_at,
              completedAt: row.completed_at,
              attempts: row.attempts
            };
            if (row.completed_at) completedCount++;
          }
          
          return new Response(
            JSON.stringify({
              userId: user.id,
              belt: user.current_belt,
              quests,
              stats: {
                completed: completedCount,
                total: TOTAL_QUESTS
              }
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
          );
        }
      }
    }
    
    // Fall back to KV access code method
    const rawCode = url.searchParams.get('code');

    if (!rawCode) {
      return new Response(
        JSON.stringify({ error: 'code query parameter is required (or use Bearer token)' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const code = formatCode(rawCode);

    if (!CODE_PATTERN.test(code)) {
      return new Response(
        JSON.stringify({ error: 'Invalid access code format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate code exists
    const codeData = await env.KV_NAMESPACE.get(`code:${code}`, { type: 'json' });
    if (!codeData) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired access code' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get progress data
    const progressKey = `progress:${code}`;
    const progressData = await env.KV_NAMESPACE.get(progressKey, { type: 'json' }) || {
      quests: {}
    };

    // Calculate stats
    const quests = progressData.quests || {};
    const completedCount = Object.values(quests).filter(q => q.completed).length;

    return new Response(
      JSON.stringify({
        quests,
        stats: {
          completed: completedCount,
          total: TOTAL_QUESTS
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Progress error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
