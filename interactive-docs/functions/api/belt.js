// Cloudflare Pages Function: GET /api/belt
// Returns current belt and requirements for the next belt

// Belt requirements: quests completed needed + capstone
const BELT_REQUIREMENTS = {
  white: { next: 'blue', questsNeeded: 25, capstone: 'capstone-1-api-service', label: 'White Belt' },
  blue: { next: 'purple', questsNeeded: 60, capstone: 'capstone-2-multi-agent', label: 'Blue Belt' },
  purple: { next: 'brown', questsNeeded: 100, capstone: 'capstone-3-production-ai', label: 'Purple Belt' },
  brown: { next: 'black', questsNeeded: 147, capstone: null, label: 'Brown Belt' },
  black: { next: null, questsNeeded: 147, capstone: null, label: 'Black Belt' }
};

// Belt display info
const BELT_INFO = {
  white: { color: '#FFFFFF', textColor: '#1C1917', label: 'White Belt', order: 0 },
  blue: { color: '#2563EB', textColor: '#FFFFFF', label: 'Blue Belt', order: 1 },
  purple: { color: '#9333EA', textColor: '#FFFFFF', label: 'Purple Belt', order: 2 },
  brown: { color: '#92400E', textColor: '#FFFFFF', label: 'Brown Belt', order: 3 },
  black: { color: '#1C1917', textColor: '#FFFFFF', label: 'Black Belt', order: 4 }
};

export async function onRequestGet(context) {
  const { request, env } = context;

  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Return public belt info without user-specific progress
      return new Response(
        JSON.stringify({
          belts: Object.entries(BELT_INFO).map(([key, info]) => ({
            id: key,
            ...info,
            requirements: BELT_REQUIREMENTS[key]
          }))
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
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

    // Get user from D1
    const user = await env.DB.prepare(
      'SELECT id, current_belt FROM users WHERE id = ?'
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

    // Check capstone submissions
    const capstoneResult = await env.DB.prepare(
      'SELECT capstone_id, status FROM capstone_submissions WHERE user_id = ? AND status = ?'
    ).bind(user.id, 'approved').all();
    
    const approvedCapstones = (capstoneResult?.results || []).map(r => r.capstone_id);

    // Get current belt requirements
    const currentReq = BELT_REQUIREMENTS[user.current_belt];
    const nextBelt = currentReq?.next;
    
    // Check if user qualifies for next belt
    let qualifiesForNext = false;
    if (nextBelt && completedQuests >= currentReq.questsNeeded) {
      if (currentReq.capstone) {
        qualifiesForNext = approvedCapstones.includes(currentReq.capstone);
      } else {
        qualifiesForNext = true;
      }
    }

    return new Response(
      JSON.stringify({
        currentBelt: user.current_belt,
        beltInfo: BELT_INFO[user.current_belt],
        completedQuests,
        nextBelt: nextBelt ? {
          belt: nextBelt,
          info: BELT_INFO[nextBelt],
          requirements: currentReq,
          questsRemaining: Math.max(0, currentReq.questsNeeded - completedQuests),
          capstoneRequired: currentReq.capstone,
          capstoneCompleted: currentReq.capstone ? approvedCapstones.includes(currentReq.capstone) : false,
          qualifies: qualifiesForNext
        } : null,
        allBelts: Object.entries(BELT_INFO).map(([key, info]) => ({
          id: key,
          ...info,
          requirements: BELT_REQUIREMENTS[key],
          isCurrent: key === user.current_belt,
          isEarned: BELT_INFO[key].order <= BELT_INFO[user.current_belt].order
        }))
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Belt error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
