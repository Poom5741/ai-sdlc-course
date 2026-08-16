# Quest 24.3: GitHub Project Board Builder

**Block**: 24 - GitHub Project Management | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Design a GitHub Projects (v2) board with custom fields, views, workflows.
- **Plan your workflow** — a board without clear columns and automation is just a to-do list; design for how work actually flows.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/module-11/block-24-github-projects/quest-126-project-board my-quest
   cd my-quest
   ```
2. **Create `project-board-design.md`** describing your GitHub Projects board design.
3. **Include required sections**: Overview, Columns, Custom Fields, Views, Automation, Swimlanes.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

```bash
node test.js
```

`node test.js` is a **design-doc validator** — it checks that `project-board-design.md` exists and contains the required sections plus ≥ 500 characters of substance.

## 💡 Hints

- Design for a real project you're working on.
- Columns should reflect your actual workflow (e.g., Backlog → In Progress → Review → Done).
- Automation rules save time: auto-move on PR merge, auto-assign on issue creation.
