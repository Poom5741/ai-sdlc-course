---
title: "Content Extraction Strategy"
type: research
status: open
blocking: []
blocked_by: []
---

# Ticket: Content Extraction Strategy

## Question

How should we extract content from NotebookLM for each workshop block?

### Context
- Notebook has 11 sources (9 Stanford lectures, 1 AI coding tutorial, 1 syllabus)
- Need to map content to 5 workshop blocks
- Content is in both Thai and English
- Need to maintain accuracy while making accessible

### Decision needed
1. Which block gets which source material?
2. How to handle Thai vs English content?
3. What level of summarization is needed?
4. How to verify extracted content accuracy?

### Options to research
- Direct extraction via NotebookLM API
- Manual curation with AI assistance
- Hybrid approach (extract + refine)

## Acceptance criteria
- [ ] Clear mapping of sources to blocks
- [ ] Thai/English handling strategy defined
- [ ] Quality verification process documented
