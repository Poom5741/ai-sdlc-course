---
title: "Deployment Decision"
type: grilling
status: open
blocking: []
blocked_by: []
---

# Ticket: Deployment Decision

## Question

Where and how should we deploy the interactive docs platform?

### Context
- Astro + Starlight static site
- Need fast, reliable hosting
- Likely low traffic initially
- May need custom domain later

### Decision needed
1. Which hosting provider? (Vercel/Netlify/Cloudflare Pages)
2. Custom domain or not?
3. How to handle updates/deployments?
4. Cost considerations?

### Options to consider
- **Vercel**: Free tier, easy Astro support, good DX
- **Netlify**: Free tier, good for static sites
- **Cloudflare Pages**: Free tier, fast global CDN
- **GitHub Pages**: Free, simple, but limited features

## Acceptance criteria
- [ ] Hosting provider selected
- [ ] Deployment process documented
- [ ] Cost estimate provided
