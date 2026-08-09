# ADR-0011: Progress Tracking System

## Status

Accepted

## Context

We need to track learner progress through the 14 Code Quests during the 8-hour workshop. The instructor needs visibility to intervene when learners struggle, and learners need feedback on their completion.

Key constraints:
- 14 code quests across 5 blocks
- 8-hour workshop setting
- Mixed validation (automated tests + AI grading)
- Pilot workshop (10-20 participants)

## Decision

We will use **file-based progress tracking** with completion + scores, visible to both learners and instructor.

### Tracking Scope
**Completion + scores** — Track:
- Quest completion status (done/not done)
- Score for each quest (test-based for automated, rubric-based for AI-graded)
- No time tracking (adds complexity without clear value for pilot)

### Data Storage
**File-based (JSON/CSV)** — Simple for pilot:
- Learner progress stored in JSON files
- Downloadable CSV for instructor
- No backend or database required
- Can upgrade to database later if workshop scales

### Visibility
**Learners + instructor**:
- Learners see their own progress (motivation)
- Instructor sees all learner progress (intervention)
- No public leaderboard (avoids competition pressure)

### Display Format
**Simple checklist** — Clean, fast to implement:
- Quest names with checkmarks (✓/✗)
- Score display next to each quest
- Works on mobile devices
- Can upgrade to dashboard later

### Quest Completion Detection
**Hybrid approach** (aligns with Quest Validation ADR #005):
- **Automated quests**: Tests pass → auto-mark complete
- **AI-graded quests**: Learner clicks "Submit" → manual submission
- **Design quests**: AI grading complete → auto-mark complete

### Instructor Dashboard
**CSV export** — Simplest for pilot:
- Instructor downloads CSV file
- Opens in spreadsheet (Excel, Google Sheets)
- Contains: learner name, quest status, scores
- Can upgrade to real-time dashboard later

### Data Structure
```json
{
  "learners": [
    {
      "name": "Learner 1",
      "email": "learner1@example.com",
      "progress": {
        "quest-01": { "status": "complete", "score": 100 },
        "quest-02": { "status": "complete", "score": 85 },
        "quest-03": { "status": "in_progress", "score": null },
        ...
      }
    }
  ]
}
```

## Consequences

### Positive
- Simple to implement (no backend)
- Works offline (file-based)
- Downloadable for instructor analysis
- Can upgrade to database/dashboard later

### Negative
- No real-time updates (manual refresh)
- No built-in analytics
- Manual CSV export for instructor

### Risks
- Data loss if browser clears storage
- Mitigation: Periodic auto-save to file
- Instructor may want real-time view
- Mitigation: CSV export is sufficient for pilot (10-20 learners)

## Alternatives Considered

1. **Local storage only**: Rejected — no instructor visibility, data lost on browser clear
2. **Database-backed**: Rejected — overkill for pilot, adds backend complexity
3. **Third-party LMS**: Rejected — adds dependency, may not fit workshop format
4. **Public leaderboard**: Rejected — creates competition pressure, not appropriate for workshop

## References

- Wayfinder Ticket #008: Progress Tracking System
- Related ADR: 0005 (Quest Validation Approach)
