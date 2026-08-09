# ADR-0009: Code Playground Integration

## Status

Accepted

## Context

We need to integrate code playgrounds into the interactive docs so learners can run code during Code Quests without leaving the browser. Astro/Starlight does not have a built-in "run code" feature — the official approach assumes local development. We've decided to go beyond Astro's default approach.

Key constraints:
- Workshop setting (8 hours, 14 quests)
- Learners need immediate feedback
- Mixed quest types (code-focused and design-focused)
- Must work reliably during live workshop

## Decision

We will use **StackBlitz embeds** via a **custom Astro component** for in-browser code execution.

### Playground Platform
**StackBlitz** — chosen for:
- Instant load (browser-based, no setup)
- VS Code-like UI (familiar to developers)
- Generous free tier
- Easy iframe embedding
- Fast iteration (hot reload)

### Embed Approach
**Custom Astro component** (`<StackBlitzEmbed.astro>`) — reusable, configurable, clean separation of concerns.

Component API:
```astro
---
// Props
interface Props {
  repo: string;        // GitHub repo (e.g., "Poom5741/ai-sdlc-quests")
  file: string;        // Path to open (e.g., "quests/01-setup/index.js")
  branch?: string;     // Branch name (default: "main")
  height?: string;     // iframe height (default: "500px")
  view?: "preview" | "editor" | "split"; // Default: "split"
}
---
<iframe
  src={`https://stackblitz.com/edit/${repo}?embed=1&file=${file}&branch=${branch}&view=${view}`}
  style={`width:100%;height:${height};border:0;border-radius:4px;`}
  allow="cross-origin-isolation"
/>
```

### Quest Code Structure
**Template repo** — Single repository (`ai-sdlc-quests`) with quest code organized by block/quest:

```
ai-sdlc-quests/
├── block-1-ai-tools/
│   ├── quest-01-setup/
│   │   ├── index.js
│   │   ├── package.json
│   │   └── README.md
│   └── quest-02-config/
├── block-2-prompt-engineering/
├── block-3-context-engineering/
├── block-4-agentic-workflows/
└── block-5-integration/
```

Each quest has its own directory with pre-configured code.

### Environment Setup
**Pre-configured** — Template repo has all dependencies pre-installed in `package.json`. Learners start coding immediately, no `npm install` needed.

### Fallback Strategy
**Local instructions fallback** — If StackBlitz is unavailable or blocked, show:
1. Code block with syntax highlighting
2. Local setup instructions (`git clone`, `npm install`, `npm start`)
3. Alternative: CodeSandbox link

Ensures workshop can proceed even if StackBlitz has issues.

## Consequences

### Positive
- No local environment setup required for learners
- Instant code execution in browser
- Familiar VS Code-like interface
- Easy to update quest code (single repo)
- Works on any device with a browser

### Negative
- Requires internet connection (no offline mode)
- StackBlitz free tier has limits (but sufficient for workshop)
- Maintaining 14 quest templates takes effort

### Risks
- StackBlitz outage during workshop
- Mitigation: Local instructions fallback, pre-downloaded backups
- Slow load on poor connections
- Mitigation: Pre-warm embeds, have local backup ready

## Alternatives Considered

1. **CodeSandbox**: Rejected — slower initial load, more complex setup
2. **GitHub Codespaces**: Rejected — paid after 60hrs/month, slower startup
3. **Local-only approach**: Rejected — conflicts with "go beyond Astro" decision
4. **Custom execution backend**: Rejected — too much work for pilot workshop

## References

- Wayfinder Ticket #008: Code Playground Integration
- Astro Starlight Discussions: https://github.com/withastro/starlight/discussions/3391
- StackBlitz Embed API: https://developer.stackblitz.com/docs/integrations/embeds
