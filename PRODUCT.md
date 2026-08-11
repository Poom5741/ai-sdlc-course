# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 5 + Tailwind CSS 3, deployed to Cloudflare Pages (Wrangler). Vitest for tests.

## Users

- **Non-technical beginners** who want to build software with AI and have no coding background. They need concepts explained simply, with hands-on practice that feels safe.
- **Experienced developers struggling with vibe coding** — they know how to code but can't get AI tools to produce reliable, production-quality output. They need engineering discipline applied to AI-assisted workflows.

Both audiences attend the same workshop and use the same interactive docs; content provides different entry points rather than separate tracks.

## Product Purpose

Teach AI-assisted software development lifecycle (AI SDLC) through a one-day workshop (hook/intro) and a self-serve interactive documentation site (ongoing learning). Success means learners leave able to use AI tools with engineering discipline — not just "vibe coding" but "vibe engineering."

## Positioning

The integrated contrast approach: every module shows the "vibe coding mistake" alongside the "proper engineering approach," making the gap visceral rather than theoretical. Competing courses teach AI tools in isolation; this course teaches AI as an engineering practice across the full SDLC.

## Operating Context

- **Workshop**: One-day, 8-hour intensive. Interleaved 90-minute blocks (30 min concept + 60 min CTF challenge). Live coding with pre-recorded backups.
- **Interactive Docs**: Self-serve web reference with workshop content, tool guides, and CTF quest pages. Quest starter code distributed via `npx degit` for local build-and-test.
- **CTF Challenges**: Capture The Flag exercises with progressive difficulty. Mix of "fix this code," "build this feature," and "architect this system" types.
- **Language**: Bilingual — Thai explanations with English technical terms (matches how Thai developers actually speak). Write English first, AI-translate to Thai, human review.
- **Deployment**: Vercel free tier for previews, Cloudflare Pages for production.

## Capabilities and Constraints

- Workshop content covers: AI tool landscape, LLM fundamentals, prompt engineering, security, agentic workflows, architecture.
- Quest validation: automated tests for code challenges (~60%), AI-graded rubrics for design challenges (~40%).
- Progress tracking: file-based JSON storage, CSV export for instructor.
- Code playgrounds via local `npx degit` folders (build and test on learner's machine).
- The site is content-heavy; performance matters but this is not a real-time app.
- Bilingual content doubles maintenance surface.

## Brand Commitments

- **BlueBeltDojo** name and martial arts metaphor (belts, dojo, quests, tap-out) is the brand identity.
- The existing "Dark Dojo" DESIGN.md in `stitch_bluebeltdojo_ai_workshop/` is being **replaced** — a new visual world will be established for the interactive docs site.
- No other binding visual constraints confirmed.

## Evidence on Hand

- Course outline: `COURSE_OUTLINE.md` (10-week full course, adapted to 1-day workshop format)
- Domain model: `CONTEXT.md` (terminology, decisions, design rationale)
- Workshop structure: `WORKSHOP_STRUCTURE.md`
- Content gap analysis: `CONTENT_GAP_ANALYSIS.md`
- Implementation plan: `IMPLEMENTATION_PLAN.md`
- Interactive docs source: `interactive-docs/src/` (Astro components, MDX content, custom CSS)
- Existing design reference (being replaced): `stitch_bluebeltdojo_ai_workshop/DESIGN.md`
- Existing code.html landing page: `stitch_bluebeltdojo_ai_workshop/code.html`

## Product Principles

1. **Contrast over lecture** — show the mistake and the fix side by side; don't just describe best practices.
2. **Hands-on > passive** — every concept block pairs with a CTF challenge; learning happens by doing.
3. **Same content, different doors** — non-tech beginners and experienced devs share material but enter at different depth levels.
4. **Thai-first, English-technical** — explanations in Thai, technical terms in English, matching real developer speech patterns.
5. **Reliable delivery** — pre-recorded backups for complex demos; the workshop must land even when live coding fails.

## Accessibility & Inclusion

Follow WCAG AA where practical. No product-specific accessibility requirements beyond general best practices.
