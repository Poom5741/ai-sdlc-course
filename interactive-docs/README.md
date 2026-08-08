# AI SDLC Interactive Docs

Interactive documentation platform for the AI SDLC workshop.

## Tech Stack
- **Framework**: Astro + Starlight
- **Styling**: Tailwind CSS
- **Code**: MDX with live playgrounds
- **Deployment**: Vercel/Netlify/Cloudflare Pages

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
ai-sdlc-docs/
├── src/
│   ├── content/
│   │   ├── docs/
│   │   │   ├── workshop/          # Workshop materials
│   │   │   │   ├── block-1-ai-tools.mdx
│   │   │   │   ├── block-2-prompting.mdx
│   │   │   │   ├── block-3-security.mdx
│   │   │   │   ├── block-4-agents.mdx
│   │   │   │   └── block-5-architecture.mdx
│   │   │   ├── reference/         # Tool documentation
│   │   │   │   ├── github-copilot.mdx
│   │   │   │   ├── claude-code.mdx
│   │   │   │   └── code-rabbit.mdx
│   │   │   └── challenges/        # CTF challenges
│   │   │       ├── setup-olympics.mdx
│   │   │       ├── prompt-arena.mdx
│   │   │       ├── security-audit.mdx
│   │   │       ├── agent-builder.mdx
│   │   │       └── architect-your-solution.mdx
│   │   └── i18n/
│   │       └── th/                # Thai translations
│   ├── components/
│   │   ├── CodePlayground.astro   # Live code editor
│   │   ├── ChallengeCard.astro    # CTF challenge UI
│   │   ├── FlagInput.astro        # Flag submission
│   │   └── ProgressTracker.astro  # Learning progress
│   └── styles/
│       └── custom.css
├── public/
│   ├── challenges/                # Challenge starter code
│   │   ├── 1.1-copilot-setup/
│   │   ├── 2.1-fix-prompt/
│   │   └── ...
│   └── assets/
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Features

### Workshop Mode
- Step-by-step workshop guide
- Timer for each block
- Challenge progress tracking

### Challenge System
- 🟢 Easy challenges (beginner-friendly)
- 🟡 Medium challenges (intermediate)
- 🔴 Hard challenges (advanced)

### Interactive Elements
- Live code playgrounds
- Flag submission system
- Progress dashboard

### Bilingual Support
- Thai language toggle
- English technical terms preserved
- Consistent terminology

## Deployment

### Vercel
```bash
npm run build
# Deploy to Vercel
```

### Netlify
```bash
npm run build
# Deploy to Netlify
```

### Cloudflare Pages
```bash
npm run build
# Deploy to Cloudflare Pages
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT
