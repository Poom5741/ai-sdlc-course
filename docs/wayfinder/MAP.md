# Wayfinder Map: AI SDLC Course Creation

## Destination

Create a working one-day AI SDLC workshop with interactive docs platform, 14 code quests, and all content extracted from NotebookLM sources - ready to run a pilot workshop.

## Notes

- **Source Material**: NotebookLM notebook "คู่มือการพัฒนาซอฟต์แวร์ด้วย AI และเทคโนโลยี LLM สมัยใหม่" (11 sources, 38 notebooks total)
- **Workshop Format**: 8-hour one-day intensive, 90-min blocks (30min theory + 60min code quests)
- **Challenge Format**: Code Quest (coding challenges/projects, NOT security CTF)
- **Language**: Bilingual (Thai explanations + English technical terms)
- **Platform**: Astro + Starlight interactive docs
- **Pi Skills Installed**: pi-tutor, pi-skill-system-creator, pi-hermes-memory, pi-ralph-loop, pi-notebooklm, Matt Pocock's 35 skills

## Decisions so far

- [Workshop Format](../adr/0001-workshop-format.md) — 8-hour one-day intensive with interleaved 90-min blocks
- [Interactive Docs Platform](../adr/0002-interactive-docs-platform.md) — Astro + Starlight for the learning platform
- [CTF Challenge System](../adr/0003-ctf-challenge-system.md) — Code Quest format (revised from security CTF)
- [Content Extraction Strategy](../adr/0004-content-extraction-strategy.md) — Hybrid extraction (raw + AI structure) with source citations
- [Quest Validation Approach](../adr/0005-quest-validation-approach.md) — Hybrid validation (automated tests + AI-graded), partial credit, no certification
- [Deployment Decision](../adr/0006-deployment-decision.md) — Vercel free tier, auto-deploy on push, preview deployments
- [Thai Translation Workflow](../adr/0007-thai-translation-workflow.md) — Bilingual content (Thai + inline English), AI-assisted translation + human review
- [Pilot Workshop Planning](../adr/0008-pilot-workshop-planning.md) — Beta user group within 1 month, 10-20 participants, Blocks 1-3 ready
- [Code Playground Integration](../adr/0009-code-playground-integration.md) — Local folders via `npx degit` (StackBlitz superseded 2026-08-12)
- [Quest Starter Code](../adr/0010-quest-starter-code.md) — Partial solutions (scaffolding + tasks) for all quests, distributed via `npx degit`
- [Progress Tracking System](../adr/0011-progress-tracking-system.md) — File-based tracking (completion + scores), CSV export, simple checklist

## Active Tickets

- [001-content-extraction-strategy](tickets/001-content-extraction-strategy.md) — How to extract content from NotebookLM for each block ✓ RESOLVED
- [002-quest-validation-approach](tickets/002-quest-validation-approach.md) — How to validate learner quest completion ✓ RESOLVED
- [003-deployment-decision](tickets/003-deployment-decision.md) — Where to deploy the interactive docs ✓ RESOLVED
- [004-thai-translation-workflow](tickets/004-thai-translation-workflow.md) — How to handle Thai language content ✓ RESOLVED
- [005-pilot-workshop-planning](tickets/005-pilot-workshop-planning.md) — When and how to run pilot ✓ RESOLVED
- [006-quest-starter-code](tickets/006-quest-starter-code.md) — How to create starter code for each quest ✓ RESOLVED
- [007-code-playground-integration](tickets/007-code-playground-integration.md) — How to integrate code playgrounds in interactive docs ✓ RESOLVED
- [008-progress-tracking-system](tickets/008-progress-tracking-system.md) — How to track learner progress ✓ RESOLVED

## Not yet specified

- (none currently)

## Out of scope

- Multi-week course format (decided on 1-day workshop)
- Security-focused CTF (revised to Code Quest coding challenges)
- Full certification program (workshop + docs only for now)

---

## Next Map

This map is complete. The next effort continues at:

**[Map 2: Pilot Readiness](https://github.com/Poom5741/ai-sdlc-course/issues/40)** — Complete missing content, deploy LMS, prepare for pilot workshop.
