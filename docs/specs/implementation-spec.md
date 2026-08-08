# Spec: AI SDLC Workshop Implementation

## Problem Statement

We have completed all architectural decisions (11 ADRs) for a one-day AI SDLC workshop with interactive docs, but no implementation exists. The repo has a basic Astro scaffold and some placeholder content, but needs full content extraction, 14 code quests, bilingual support, and deployment to be ready for a pilot workshop within 1 month.

## Solution

Build the complete workshop platform by executing the implementation in vertical slices: scaffold → content → quests → polish → deploy. Each slice is independently verifiable and builds on the previous.

## User Stories

### Platform Setup
1. As a developer, I want the Astro + Starlight project properly configured so that I can start adding content
2. As a developer, I want a clean project structure following ADR-0002 so that the codebase is maintainable
3. As a developer, I want Vercel deployment configured so that every push auto-deploys

### Content Extraction
4. As an instructor, I want content extracted from NotebookLM for all 5 blocks so that I have source material
5. As an instructor, I want each block to be 2000-3000 words so that it fits the 30-minute theory slot
6. As a learner, I want content in Thai with English technical terms so that I can understand while keeping technical precision
7. As a learner, I want source citations in the content so that I can verify accuracy

### Code Quests
8. As a learner, I want 14 code quests across 5 blocks so that I have hands-on practice
9. As a learner, I want partial solutions (scaffolding + tasks) so that I can focus on the learning objective
10. As a learner, I want StackBlitz embeds so that I can code in the browser without setup
11. As a learner, I want immediate feedback on automated quests so that I know if I'm on track
12. As a learner, I want clear quest instructions in Thai so that I understand what to build

### Interactive Components
13. As a learner, I want a custom StackBlitz embed component so that code playgrounds work reliably
14. As a learner, I want a progress tracker so that I can see my completion status
15. As an instructor, I want CSV export of learner progress so that I can track the class

### Validation
16. As a learner, I want automated tests for code quests so that I get instant validation
17. As a learner, I want AI-graded rubrics for design quests so that I get meaningful feedback
18. As a learner, I want partial credit so that I'm rewarded for partial progress

### Workshop Readiness
19. As an instructor, I want Blocks 1-3 fully ready so that the core workshop content is solid
20. As an instructor, I want a pre-workshop setup guide so that learners can prepare
21. As an instructor, I want the platform deployed and tested before the pilot

## Implementation Decisions

### Project Structure
- Astro + Starlight in `interactive-docs/` directory
- Content in `src/content/docs/workshop/` for blocks, `src/content/docs/quests/` for challenges
- Custom components in `src/components/`
- Thai content inline (not separate i18n pages) per ADR-0007

### Content Extraction
- Use `notebooklm-py` for raw extraction from 11 sources
- AI structuring for each block (2000-3000 words)
- Source-to-block mapping per ADR-0004:
  - Block 1: Tutorial + Syllabus
  - Block 2: Lectures 1-3
  - Block 3: Lectures 4-6
  - Block 4: Lectures 7-8
  - Block 5: Lecture 9 + Synthesis

### Quest Design
- 14 quests total: 5 Easy, 5 Medium, 4 Hard
- Partial solutions with scaffolding + TODO markers
- StackBlitz embeds via custom component
- Template repo `ai-sdlc-quests` for quest code

### Validation
- Automated tests for code quests (~8 quests)
- AI-graded rubrics for design quests (~6 quests)
- 4-dimension rubric: Correctness (40%), Engineering Quality (30%), AI Integration (20%), Documentation (10%)

### Deployment
- Vercel free tier, auto-deploy on push
- Preview deployments on PRs
- Default Vercel domain for pilot

## Testing Decisions

### Unit Tests
- Component tests for custom Astro components (StackBlitzEmbed, ProgressTracker)
- Validation logic tests for quest grading

### Integration Tests
- Build verification (Astro builds without errors)
- Content verification (all blocks have required word count)
- Quest validation (all tests pass for automated quests)

### E2E Tests
- Deploy preview verification
- StackBlitz embed loading
- Progress tracking flow

## Out of Scope

- Multi-week course format (decided on 1-day workshop)
- Security-focused CTF (revised to Code Quest coding challenges)
- Full certification program (workshop + docs only)
- Real-time progress dashboard (file-based for pilot)
- Custom domain (default Vercel domain for pilot)
- Offline mode (requires internet for StackBlitz)

## Further Notes

- Pilot workshop target: within 1 month, 10-20 participants
- Minimum viable content: Blocks 1-3 fully ready, Blocks 4-5 rough
- Quest count for pilot: 10+ quests (2 per block for 1-3, 1-2 from 4-5)
- Bilingual content: Thai explanations + English technical terms inline
