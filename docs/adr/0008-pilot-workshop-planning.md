# ADR-0008: Pilot Workshop Planning

## Status

Accepted

## Context

We need to plan the first pilot workshop to test the AI SDLC course with real learners. This will validate content, timing, quests, and gather feedback for iteration.

Key constraints:
- Workshop is 8-hour, one-day intensive
- Bilingual content (Thai + English)
- 14 code quests across 5 blocks
- Need feedback mechanism for iteration

## Decision

We will run a **beta user group pilot** within 1 month.

### Pilot Type
**Beta user group** — Diverse feedback from actual learners. More planning than internal pilot, but better signal than public beta.

### Timeline
**Within 1 month** — Enough time to complete content extraction and quest creation, but not so long that momentum dies. Sets healthy urgency.

### Target Audience
**Mixed (60% experienced devs, 40% non-tech beginners)** — Test both entry points. Validates the "same content, different entry points" strategy.

Aim for:
- 6-12 experienced developers
- 4-8 non-tech beginners

### Participant Count
**10-20 participants** — Large enough for diverse feedback, small enough to manage. Allows for 2-3 pairs per quest for peer learning.

### Feedback Mechanism
**Mixed approach**:
1. **Live feedback** — Real-time feedback during workshop (chat/Slack channel)
2. **Post-workshop survey** — Structured questionnaire after
3. **Optional 1-on-1 interviews** — Deep insights from select participants

### Success Metrics
| Metric | Target |
|--------|--------|
| Completion Rate | ≥ 70% of participants finish all quests |
| Satisfaction Score | ≥ 4.0/5.0 (NPS or rating) |
| Learning Outcomes | Measurable improvement (pre/post quiz) |
| Engagement | Active participation observed |

### Content Readiness
**Blocks 1-3 minimum** — Core content must be ready:
- Block 1: AI Tools (setup/config quests)
- Block 2: Prompt Engineering (prompt writing quests)
- Block 3: Context Engineering (RAG/MCP quests)

Blocks 4-5 (Agentic Workflows, Integration) can be rougher for pilot.

### Quest Readiness
**10+ quests** — At least:
- 2 quests per block for Blocks 1-3 (6 quests)
- 1-2 quests from Blocks 4-5 (4+ quests)

Allows testing the full flow without requiring perfection.

### Pre-Pilot Checklist
- [ ] Content extracted for Blocks 1-3 (from NotebookLM)
- [ ] 10+ quests created with automated tests or AI grading rubrics
- [ ] Interactive docs deployed to Vercel
- [ ] Bilingual content (Thai + English) for core blocks
- [ ] Feedback mechanism set up (survey, chat channel)
- [ ] Participants recruited and scheduled

## Consequences

### Positive
- Real-world feedback from target audience
- Validates content, timing, and quest design
- Identifies issues before full launch
- Builds community and early adopters

### Negative
- Requires significant preparation (content, quests, deployment)
- Participant recruitment takes time
- Risk of negative feedback if content is incomplete

### Risks
- Low participant turnout
- Mitigation: Over-recruit by 20%, send reminders
- Content not ready in time
- Mitigation: Focus on Blocks 1-3, accept rough edges
- Technical issues during workshop
- Mitigation: Test deployment beforehand, have backup plan

## Alternatives Considered

1. **Internal team pilot**: Rejected — limited perspective, doesn't validate target audience
2. **Public beta**: Rejected — higher risk, harder to manage, less focused feedback
3. **No pilot (go straight to launch)**: Rejected — too risky, untested content

## References

- Wayfinder Ticket #005: Pilot Workshop Planning
- Course Context: 8-hour workshop, 14 quests, bilingual format
- Related ADRs: 0005 (Quest Validation), 0006 (Deployment), 0007 (Thai Translation)
