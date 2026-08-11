# LMS Deployment Guide

## Prerequisites

1. Cloudflare account (free tier works)
2. Wrangler CLI installed (`npm install -g wrangler`)
3. Wrangler authenticated (`wrangler login`)

## Step 1: Create KV Namespace

```bash
cd /Users/poom-work/ai-sdlc-course/interactive-docs

# Create production namespace
wrangler kv namespace create KV_NAMESPACE

# Create preview namespace
wrangler kv namespace create KV_NAMESPACE --preview
```

Save the output IDs - you'll need them for wrangler.toml.

## Step 2: Update wrangler.toml

Replace `YOUR_KV_NAMESPACE_ID` with the actual IDs from Step 1:

```toml
name = "ai-sdlc-course"
compatibility_date = "2024-01-01"
pages_build_output_dir = "./dist"

[[kv_namespaces]]
binding = "KV_NAMESPACE"
id = "ACTUAL_PRODUCTION_ID"
preview_id = "ACTUAL_PREVIEW_ID"
```

## Step 3: Seed Test Codes (Optional)

```bash
# Create a test code via API (after deployment)
curl -X POST https://your-domain.com/api/admin/codes \
  -H "Content-Type: application/json" \
  -d '{"count": 5, "plan": "workshop-2024"}'
```

Or use the admin panel at `/admin` after setting the ADMIN_PASSWORD secret (see Step 5).

## Step 4: Deploy to Cloudflare Pages

```bash
# Build and deploy
npm run deploy

# Or deploy to production branch
npm run deploy:prod
```

## Step 5: Set Environment Variables

Using Wrangler CLI (recommended):

```bash
# Set the admin password secret
wrangler pages secret put ADMIN_PASSWORD
# Enter a secure password when prompted
```

Or via Cloudflare Dashboard → Pages → Settings → Secrets.

**Never use a hardcoded password.** The admin login function reads `ADMIN_PASSWORD` from environment/secrets only.

## Step 6: Test End-to-End

1. Visit `/workshop/block-1-ai-tools`
2. Modal should appear asking for access code
3. Enter test code: `BBD-TEST-0001`
4. Content should be revealed
5. Visit `/admin`
6. Login with the password you set in Step 5
7. Create new codes
8. Verify codes work

## Local Development

For local development, the API uses an in-memory KV store with test data:

- `BBD-TEST-0001` - Unused test code
- `BBD-USED-0002` - Already used test code

```bash
npm run dev
```

## Troubleshooting

### "KV_NAMESPACE is not defined"
- Ensure wrangler.toml has valid namespace IDs
- Run `wrangler kv namespace create KV_NAMESPACE` first

### "Invalid or expired code"
- Check if code exists in KV: `wrangler kv key list --namespace-id=YOUR_ID`
- Ensure code format is BBD-XXXX-XXXX

### Admin panel not working
- Check `ADMIN_PASSWORD` environment variable
- Set `ADMIN_PASSWORD` via `wrangler pages secret put ADMIN_PASSWORD` before first use. No default password exists.
