# Ticket: Goal System Coverage Decision

## Question

How should the Goal System be documented **as the execution layer** of the pipeline?

**The Pipeline Context:**
```
Matt Skills (Planning) → GitHub Issues (Tracking) → Goal System (Execution)
```

**Key Concepts to Cover:**

### As Execution Layer
- Takes GitHub issues as input
- Automates implementation without manual orchestration
- Audits work independently (anti-bamboozle)
- Outputs verified, implemented work

### System Architecture
- **Three Loop Types**: Goal (single ordered), List (queue of goals), Loop (metric-driven forever)
- **Anti-Bamboozle Pattern**: Detached auditor, regression_shield, isolated verification
- **Drafting Protocol**: How issues become goals
- **Recovery Systems**: Stall detection, quota walls, session handoff

### Integration Points
- How Matt's skills output maps to Goal system input
- How GitHub issues become Goal system tasks
- How Execution skills (Impeccable, Ponytail) are used within goals

**Options:**
1. **Pipeline-Focused** - Show how Goal system fits into the workflow, not just standalone features
2. **Architecture Deep-Dive** - Focus on anti-bamboozle pattern and why it matters
3. **Workflow Guide** - Practical guide to using /goal, /list, /loop
4. **All Three** - Pipeline context + architecture + practical guide

**Considerations:**
- The Goal system is unique to Pi - no other AI tool has this
- The "bamboozle problem" is a key insight for AI SDLC course
- Complex system with many moving parts
- Directly relates to "vibe engineering" positioning

**Recommendation:** Option 4 (All Three) - Start with pipeline context (why Goal system exists), then architecture (how anti-bamboozle works), then practical guide (how to use it). This teaches the principle, the pattern, and the practice.

## Resolution

<!-- To be filled when ticket is resolved -->
