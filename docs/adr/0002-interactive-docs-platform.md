# ADR 0002: Interactive Docs Platform - Astro + Starlight

## Status
Accepted

## Context
We need a web-based platform for:
- Workshop materials and instructions
- Reference documentation for AI tools
- CTF challenge hosting
- Post-workshop learning path

Requirements:
- Beautiful, modern design (like Astro docs)
- Fast performance
- MDX support for interactive content
- Easy to maintain and extend

## Decision
**Astro + Starlight** as the documentation platform.

### Why Astro + Starlight
1. **Battle-tested**: Astro docs themselves use this stack
2. **Performance**: Static-first, fast page loads
3. **MDX support**: Interactive components in markdown
4. **Built-in features**: Search, i18n, dark mode
5. **Simple deployment**: Vercel, Netlify, or Cloudflare Pages

### Platform Architecture
```
ai-sdlc-docs/
├── src/
│   ├── content/
│   │   ├── docs/           # Workshop materials
│   │   │   ├── workshop/   # 8-hour workshop content
│   │   │   ├── reference/  # Tool documentation
│   │   │   └── challenges/ # CTF challenges
│   │   └── i18n/           # Thai translations
│   ├── components/
│   │   ├── CodePlayground.astro  # Live code editor
│   │   ├── ChallengeCard.astro   # CTF challenge UI
│   │   └── ProgressTracker.astro # Learning progress
│   └── layouts/
├── public/
└── astro.config.mjs
```

## Consequences

### Positive
- Excellent performance (static site)
- Beautiful default design
- Active community and ecosystem
- Easy content authoring with MDX

### Negative
- Learning curve for Astro framework
- Some features need custom components
- MDX can be complex for interactive elements

### Mitigations
- Start with simple markdown, add interactivity later
- Use existing Starlight components where possible
- Create reusable components for CTF challenges
