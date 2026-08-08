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

## Active Tickets

- [001-content-extraction-strategy](tickets/001-content-extraction-strategy.md) — How to extract content from NotebookLM for each block
- [002-quest-validation-approach](tickets/002-quest-validation-approach.md) — How to validate learner quest completion
- [003-deployment-decision](tickets/003-deployment-decision.md) — Where to deploy the interactive docs
- [004-thai-translation-workflow](tickets/004-thai-translation-workflow.md) — How to handle Thai language content
- [005-pilot-workshop-planning](tickets/005-pilot-workshop-planning.md) — When and how to run pilot (blocked by 001, 002, 003)

## Not yet specified

- Quest starter code creation approach
- Code playground integration
- Progress tracking system

## Out of scope

- Multi-week course format (decided on 1-day workshop)
- Security-focused CTF (revised to Code Quest coding challenges)
- Full certification program (workshop + docs only for now)
