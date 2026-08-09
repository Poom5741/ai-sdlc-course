---
title: "Progress Tracking System"
type: grilling
status: open
blocking: []
blocked_by: []
---

# Ticket: Progress Tracking System

## Question

How should we track learner progress through the workshop?

### Context
- 14 code quests across 5 blocks
- 8-hour workshop with interleaved theory and practice
- Need visibility into learner completion
- Workshop setting (instructor + learners)

### Decision needed
1. What to track? (completion, time, scores, attempts)
2. How to track? (database, file-based, third-party)
3. Who sees the data? (instructor only, learners + instructor)
4. How to display progress? (dashboard, simple list, gamified)

### Options to consider
- Simple file-based tracking (JSON/CSV)
- Database-backed dashboard
- Third-party LMS integration
- No tracking (self-assessment only)

## Acceptance criteria
- [ ] Tracking scope defined
- [ ] Data storage approach selected
- [ ] Display/visibility approach clear
