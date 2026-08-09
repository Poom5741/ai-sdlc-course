# ADR 0004: Content Extraction Strategy

## Status
Accepted

## Context
We need to extract content from NotebookLM notebook "คู่มือการพัฒนาซอฟต์แวร์ด้วย AI และเทคโนโลยี LLM สมัยใหม่" (11 sources, 38 notebooks total) for 5 workshop blocks.

### Sources
- 9 Stanford CME295 lectures
- 1 AI-Assisted Coding tutorial
- 1 Agent-Assisted SE syllabus

### Workshop Blocks
1. Block 1: AI Tools Setup
2. Block 2: Prompt Engineering
3. Block 3: Security
4. Block 4: Agentic Workflows
5. Block 5: Architecture

## Decision

### Extraction Method: Hybrid (Extract + AI Structure)

1. **Raw Extraction**: Use `notebooklm-py` to extract raw content from each source via `source_get_content(source_id)` - returns title, source type, URL, char count, full content without AI processing.

2. **AI Structuring**: Use AI to synthesize and structure extracted content for each workshop block:
   - Organize by learning objectives
   - Create clear concept explanations
   - Add practical examples
   - Maintain technical accuracy

3. **Verification**: Each extracted block must cite specific source passages. Auditor checks citations against NotebookLM.

### Language Handling: Thai Explanations + English Terms

- Thai for concept explanations (matches how Thai devs speak)
- English for technical terms (Transformer, LLM, RAG, etc.)
- Bilingual approach maintains accessibility while preserving technical precision

### Summarization Level: Medium Depth (2000-3000 words)

- 30-minute theory portions need 2000-3000 words per block
- Enough depth for understanding
- Concise enough for 30-minute delivery
- Leaves room for 60-minute hands-on challenges

### Source-to-Block Mapping: Existing 5-Block Structure

Use the established mapping from COURSE_OUTLINE.md:

| Block | Topic | Primary Sources |
|-------|-------|-----------------|
| 1 | AI Tools Setup | Tutorial + Syllabus |
| 2 | Prompt Engineering | Lectures 1-3 (Foundations) |
| 3 | Security | Lectures 4-6 (Training) |
| 4 | Agentic Workflows | Lectures 7-8 (Evaluation) |
| 5 | Architecture | Lecture 9 (Future) + Synthesis |

## Consequences

### Positive
- **Accuracy**: Source citations ensure content matches source material
- **Efficiency**: Hybrid approach balances speed with quality
- **Accessibility**: Thai/English bilingual matches target audience
- **Scalable**: Process can be repeated for content updates

### Negative
- **Tool dependency**: Relies on community-maintained notebooklm-py
- **Citation overhead**: Requires tracking source passages
- **Quality variance**: AI structuring quality depends on prompts

### Mitigations
- Cache extracted content locally
- Create citation templates for consistency
- Use existing course outline as structure guide
