// Cloudflare Pages Function: GET /api/discord/link
// Redirects to Discord OAuth2 authorization

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

    // Store the session token for the callback
    const stateToken = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    await env.KV_NAMESPACE.put(`discord_state:${stateToken}`, token, {
      expirationTtl: 600 // 10 minutes
    });

    // Build Discord OAuth2 URL
    const clientId = env.DISCORD_CLIENT_ID || 'YOUR_DISCORD_CLIENT_ID';
    const redirectUri = new URL(request.url).origin + '/api/discord/callback';
    const scope = 'identify';
    
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&state=${stateToken}`;

    return new Response(null, {
      status: 302,
      headers: {
        'Location': discordAuthUrl
      }
    });

  } catch (error) {
    console.error('Discord link error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
