// Cloudflare Pages Function: GET /api/admin/stats
// Returns aggregate quest completion stats
// Protected by admin session auth

// Validate session from cookie
function getSessionFromCookie(request) {
  const cookies = request.headers.get('cookie') || '';
  const sessionMatch = cookies.match(/admin_session=([^;]+)/);
  return sessionMatch?.[1];
}

// In-memory session store (same as login.js)
const sessions = new Map();

function validateSession(sessionId) {
  const session = sessions.get(sessionId);
  if (!session) return false;
  if (session.expires < new Date()) {
    sessions.delete(sessionId);
    return false;
  }
  return true;
}

export async function onRequestGet(context) {
  const { request, env } = context;

  // Check authentication
  const sessionId = getSessionFromCookie(request);
  if (!sessionId || !validateSession(sessionId)) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Scan all progress keys
    const progressList = await env.KV_NAMESPACE.list({ prefix: 'progress:' });
    const progressKeys = progressList.keys || [];

    // Scan all submission keys
    const submissionList = await env.KV_NAMESPACE.list({ prefix: 'submission:' });
    const submissionKeys = submissionList.keys || [];

    // Build stats per quest
    const questStats = {};

    // Process submissions
    for (const key of submissionKeys) {
      const submission = await env.KV_NAMESPACE.get(key.name, { type: 'json' });
      if (!submission || !submission.questId) continue;

      const questId = submission.questId;
      if (!questStats[questId]) {
        questStats[questId] = {
          completions: 0,
          totalSubmissions: 0,
          uniqueCodes: new Set()
        };
      }

      questStats[questId].totalSubmissions++;
      questStats[questId].uniqueCodes.add(submission.code);

      if (submission.passed) {
        questStats[questId].completions++;
      }
    }

    // Convert Sets to counts for JSON serialization
    const result = {};
    for (const [questId, stats] of Object.entries(questStats)) {
      result[questId] = {
        completions: stats.completions,
        totalSubmissions: stats.totalSubmissions,
        uniqueLearners: stats.uniqueCodes.size
      };
    }

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Stats error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
