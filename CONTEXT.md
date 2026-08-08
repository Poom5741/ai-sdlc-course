# AI SDLC Course - Domain Model

## Core Concepts

### Course Format
- **Workshop**: One-day, 8-hour intensive session
- **Interactive Docs**: Web-based learning platform (Astro/Starlight style)
- **CTF Challenges**: Capture The Flag style hands-on exercises

### Target Audiences
- **Non-tech beginners**: Want to build software with AI, no coding background
- **Experienced devs struggling with vibe coding**: Know coding but can't get AI to work well

### Learning Approach
- **Integrated contrast**: Show "vibe coding mistake" → "proper engineering approach"
- **Progressive difficulty**: Start easy, get harder throughout the day
- **Immediate application**: Theory → Challenge → Theory → Challenge (90-min blocks)

## Terminology

### AI SDLC Terms
- **Vibe Coding**: Casual AI-assisted coding without engineering discipline
- **Vibe Engineering**: Professional AI-assisted development with proper practices
- **Agentic Workflow**: AI systems that autonomously pursue goals through tool use
- **Context Engineering**: Crafting inputs to get better AI outputs
- **AI Code Review**: Using AI to analyze code quality, security, and correctness

### Workshop Terms
- **CTF Challenge**: Capture The Flag exercise where learners solve specific problems
- **90-min Block**: 30min concept introduction + 60min hands-on challenge
- **Interactive Docs**: Web-based documentation with live examples and playgrounds

### Technical Terms
- **Transformer**: Neural network architecture behind modern LLMs
- **LLM**: Large Language Model (GPT, Claude, Gemini, etc.)
- **RAG**: Retrieval-Augmented Generation - enhancing LLMs with external data
- **MCP**: Model Context Protocol - standardized tool calling
- **ReAct**: Reasoning + Acting pattern for AI agents

## Design Decisions

### Format Decision
- Workshop serves as "hook" and introduction
- Interactive docs provide ongoing learning
- CTF challenges ensure hands-on practice

### Language Decision
- Bilingual: Thai explanations with English technical terms
- Matches how Thai developers actually speak

### Audience Strategy
- Same content, different entry points
- Non-tech: Focus on concepts and tool usage
- Experienced devs: Focus on engineering practices and pitfalls

## Decisions (Resolved)

### Workshop Duration: 8 hours (1 day)
- Interleaved 90-min blocks: 30min concept + 60min CTF challenge
- Maximum energy and engagement

### Language: Bilingual (Thai + English)
- Thai explanations for concepts
- English for technical terms (matches how Thai devs speak)

### Contrast Approach: Integrated
- Each module shows "vibe coding mistake" → "proper engineering approach"
- No separate "failure" modules

### Environment: Interactive Docs + CTF
- Workshop as hook/intro
- Interactive docs for ongoing learning
- CTF challenges for hands-on practice

### CTF Challenge Types: Mixed
- "Fix this code" for security topics
- "Build this feature" for prompt engineering
- "Architect this system" for design decisions
- Progressive difficulty throughout

### Demo Approach: Hybrid
- Live coding for simple demos
- Pre-recorded backups for complex demos
- Safety net for workshop reliability

### Interactive Docs MVP: Workshop + Reference
- Start with workshop materials + tool docs
- Expand based on user feedback

### Challenge Validation: Hybrid
- Automated tests for code challenges
- AI-assisted grading for design challenges

### Follow-up Path: Topic-based Exploration
- Learners choose what's relevant
- No强制 linear progression
