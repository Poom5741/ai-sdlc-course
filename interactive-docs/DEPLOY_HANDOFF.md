# Pilot-Readiness External Steps Handoff

This document contains the exact commands for the remaining external tasks
(#44, #45) that require user credentials/actions. Run these in order.

> **Note**: StackBlitz integration (#43) has been removed. Quests now use
> local `npx degit` folders that build and test on the learner's machine.

---

## #44 — KV Secret (ADMIN_PASSWORD)

The KV namespace is already configured in `wrangler.toml` (IDs are real, not
placeholders). The only remaining step is setting the admin password secret.

### Set Secret

```bash
cd /Users/poom-work/ai-sdlc-course/interactive-docs

# Interactive: wrangler will prompt for the value
wrangler pages secret put ADMIN_PASSWORD
# Type your secure password, press Enter
```

### Verify

```bash
# List secrets to confirm
wrangler pages secret list
```

Expected: `ADMIN_PASSWORD` appears in the list.

---

## #45 — Deploy to Cloudflare Pages

### Build & Deploy

```bash
cd /Users/poom-work/ai-sdlc-course/interactive-docs

# Build (ensures dist/ is fresh)
mise run build

# Deploy (requires wrangler login first)
wrangler pages deploy dist --project-name=ai-sdlc-course
```

### Post-Deploy Verification

1. Visit the deployment URL from wrangler output
2. Navigate to `/workshop/block-1-ai-tools`
3. Access code modal should appear
4. Visit `/admin`
5. Login with the password set in Step #44
6. Create a test code via admin panel
7. Use the code to access content

---

## Summary

| Ticket | Status | Action Required |
|--------|--------|-----------------|
| #44 KV Secret | ⚠️ Secret not set | Run `wrangler pages secret put ADMIN_PASSWORD` |
| #45 Deploy | ⏳ Blocked by #44 | Run `wrangler pages deploy dist` after #44 |
