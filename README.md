# BlueBeltDojo — AI SDLC Course

Teach AI-assisted software development lifecycle (AI SDLC) through a one-day workshop and a self-serve interactive documentation. Success means learners leave able to use AI tools with engineering discipline — not just "vibe coding" but "vibe engineering."

## What's Inside

- **147 code quests** across 12 modules with progressive difficulty
- **Workshop blocks** (30 min concept + 60 min hands-on each) with an integrated "vibe coding mistake vs proper engineering approach" contrast
- **3 capstone projects** (API service, multi-agent system, production AI)
- **Interactive docs** — bilingual (Thai + English) web-based learning platform
- **CLI tool** — `bluebeltdojo` for quest download, testing, and submission
- **LMS backend** — Cloudflare Pages with D1 database, KV storage, and JWT auth

## Quick Start

### Interactive Docs (Learner-Facing Site)

```bash
cd interactive-docs
npm install
npm run dev        # Start dev server at http://localhost:4321
npm run build      # Production build
npm test           # Run unit tests (705 tests)
```

### Quest Code (Hands-On Challenges)

```bash
# Run all quest tests (solutions must pass)
node scripts/run-all-quest-tests.js --implement-solution

# Verify quest structure
bash scripts/verify-quests.sh
```

### CLI Tool

```bash
cd cli
node bin/entry.js --help
```

## Project Structure

```
├── interactive-docs/    # Astro + Starlight learning platform
│   ├── src/pages/       # Page routes (homepage, dashboard, pricing, etc.)
│   ├── src/content/     # MDX content (quests, workshop blocks, reference)
│   ├── functions/       # Cloudflare Pages Functions (API endpoints)
│   └── e2e/             # Playwright E2E tests
├── quests/              # 147 code quest challenges
│   ├── block-*/         # Original workshop quests
│   ├── module-*/        # Expanded curriculum quests
│   └── capstones/       # Capstone projects
├── cli/                 # bluebeltdojo CLI tool
├── scripts/             # Build, test, and deployment scripts
├── specs/               # Backend API and LMS specs
└── docs/                # ADRs, plans, wayfinder map
```

## Tech Stack

- **Frontend**: Astro 5, Starlight, Tailwind CSS 3
- **Backend**: Cloudflare Pages Functions, D1, KV
- **Testing**: Vitest (unit), Playwright (E2E), Node.js test runner (quests)
- **Deployment**: Cloudflare Pages
- **Language**: Bilingual (Thai + English)

## Documentation

- [Product Definition](PRODUCT.md)
- [Domain Model](CONTEXT.md)
- [Course Outline](COURSE_OUTLINE.md)
- [Workshop Structure](WORKSHOP_STRUCTURE.md)
- [Architecture Decision Records](docs/adr/)
- [Manifest / API Spec](specs/backend-api-spec.md)
- [Manual Test Checklist](MANUAL_TEST_CHECKLIST.md)

## License

MIT
