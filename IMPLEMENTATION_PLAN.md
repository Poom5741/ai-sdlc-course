# Implementation Plan: AI SDLC Workshop & Interactive Docs

## 📋 Project Summary

**Goal**: Create a modern AI SDLC workshop + interactive learning platform
**Duration**: 8-hour one-day workshop
**Platform**: Astro + Starlight interactive docs
**Audience**: Non-tech beginners + experienced devs struggling with vibe coding

---

## 🎯 Deliverables

### 1. Workshop Materials (8 hours)
- [ ] Workshop slides (Google Slides/Reveal.js)
- [ ] Instructor guide
- [ ] Learner handouts
- [ ] CTF challenge instructions

### 2. CTF Challenges (14 total)
- [ ] 5 Easy challenges (🟢)
- [ ] 5 Medium challenges (🟡)
- [ ] 4 Hard challenges (🔴)

### 3. Interactive Docs Platform
- [ ] Astro + Starlight setup
- [ ] Workshop content pages
- [ ] Challenge pages with flag submission
- [ ] Reference documentation
- [ ] Thai language support

### 4. Supporting Materials
- [ ] Pre-workshop setup guide
- [ ] Post-workshop learning path
- [ ] Tool comparison guides

---

## 📅 Implementation Timeline

### Phase 1: Foundation (Week 1)
- [ ] Set up Astro project
- [ ] Create basic structure
- [ ] Write first 3 challenges

### Phase 2: Content (Week 2)
- [ ] Complete all 14 challenges
- [ ] Write workshop slides
- [ ] Create reference docs

### Phase 3: Polish (Week 3)
- [ ] Add Thai translations
- [ ] Test with users
- [ ] Iterate based on feedback

### Phase 4: Launch (Week 4)
- [ ] Deploy platform
- [ ] Run pilot workshop
- [ ] Gather feedback

---

## 🛠️ Tech Stack

### Interactive Docs
- **Framework**: Astro + Starlight
- **Styling**: Tailwind CSS
- **Code**: MDX
- **Deployment**: Vercel/Netlify

### Challenges
- **Code Challenges**: Browser-based playgrounds
- **Architecture Challenges**: Markdown submission
- **Validation**: Automated tests + AI grading

---

## 📚 Content Structure

### Workshop Blocks

| Block | Topic | Duration | Challenges |
|-------|-------|----------|------------|
| 1 | AI Tools Setup | 90 min | 3 |
| 2 | Prompt Engineering | 90 min | 3 |
| 3 | Security | 90 min | 3 |
| 4 | Agentic Workflows | 90 min | 3 |
| 5 | Architecture | 90 min | 2 |

### Challenge Types

1. **Code Fix** (Security)
   - Find vulnerabilities
   - Fix and harden code

2. **Build** (Prompting)
   - Write effective prompts
   - Generate better code

3. **Design** (Architecture)
   - System design decisions
   - Trade-off analysis

---

## 🎨 Design Principles

### 1. Integrated Contrast
Every module shows:
- ❌ Vibe coding mistake
- ✅ Proper engineering approach

### 2. Progressive Difficulty
- 🟢 Easy: Beginners can complete
- 🟡 Medium: Requires understanding
- 🔴 Hard: Expert level

### 3. Immediate Application
- 30 min theory → 60 min practice
- Learn by doing, not just watching

### 4. Bilingual Support
- Thai explanations
- English technical terms
- Matches how Thai devs speak

---

## 📊 Success Metrics

### Workshop
- [ ] 90% completion rate for Easy challenges
- [ ] 70% completion rate for Medium challenges
- [ ] 50% completion rate for Hard challenges
- [ ] 4.5/5 average satisfaction score

### Interactive Docs
- [ ] 1000+ monthly visitors
- [ ] 50% return visitors
- [ ] Average session > 10 minutes

---

## 🚀 Next Steps

### Immediate (Today)
1. ✅ Finalize workshop structure
2. ✅ Create project files
3. ✅ Set up Astro project

### This Week
1. Create first 3 challenges
2. Write Block 1 content
3. Set up deployment

### This Month
1. Complete all challenges
2. Launch interactive docs
3. Run pilot workshop

---

## 📝 Files Created

```
ai-sdlc-course/
├── CONTEXT.md                    # Domain model
├── COURSE_OUTLINE.md             # Original outline
├── WORKSHOP_STRUCTURE.md         # Detailed workshop plan
├── IMPLEMENTATION_PLAN.md        # This file
├── docs/
│   └── adr/
│       ├── 0001-workshop-format.md
│       ├── 0002-interactive-docs-platform.md
│       └── 0003-ctf-challenge-system.md
└── interactive-docs/
    ├── README.md
    ├── package.json
    ├── astro.config.mjs
    └── src/
        ├── content/docs/
        │   └── challenges/
        │       └── setup-olympics.mdx
        └── styles/
            └── custom.css
```

---

## 🎯 Ready to Build!

All architecture decisions documented, workshop structure finalized, and interactive docs scaffolded.

**Next action**: Start implementing the first block and challenges!
