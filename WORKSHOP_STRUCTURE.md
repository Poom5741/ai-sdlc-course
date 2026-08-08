# Workshop Structure: AI SDLC One-Day Intensive

## Overview
**Duration**: 8 hours (1 day)
**Format**: Interleaved 90-minute blocks
**Language**: Bilingual (Thai + English technical terms)
**Approach**: Integrated contrast (vibe coding mistake → proper engineering)
**Challenge Format**: Code Quest (coding challenges, not security CTF)

---

## Detailed Schedule

### 🌅 Block 1: AI Tools Setup & First Wins (09:00 - 10:30)

#### 30-min Concept: "The AI Toolkit Landscape"
- What is AI-assisted development?
- Overview of tools: Copilot, Claude Code, Gemini CLI, CodeRabbit
- The shift from manual coding to intent-driven development
- **Contrast**: Vibe coding (copy-paste) vs Vibe engineering (systematic)

#### 60-min Code Quest: "First AI Code"

**🟢 Quest 1.1**: First AI Completion
- Use Copilot to write a factorial function
- Handle edge cases
- **Deliverable**: Working code + screenshot

**🟡 Quest 1.2**: Multi-file Generation
- Generate a complete API endpoint
- Include validation and error handling
- **Deliverable**: Working API + documentation

**🟡 Quest 1.3**: Compare Tools
- Try the same task with Copilot vs Claude Code
- Document differences in output quality
- **Deliverable**: Comparison table

---

### 🧠 Block 2: Prompt Engineering Mastery (10:45 - 12:15)

#### 30-min Concept: "Talking to AI Effectively"
- Tokens, context windows, hallucinations
- Prompt structure: Context + Task + Constraints
- **Contrast**: Vague prompt ("make a login") vs Precise prompt

#### 60-min Code Quest: "Prompt Mastery"

**🟢 Quest 2.1**: Fix the Vague Prompt
```
Bad prompt: "Write a login function"
Your task: Rewrite this prompt to be more specific
```
- **Deliverable**: Improved prompt + better code output

**🟡 Quest 2.2**: Multi-Step Prompting
- Break a complex feature into prompt steps
- Build a REST API endpoint through prompts
- **Deliverable**: Working API + prompt sequence

**🔴 Quest 2.3**: Domain-Specific Prompting
- Create prompts for a specific domain (fintech/healthcare)
- Handle edge cases through prompt engineering
- **Deliverable**: Domain-aware prompt library

---

### 🍽️ Lunch Break (12:15 - 13:15)

---

### 🔒 Block 3: Security in AI-Generated Code (13:15 - 14:45)

#### 30-min Concept: "AI Doesn't Know Your Security Context"
- Common vulnerabilities in AI code
- SQL injection, hardcoded secrets, XSS
- **Contrast**: AI-generated insecure code vs Secure version

#### 60-min Code Quest: "Security Hardening"

**🟢 Quest 3.1**: Spot the Vulnerability
```javascript
// AI-generated code - find the security issue
const query = `SELECT * FROM users WHERE email = '${email}'`;
const password = "admin123"; // hardcoded
```
- **Deliverable**: List of identified vulnerabilities

**🟡 Quest 3.2**: Fix and Harden
- Take vulnerable code and make it secure
- Implement proper authentication
- **Deliverable**: Secure code version + explanation

**🔴 Quest 3.3**: Security Architecture
- Design a secure AI-assisted development workflow
- Include code review, secrets management, dependency scanning
- **Deliverable**: Security architecture document

---

### 🤖 Block 4: Agentic Workflows (15:00 - 16:30)

#### 30-min Concept: "AI Agents That Act"
- Tool calling and MCP
- ReAct pattern (Reasoning + Acting)
- **Contrast**: Single prompt vs Multi-step agent

#### 60-min Code Quest: "Loop Engineering"

**🟢 Quest 4.1**: Set Up a Loop
- Configure Claude Code with `--max-turns 3`
- Run a self-healing test loop
- **Deliverable**: Working loop + documentation

**🟡 Quest 4.2**: Generate-Review-Fix Loop
- Set up AI write → CodeRabbit review → AI fix workflow
- Document the loop process
- **Deliverable**: Working loop + comparison metrics

**🔴 Quest 4.3**: Multi-Agent Pipeline
- Design a 3-agent workflow for feature development
- Include error handling and budget control
- **Deliverable**: Agent flow diagram + implementation plan

---

### 🏗️ Block 5: Architecture & Wrap-up (16:45 - 18:00)

#### 30-min Concept: "Designing AI-Powered Systems"
- RAG architecture
- Context engineering
- **Contrast**: naive AI integration vs Thoughtful architecture

#### 60-min Code Quest: "Final Project"

**🟡 Quest 5.1**: RAG Design
- Design a RAG system for a specific use case
- Choose chunking strategy, embedding model, retrieval method
- **Deliverable**: RAG architecture document

**🔴 Quest 5.2**: Full System Design
- Design an AI-powered feature end-to-end
- Include architecture, security, testing strategy
- **Deliverable**: Complete system design + presentation

#### 15-min Wrap-up
- Key takeaways
- Path forward with interactive docs
- CTF challenge completion celebration

---

## Code Quest Summary

| Block | Topic | 🟢 Easy | 🟡 Medium | 🔴 Hard |
|-------|-------|---------|-----------|---------|
| 1 | AI Tools | 1 | 2 | 0 |
| 2 | Prompting | 1 | 1 | 1 |
| 3 | Security | 1 | 1 | 1 |
| 4 | Loop Engineering | 1 | 1 | 1 |
| 5 | Architecture | 0 | 1 | 1 |
| **Total** | | **4** | **6** | **4** |

**Total Quests**: 14
**Completion Time**: ~8 hours (with breaks)
**Difficulty Progression**: Easy → Medium → Hard
**Format**: Coding challenges + projects (not security CTF)

---

## Learning Outcomes

By the end of this workshop, learners will be able to:

1. **Setup**: Install and configure AI coding tools
2. **Prompt**: Write effective prompts for code generation
3. **Review**: Identify security issues in AI-generated code
4. **Loop**: Set up automated development loops (PIV, self-healing)
5. **Agent**: Design basic agentic workflows
6. **Architect**: Make informed decisions about AI integration

---

## Post-Workshop Path

After the workshop, learners can continue with:

1. **Interactive Docs**: Deep-dive into any topic
2. **Extended CTF Challenges**: More advanced problems
3. **Project-Based Learning**: Build real applications
4. **Community**: Share solutions and learn from others
