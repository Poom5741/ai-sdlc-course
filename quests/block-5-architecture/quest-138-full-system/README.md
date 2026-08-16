# Quest 5.2: Full System Design

**Block**: 5 - Architecture | **Difficulty**: 🔴 Hard | **Time**: 25 minutes

## 🎯 Learning Objectives

- Architect a complete system: components, interfaces, and data flow.
- **Specify interfaces before implementing** — fix the contracts first so each component can be built and tested in isolation.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/block-5-architecture/quest-14-full-system my-quest
cd my-quest
```

1. Pick a system. The reference example is an **automated PR reviewer**
   (when a PR opens → fetch diff → analyze → LLM review → post comment), but
   you may choose your own (chatbot, content generator, etc.).
2. Design the system in `system-design.md` in THIS folder. Include:
   - **Component diagram**: a fenced ``` code block with arrows (→ or -->)
   - **Interface contracts**: for each component ("interface", "contract", or "API") — function signatures + I/O types
   - **Data flow**: how data moves through the pipeline ("data flow" or "flow:")
   - **Named components**: at least 3 distinct component names
3. Verify:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` is a **design-doc validator** — it checks that
`system-design.md` exists and contains a fenced diagram, interface
contracts, a data flow description, ≥ 3 named components, and at least 500
characters of substance. It does NOT run code.

## 💡 Hints

- Name components as nouns (WebhookHandler, DiffFetcher, Reviewer). The validator counts distinct capitalized names.
- The diagram is a fenced ``` block. Use ASCII arrows (`→` or `-->`) for flow; Mermaid (`graph LR`) also works.
- "Specify interfaces before implementing" means write the function signature + I/O types for each component BEFORE you describe how it works internally.
- A clean data flow has one wire: stage N's output is stage N+1's input. If two components talk out-of-band, model the seam explicitly.