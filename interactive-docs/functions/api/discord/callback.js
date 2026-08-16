// Cloudflare Pages Function: GET /api/discord/callback
// Handles Discord OAuth2 callback and links account

// Belt to Discord role mapping
const BELT_ROLE_MAP = {
  white: 'White Belt',
  blue: 'Blue Belt',
  purple: 'Purple Belt',
  brown: 'Brown Belt',
  black: 'Black Belt'
};

export async function onRequestGet(context) {
  const { request, env } = context;

  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');

    // Handle OAuth errors
    if (error) {
      return new Response(
        `<html><body><script>window.opener?.postMessage({error:'${error}'},'*');window.close();</script></body></html>`,
        { status: 200, headers: { 'Content-Type': 'text/html' } }
      );
    }

    if (!code || !state) {
      return new Response(
        '<html><body><script>window.opener?.postMessage({error:"Missing authorization code"},"*");window.close();</script></body></html>',
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Retrieve session token from state
    const sessionToken = await env.KV_NAMESPACE.get(`discord_state:${state}`);
    if (!sessionToken) {
      return new Response(
        '<html><body><script>window.opener?.postMessage({error:"Invalid or expired state"},"*");window.close();</script></body></html>',
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Clean up state
    await env.KV_NAMESPACE.delete(`discord_state:${state}`);

    // Exchange code for access token
    const redirectUri = new URL(request.url).origin + '/api/discord/callback';
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: env.DISCORD_CLIENT_ID || 'YOUR_DISCORD_CLIENT_ID',
        client_secret: env.DISCORD_CLIENT_SECRET || 'YOUR_DISCORD_CLIENT_SECRET',
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri
      })
    });

    if (!tokenResponse.ok) {
      return new Response(
        '<html><body><script>window.opener?.postMessage({error:"Failed to exchange code"},"*");window.close();</script></body></html>',
        { status: 500, headers: { 'Content-Type': 'text/html' } }
      );
    }

    const tokenData = await tokenResponse.json();

    // Get user info from Discord
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });

    if (!userResponse.ok) {
      return new Response(
        '<html><body><script>window.opener?.postMessage({error:"Failed to get user info"},"*");window.close();</script></body></html>',
        { status: 500, headers: { 'Content-Type': 'text/html' } }
      );
    }

    const discordUser = await userResponse.json();

    // Get session user
    const session = await env.KV_NAMESPACE.get(`session:${sessionToken}`, { type: 'json' });
    if (!session) {
      return new Response(
        '<html><body><script>window.opener?.postMessage({error:"Session expired"},"*");window.close();</script></body></html>',
        { status: 401, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Get user's belt
    const user = await env.DB.prepare(
      'SELECT id, current_belt FROM users WHERE id = ?'
    ).bind(session.userId).first();

    if (!user) {
      return new Response(
        '<html><body><script>window.opener?.postMessage({error:"User not found"},"*");window.close();</script></body></html>',
        { status: 404, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Store Discord ID in user record
    await env.DB.prepare(
      `UPDATE users SET updated_at = datetime('now') WHERE id = ?`
    ).bind(user.id).run();

    // Store Discord link in KV
    await env.KV_NAMESPACE.put(`discord_user:${user.id}`, JSON.stringify({
      discordId: discordUser.id,
      discordUsername: discordUser.username,
      linkedAt: new Date().toISOString()
    }));

    // Assign Discord role if bot token is available
    if (env.DISCORD_BOT_TOKEN && env.DISCORD_GUILD_ID) {
      const beltRole = BELT_ROLE_MAP[user.current_belt];
      if (beltRole) {
        try {
          // Get guild roles
          const rolesResponse = await fetch(
            `https://discord.com/api/guilds/${env.DISCORD_GUILD_ID}/roles`,
            {
              headers: {
                'Authorization': `Bot ${env.DISCORD_BOT_TOKEN}`
              }
            }
          );

          if (rolesResponse.ok) {
            const roles = await rolesResponse.json();
            const targetRole = roles.find(r => r.name === beltRole);
            
            if (targetRole) {
              // Add role to user
              await fetch(
                `https://discord.com/api/guilds/${env.DISCORD_GUILD_ID}/members/${discordUser.id}/roles/${targetRole.id}`,
                {
                  method: 'PUT',
                  headers: {
                    'Authorization': `Bot ${env.DISCORD_BOT_TOKEN}`
                  }
                }
              );
            }
          }
        } catch (e) {
          console.error('Failed to assign Discord role:', e);
        }
      }
    }

    return new Response(
      `<html><body><script>window.opener?.postMessage({success:true,discordId:'${discordUser.id}',username:'${discordUser.username}'},'*");window.close();</script></body></html>`,
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    );

  } catch (error) {
    console.error('Discord callback error:', error);
    return new Response(
      '<html><body><script>window.opener?.postMessage({error:"Internal server error"},"*");window.close();</script></body></html>',
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}
