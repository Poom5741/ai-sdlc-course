# ADR-0005: Quest Validation Approach

## Status

Accepted

## Context

We need to validate that learners completed each of the 14 Code Quests correctly in an 8-hour workshop setting. The quests span 5 blocks with mixed difficulty levels (Easy/Medium/Hard), and learners need immediate feedback to maintain momentum.

Key constraints:
- 8-hour workshop with limited instructor time
- Mixed quest types (code-focused and design-focused)
- Need immediate feedback for automated quests
- Both Thai and English content involved

## Decision

We will use a **hybrid validation approach** combining automated tests and AI-assisted grading:

### Validation Method
- **Automated tests** for code-focused quests (~8 quests, 60%)
  - Run in browser/CLI
  - Immediate feedback
  - Test-based partial credit (X% per passing test case)
- **AI-assisted grading** for design/architecture quests (~6 quests, 40%)
  - Custom prompt templates as grading rubrics
  - Delayed feedback (post-submission)
  - 4-dimension rubric

### Feedback Mechanism
- **Immediate** for automated quests (real-time validation as learners work)
- **Delayed** for AI-graded quests (processed after submission)

### Partial Completion
- **Accept partial credit** — learners see what they accomplished
- Test-based calculation for automated quests
- Rubric-based scoring for AI-graded quests

### Certification
- **No certification** for pilot workshop
- Focus on learning outcomes, not credentials
- Can add badges/certificates in future iterations

### AI Grading Rubric Structure
For design quests, evaluate across 4 dimensions:
1. **Correctness** (40%): Does the solution solve the stated problem?
2. **Engineering Quality**30%): Is the code well-structured, maintainable?
3. **AI Integration** (20%): Does it properly leverage AI tools/patterns?
4. **Documentation** (10%): Is the approach explained clearly?

### Quest Type Breakdown
| Block | Quest Type | Validation |
|-------|-----------|------------|
| 1: AI Tools | Setup/config | Automated |
| 2: Prompt Engineering | Prompt writing | AI-graded |
| 3: Context Engineering | RAG/MCP | Mixed |
| 4: Agentic Workflows | Agent building | Mixed |
| 5: Integration | System design | AI-graded |

## Consequences

### Positive
- Immediate feedback maintains workshop momentum
- Hybrid approach matches quest type strengths
- Partial credit keeps learners engaged
- Custom rubrics are portable across LLM providers

### Negative
- AI-graded quests have delayed feedback
- Need to create grading rubrics for each design quest
- Requires LLM API access for grading (cost consideration)

### Risks
- AI grading consistency may vary
- Learners may focus on automated quests and skip design quests
- Mitigation: Weight automated and AI-graded equally in progress tracking

## Alternatives Considered

1. **Fully automated**: Rejected — design quests need nuanced evaluation
2. **Fully manual**: Rejected — instructor time limited in 8-hour workshop
3. **Screenshot submission**: Rejected — friction, delayed feedback, hard to verify
4. **Peer review**: Rejected — learners lack expertise to evaluate each other

## References

- Wayfinder Ticket #002: Quest Validation Approach
- Course Context: 14 quests across 5 blocks, 8-hour workshop format
