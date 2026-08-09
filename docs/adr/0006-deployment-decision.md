# ADR-0006: Deployment Decision

## Status

Accepted

## Context

We need to deploy the interactive docs platform (Astro + Starlight) for the AI SDLC course workshop. The platform needs to be fast, reliable, and suitable for a pilot workshop with likely low traffic initially.

Key constraints:
- Astro + Starlight static site
- Low traffic initially (pilot workshop)
- May need custom domain later
- Budget-conscious (free tier preferred)

## Decision

We will deploy to **Vercel** using the free tier.

### Hosting Provider
**Vercel** — chosen for:
- Native Astro framework support (zero-config deployment)
- Automatic preview deployments on PRs
- Excellent developer experience
- Generous free tier (100GB bandwidth/month)
- Easy scaling path if needed

### Domain Strategy
- **Current**: Use default Vercel domain (`ai-sdlc-course.vercel.app`)
- **Future**: Add custom domain if workshop scales
- Ship fast, iterate later

### Deployment Process
- **Auto-deploy on push to main** — simplest for solo/small team
- **Preview deployments on PRs** — provides staging environment
- No manual deployment needed

### Cost
- **Free tier only** — sufficient for pilot workshop
- Vercel free tier includes:
  - 100GB bandwidth/month
  - Unlimited static sites
  - Automatic HTTPS
  - Preview deployments

### Environment Variables
- Use **Vercel's UI** for environment variable management
- Secure, version-controlled separately from code
- Ready for API keys if needed later

### Analytics
- **Enable Vercel Analytics** (free tier)
- Privacy-friendly, no setup needed
- Useful for understanding workshop traffic patterns

## Consequences

### Positive
- Zero-config deployment for Astro projects
- Automatic HTTPS and global CDN
- Preview deployments for testing changes
- Free tier covers pilot workshop needs
- Easy path to scale if needed

### Negative
- Vendor lock-in to Vercel (mitigated by static site portability)
- Free tier has limits (100GB bandwidth) — fine for pilot
- Analytics only available on Pro plan (but free tier includes basic)

### Risks
- Vercel pricing changes could affect future costs
- Mitigation: Static site is portable, can move to Netlify/Cloudflare if needed

## Alternatives Considered

1. **Netlify**: Good alternative, but Vercel has better Astro support
2. **Cloudflare Pages**: Fastest CDN, but less mature Astro integration
3. **GitHub Pages**: Too limited for Astro/Starlight features
4. **Self-hosted**: Overkill for static site, adds operational burden

## References

- Wayfinder Ticket #003: Deployment Decision
- Vercel Documentation: https://vercel.com/docs
- Astro Deployment Guide: https://docs.astro.build/en/guides/deploy/
