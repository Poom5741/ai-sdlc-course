# Prompt: Resolve Wayfinder Ticket with Goal Skill

## Purpose

A prompt that follows Matt Pocock's skill process 100% while using goal tracking to complete wayfinder tickets.

---

## Full Prompt

```
I want to resolve wayfinder ticket #2 (Content Extraction Strategy) from the map at issue #1.

Follow this exact process:

## 1. Load Context
- Read the wayfinder map (issue #1)
- Read ticket #2 body
- Check what's in CONTEXT.md and any ADRs

## 2. Research (if needed)
- Use NotebookLM to investigate the best content extraction approach
- Document findings in a research file

## 3. Grilling Session
- Run /grilling to sharpen the decision
- Ask about: extraction method, Thai/English handling, verification approach
- Record decisions as ADRs

## 4. Domain Modeling
- Update CONTEXT.md with any new terms
- Challenge fuzzy language
- Add resolved terms to glossary

## 5. Record Resolution
- Post resolution comment on issue #2
- Close issue #2
- Update map issue #1 with decision in "Decisions so far"

## 6. Graduate Fog
- If any new tickets emerged, create them
- Update "Not yet specified" section on map

## 7. Goal Tracking
- Mark task complete
- Update progress

Start by reading the map and ticket, then run the grilling session.
```

---

## Process Mapping

| Step | Skill Used | Purpose |
|------|------------|---------|
| 1. Load Context | Wayfinder | Orient to the map |
| 2. Research | `/research` | Get facts before deciding |
| 3. Grilling | `/grilling` | Make the decision |
| 4. Domain Modeling | `/domain-modeling` | Capture vocabulary |
| 5. Record Resolution | Wayfinder | Close the ticket |
| 6. Graduate Fog | Wayfinder | Clear the fog |
| 7. Goal Tracking | Goal skill | Track progress |

---

## Shorter Version

```
Resolve wayfinder ticket #2 following the wayfinder process:
1. Read map (#1) and ticket (#2)
2. Research content extraction options using NotebookLM
3. Run grilling session to decide
4. Update CONTEXT.md with new terms
5. Post resolution, close ticket, update map
6. Create any new tickets that emerged
```

---

## Usage

1. Replace `#2` with the actual ticket number
2. Replace "Content Extraction Strategy" with the actual ticket title
3. Run in Pi with goal mode active

---

## Notes

- This prompt follows the wayfinder skill's "Work through the map" process
- It integrates with Matt Pocock's engineering skills (grilling, domain-modeling)
- Goal tracking provides progress visibility
- Each ticket resolution follows the same pattern
