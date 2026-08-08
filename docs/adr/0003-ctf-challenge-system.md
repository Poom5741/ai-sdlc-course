# ADR 0003: CTF Challenge System

## Status
Accepted

## Context
We need hands-on practice that:
- Engages both beginners and experienced developers
- Provides immediate feedback
- Covers diverse AI SDLC topics
- Feels like a game, not homework

## Decision
**Capture The Flag (CTF) style challenges** with progressive difficulty.

### Challenge Types

#### 1. Code Fix Challenges (Security)
```markdown
## 🔴 Challenge: SQL Injection Finder

The following AI-generated code has a security vulnerability.
Find it and fix it.

\`\`\`javascript
// AI-generated code with vulnerability
const query = `SELECT * FROM users WHERE id = ${userId}`;
\`\`\`

**Flag**: The parameterized query version

**Validation**: Automated test checks for parameterized query
```

#### 2. Build Challenges (Prompt Engineering)
```markdown
## 🔵 Challenge: Better Prompt

Write a prompt that generates a secure login function.

**Requirements**:
- Must use bcrypt for password hashing
- Must include input validation
- Must handle errors gracefully

**Flag**: Your prompt text

**Validation**: AI-assisted grading of prompt quality
```

#### 3. Architecture Challenges (Design)
```markdown
## 🟡 Challenge: System Design

Design an AI-powered code review system.

**Requirements**:
- Must integrate with GitHub
- Must handle 1000+ PRs/day
- Must provide actionable feedback

**Flag**: Your architecture diagram + explanation

**Validation**: AI-assisted grading of design decisions
```

### Progressive Difficulty
```
🟢 Easy    → Find the bug (beginners can do this)
🟡 Medium  → Fix and improve (requires understanding)
🔴 Hard    → Design from scratch (expert level)
```

### Validation System

#### Automated (Code Challenges)
- Tests run in isolated sandbox
- Must pass all tests to "capture flag"
- Instant feedback

#### AI-Assisted (Design Challenges)
- Submit solution
- AI evaluates against rubric
- Provides detailed feedback

## Consequences

### Positive
- Engaging: Gamification increases motivation
- Immediate feedback: Learners know if they succeeded
- Diverse: Different challenge types for different skills
- Scalable: Challenges can be reused and shared

### Negative
- Development overhead: Creating quality challenges takes time
- Validation complexity: AI grading needs careful design
- Edge cases: Some solutions may be valid but unexpected

### Mitigations
- Start with simple challenges, expand based on feedback
- Combine automated + AI validation for robustness
- Allow multiple valid solutions where appropriate
