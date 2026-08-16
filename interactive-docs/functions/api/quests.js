// Cloudflare Pages Function: GET /api/quests
// Returns the static list of all quests with metadata
// No auth required

import questsManifest from '../../src/data/quests-manifest.json';

export async function onRequestGet(context) {
  return new Response(
    JSON.stringify(questsManifest),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      }
    }
  );
}
