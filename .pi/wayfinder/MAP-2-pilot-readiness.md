# Wayfinder Map: Pilot Readiness

**GitHub Issue**: [#40 - Wayfinder: Complete & Deploy AI SDLC Course for Pilot](https://github.com/Poom5741/ai-sdlc-course/issues/40)

## Destination

Complete all missing content, fix build issues, deploy LMS, and prepare the AI SDLC course for pilot workshop delivery with14 working quests, full reference docs, and functional access code system.

## Notes

- **Source Material**: NotebookLM notebook "คู่มือการพัฒนาซอฟต์แวร์ด้วย AI และเทคโนโลยี LLM สมัยใหม่"
- **Platform**: Astro 5 + Cloudflare Pages (Wrangler)
- **LMS**: Cloudflare KV for access codes, BBD-XXXX-XXXX format
- **Quests**: 14 total planned, only5 currently in interactive-docs
- **Reference Docs**: 6 planned,3 are stubs
- **Quests**: Distributed via `npx degit` (StackBlitz removed, local build-and-test)

## Tickets

| # | Title | Type | Status | Blocked By |
|---|-------|------|--------|------------|
| [#41](https://github.com/Poom5741/ai-sdlc-course/issues/41) | Quest Content Gap: Create 9 Missing Quest MDX Pages | task | RESOLVED | — |
| [#42](https://github.com/Poom5741/ai-sdlc-course/issues/42) | Reference Documentation Gap: Fill Stub Docs | task | RESOLVED | — |
| ~~[#43](https://github.com/Poom5741/ai-sdlc-course/issues/43)~~ | ~~StackBlitz Template Setup~~ | — | CLOSED (superseded) | — |
| [#44](https://github.com/Poom5741/ai-sdlc-course/issues/44) | LMS Cloudflare Setup: Create KV Namespace | task | OPEN | — |
| [#45](https://github.com/Poom5741/ai-sdlc-course/issues/45) | LMS Deployment: Deploy to Cloudflare Pages | task | OPEN | #44 |
| [#46](https://github.com/Poom5741/ai-sdlc-course/issues/46) | Block 6 Build Issue: AI Pipeline Block Missing from Dist | task | RESOLVED | — |
| [#47](https://github.com/Poom5741/ai-sdlc-course/issues/47) | Content Gap Prioritization: Which Gaps for v1 Pilot? | grilling | RESOLVED | — |

## Frontier (Unblocked, Unclaimed)

- #44: LMS Cloudflare Setup
- #45: LMS Deployment (blocked by #44)

## Decisions so far

<!-- Filled as tickets are resolved -->

## Not yet specified

- Pilot workshop date and participant list
- Assessment/certification approach
- Detailed content gap research (after #47 decides priority)

## Out of scope

- Multi-week course format (workshop only)
- Payment processing (handled externally)
- Full LMS user accounts (access codes only)
