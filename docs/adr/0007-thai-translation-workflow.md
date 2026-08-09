# ADR-0007: Thai Translation Workflow

## Status

Accepted

## Context

The AI SDLC course is bilingual (Thai + English technical terms). We need a consistent approach for handling Thai language content in the interactive docs platform.

Key constraints:
- Workshop is bilingual (Thai + English)
- Technical terms should stay in English
- Content comes from English sources (Stanford lectures, AI tutorials)
- Need to maintain consistency across all content

## Decision

We will use **bilingual content** with Thai explanations and inline English technical terms.

### Translation Approach
**Bilingual content** — Thai explanations with inline English technical terms on the same page.

Example:
> ในบทนี้เราจะเรียนรู้เกี่ยวกับ **Retrieval-Augmented Generation (RAG)** ซึ่งเป็น technique ที่ใช้提升 LLM ด้วยข้อมูลจากภายนอก

This matches how Thai developers actually speak — mixing Thai and English naturally.

### Which Parts Need Thai
- **Concept explanations** (theory blocks) — Thai for comprehension
- **Quest instructions** (hands-on blocks) — Thai for clarity
- **Reference docs** — English only (technical documentation)

### Technical Terms
**Keep in English** — Terms like "RAG", "MCP", "Transformer", "LLM" are universally understood by Thai developers. Transliteration adds confusion without benefit.

### Translation Workflow
1. **Write in English first** — source material is English, AI translation works better English→Thai
2. **AI-assisted translation** — Use Claude/GPT to translate to Thai
3. **Human review** — Native speaker reviews for accuracy and cultural nuances
4. **Finalize** — Publish bilingual content

### Astro i18n Setup
**No, write bilingual content inline** — Since we're mixing languages on the same page (not separate language versions), Astro's i18n features aren't needed. Simpler setup.

## Consequences

### Positive
- Matches natural Thai developer communication style
- No language switching friction for learners
- Single page to maintain (not two separate versions)
- English technical terms remain searchable and recognizable

### Negative
- Need to ensure consistent translation quality
- AI translation requires human review for accuracy
- Some content may read awkwardly if translation is poor

### Risks
- AI translation may miss cultural nuances
- Mitigation: Human review by native Thai speaker
- Technical terms may confuse absolute beginners
- Mitigation: Provide glossary with Thai explanations

## Alternatives Considered

1. **Full page translation (separate pages)**: Rejected — doubles maintenance, adds language switching friction
2. **Thai summaries only**: Rejected — loses detail for non-native English speakers
3. **Language toggle**: Rejected — same as full page translation, just different UI
4. **Manual translation only**: Rejected — too slow, AI-assisted is faster with quality review

## References

- Wayfinder Ticket #004: Thai Translation Workflow
- Course Context: Bilingual workshop format, Thai + English
- Astro i18n Documentation: https://docs.astro.build/en/guides/internationalization/
