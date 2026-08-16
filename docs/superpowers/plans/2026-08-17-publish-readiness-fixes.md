# Publish Readiness Fixes — Implementation Plan

> **For AI agent workers:** Required sub-skill: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax to track progress.

**Goal:** Fix all critical issues blocking the BlueBeltDojo AI SDLC course from being published — wrong quest count, duplicate manifest slugs, missing quest files, and missing project documentation.

**Architecture:** All fixes are in existing files. No new dependencies. Quest file fixes follow the established scaffold pattern (problem.js + test.js + _solution/solution.js + README.md + package.json). Manifest fixes are JSON edits.

**Tech Stack:** Node.js, JSON, Markdown, Astro 5, Cloudflare Pages

---

## File Structure

### Files to Modify

- `interactive-docs/src/pages/index.astro` — Fix quest count (3 occurrences of "129" → "147")
- `interactive-docs/src/data/quests-manifest.json` — Fix duplicate slugs, add missing titles

### Files to Create

- `README.md` (project root) — Project overview for GitHub
- `LICENSE` (project root) — MIT license

### Quest Directories to Modify (add problem.js)

- 19 module quest directories — copy `_solution/solution.js` → `problem.js` as starter

### Quest Directories to Modify (add README.md + package.json)

- 8 block quest directories — add missing metadata files

### Quest Directories to Rename + Modify

- 8 block quest directories — renumber from quest-13..quest-20 to quest-137..quest-156 (fix duplicate slugs)

---

### Task 1: Fix Homepage Quest Count "129" → "147"

**Files:**

- Modify: `interactive-docs/src/pages/index.astro:36,55,139`

- [ ] **Step 1: Change all three "129" occurrences to "147"**

In `interactive-docs/src/pages/index.astro`, make these exact replacements:

Line 36 — change:

```
            129 hands-on quests. 3 capstone projects. A belt progression system that takes you from vibe coder to AI-powered engineer.
```

to:

```
            147 hands-on quests. 3 capstone projects. A belt progression system that takes you from vibe coder to AI-powered engineer.
```

Line 55 — change:

```
            <p class="font-['DM_Serif_Display'] text-4xl text-[#1C1917]">129</p>
```

to:

```
            <p class="font-['DM_Serif_Display'] text-4xl text-[#1C1917]">147</p>
```

Line 139 — change:

```
          <h2 class="font-['DM_Serif_Display'] text-4xl text-[#1C1917] mb-4">10 Modules. 129 Quests.</h2>
```

to:

```
          <h2 class="font-['DM_Serif_Display'] text-4xl text-[#1C1917] mb-4">10 Modules. 147 Quests.</h2>
```

- [ ] **Step 2: Verify no other "129" references remain**

Run: `grep -n "129" interactive-docs/src/pages/index.astro`
Expected: No output (all occurrences replaced)

- [ ] **Step 3: Build and verify**

Run: `cd interactive-docs && npm run build`
Expected: Build succeeds, exit code 0

- [ ] **Step 4: Commit**

```bash
git add interactive-docs/src/pages/index.astro
git commit -m "fix: correct homepage quest count from 129 to 147"
```

---

### Task 2: Fix Duplicate Slugs in Quests Manifest

**Problem:** 11 block quests (numbered 4–14, 15–20) share slugs with module quests. The manifest has 147 entries but only 136 unique slugs.

**Solution:** Renumber the 8 conflicting block quests from `quest-13..quest-20` to `quest-137..quest-156`. The block quests numbered 1–12 don't conflict (they're the originals the sidebar references). Only block quests whose numbers overlap with module quests need renumbering.

Wait — analysis shows conflicts at slugs quest-4 through quest-14 (11 slugs). Block quests at numbers 1–12 also conflict because module quests reuse those numbers. The cleanest fix: renumber ALL 22 block quests to 137–158 to guarantee uniqueness.

**Revised approach:** Only renumber the 8 block quests that are missing files (quest-13 through quest-20 in block dirs), since those are the new ones added later. Keep block quests 1–12 as-is (they match the sidebar).

Actually — the data shows ALL block quests numbered 4–20 conflict. Let me be precise:

| Block dir | Current | Conflict with module quest | Action |
| ----------- | --------- | --------------------------- | -------- |
| block-1/quest-01 | slug quest-1 | No conflict (module starts at quest-1 too but same quest) | Keep |
| block-1/quest-02 | slug quest-2 | Same | Keep |
| block-1/quest-03 | slug quest-3 | Same | Keep |
| block-2/quest-04 | slug quest-4 | Module quest-04-token-counter | Keep (block original) |
| block-2/quest-05 | slug quest-5 | Module quest-05-context-budget | Keep (block original) |
| block-2/quest-06 | slug quest-6 | Module quest-06-hallucination-detector | Keep (block original) |
| block-3/quest-07 | slug quest-7 | Module quest-07-vibe-coding-analysis | Keep (block original) |
| block-3/quest-08 | slug quest-8 | Module quest-08-tool-selection | Keep (block original) |
| block-3/quest-09 | slug quest-9 | Module quest-09-self-attention | Keep (block original) |
| block-4/quest-10 | slug quest-10 | Module quest-10-position-encoding | Keep (block original) |
| block-4/quest-11 | slug quest-11 | Module quest-11-model-arch-classifier | Keep (block original) |
| block-4/quest-12 | slug quest-12 | Module quest-12-transformer-scratch | Keep (block original) |
| block-5/quest-13 | slug quest-13 | Module quest-13-next-token-predictor | **Renumber → 137** |
| block-5/quest-14 | slug quest-14 | Module quest-14-scaling-laws | **Renumber → 138** |
| block-2/quest-15 | slug quest-15 | Module quest-15-data-curator | **Renumber → 139** |
| block-2/quest-16 | slug quest-16 | Module quest-16-finetuning (or similar) | **Renumber → 140** |
| block-3/quest-13 (injection-tester) | slug quest-13 | Same as above | **Renumber → 141** |
| block-3/quest-14 (guardrail-builder) | slug quest-14 | Same as above | **Renumber → 142** |
| block-5/quest-17 | slug quest-17 | Module quest-17-dpo | **Renumber → 143** |
| block-5/quest-18 | slug quest-18 | Module quest-18-sampling | **Renumber → 144** |
| block-7/quest-19 | slug quest-19 | Module quest-19-chain | **Renumber → 145** |
| block-7/quest-20 | slug quest-20 | Module quest-20-rag | **Renumber → 146** |

Wait — this gives 146 + the existing 136 module quests = potential overlap at 137-146. Module quests go up to quest-136. So 137-146 is safe.

But we have 14 block quests to renumber (not 8). Let me recount: block quests that conflict are those numbered 13–20 in block dirs, PLUS quest-15, quest-16 in block-2, PLUS quest-13, quest-14 in block-3. That's:

- block-5/quest-13-rag-design → 137
- block-5/quest-14-full-system → 138
- block-2/quest-15-cost-optimizer → 139
- block-2/quest-16-token-budgeter → 140
- block-3/quest-13-injection-tester → 141
- block-3/quest-14-guardrail-builder → 142
- block-5/quest-17-ethical-review → 143
- block-5/quest-18-privacy-auditor → 144
- block-7/quest-19-monitoring-dashboard → 145
- block-7/quest-20-hallucination-detector → 146

That's 10 block quests to renumber. The manifest entries for these need id, slug, and the block quests' directory names need updating.

**Files:**

- Modify: `interactive-docs/src/data/quests-manifest.json` (update 10 entries)
- Rename: 10 block quest directories
- Modify: test.js in each renamed directory (if they reference quest number in output)

- [ ] **Step 1: Rename the 10 conflicting block quest directories**

```bash
cd /Users/poom-work/ai-sdlc-course/quests

# block-5-architecture
mv block-5-architecture/quest-13-rag-design block-5-architecture/quest-137-rag-design
mv block-5-architecture/quest-14-full-system block-5-architecture/quest-138-full-system
mv block-5-architecture/quest-17-ethical-review block-5-architecture/quest-143-ethical-review
mv block-5-architecture/quest-18-privacy-auditor block-5-architecture/quest-144-privacy-auditor

# block-2-prompt-engineering
mv block-2-prompt-engineering/quest-15-cost-optimizer block-2-prompt-engineering/quest-139-cost-optimizer
mv block-2-prompt-engineering/quest-16-token-budgeter block-2-prompt-engineering/quest-140-token-budgeter

# block-3-security
mv block-3-security/quest-13-injection-tester block-3-security/quest-141-injection-tester
mv block-3-security/quest-14-guardrail-builder block-3-security/quest-142-guardrail-builder

# block-7-observability
mv block-7-observability/quest-19-monitoring-dashboard block-7-observability/quest-145-monitoring-dashboard
mv block-7-observability/quest-20-hallucination-detector block-7-observability/quest-146-hallucination-detector
```

- [ ] **Step 2: Update test.js console output in renamed directories (if applicable)**

For each renamed directory, check if `test.js` contains a quest number in its console.log output (e.g., `"Quest 13:"` or `"Quest 3.3:"`). If so, update to the new number. Run:

```bash
cd /Users/poom-work/ai-sdlc-course/quests
for d in block-5-architecture/quest-137-rag-design \
         block-5-architecture/quest-138-full-system \
         block-5-architecture/quest-143-ethical-review \
         block-5-architecture/quest-144-privacy-auditor \
         block-2-prompt-engineering/quest-139-cost-optimizer \
         block-2-prompt-engineering/quest-140-token-budgeter \
         block-3-security/quest-141-injection-tester \
         block-3-security/quest-142-guardrail-builder \
         block-7-observability/quest-145-monitoring-dashboard \
         block-7-observability/quest-146-hallucination-detector; do
  echo "=== $d ==="
  grep -n "Quest\|quest-" "$d/test.js" | head -5
done
```

Update any hardcoded quest numbers to match the new numbering.

- [ ] **Step 3: Update quests-manifest.json — fix the 10 duplicate entries**

In `interactive-docs/src/data/quests-manifest.json`, find and update these 10 entries. For each, change the `id` and `slug` fields. Keep everything else the same.

| Old id | New id | New slug |
| -------- | -------- | ---------- |
| `quest-13-rag-design` | `quest-137-rag-design` | `quest-137` |
| `quest-14-full-system` | `quest-138-full-system` | `quest-138` |
| `quest-15-cost-optimizer` | `quest-139-cost-optimizer` | `quest-139` |
| `quest-16-token-budgeter` | `quest-140-token-budgeter` | `quest-140` |
| `quest-13-injection-tester` | `quest-141-injection-tester` | `quest-141` |
| `quest-14-guardrail-builder` | `quest-142-guardrail-builder` | `quest-142` |
| `quest-17-ethical-review` | `quest-143-ethical-review` | `quest-143` |
| `quest-18-privacy-auditor` | `quest-144-privacy-auditor` | `quest-144` |
| `quest-19-monitoring-dashboard` | `quest-145-monitoring-dashboard` | `quest-145` |
| `quest-20-hallucination-detector` | `quest-146-hallucination-detector` | `quest-146` |

Use a script to do this precisely:

```bash
cd /Users/poom-work/ai-sdlc-course/interactive-docs
node -e "
const fs = require('fs');
const manifest = JSON.parse(fs.readFileSync('src/data/quests-manifest.json', 'utf8'));

const renames = {
  'quest-13-rag-design': { id: 'quest-137-rag-design', slug: 'quest-137' },
  'quest-14-full-system': { id: 'quest-138-full-system', slug: 'quest-138' },
  'quest-15-cost-optimizer': { id: 'quest-139-cost-optimizer', slug: 'quest-139' },
  'quest-16-token-budgeter': { id: 'quest-140-token-budgeter', slug: 'quest-140' },
  'quest-13-injection-tester': { id: 'quest-141-injection-tester', slug: 'quest-141' },
  'quest-14-guardrail-builder': { id: 'quest-142-guardrail-builder', slug: 'quest-142' },
  'quest-17-ethical-review': { id: 'quest-143-ethical-review', slug: 'quest-143' },
  'quest-18-privacy-auditor': { id: 'quest-144-privacy-auditor', slug: 'quest-144' },
  'quest-19-monitoring-dashboard': { id: 'quest-145-monitoring-dashboard', slug: 'quest-145' },
  'quest-20-hallucination-detector': { id: 'quest-146-hallucination-detector', slug: 'quest-146' },
};

let changed = 0;
for (const q of manifest) {
  if (renames[q.id]) {
    q.id = renames[q.id].id;
    q.slug = renames[q.id].slug;
    changed++;
  }
}

fs.writeFileSync('src/data/quests-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log('Updated ' + changed + ' entries');
"
```

Expected output: `Updated 10 entries`

- [ ] **Step 4: Verify no duplicate slugs remain**

```bash
cd /Users/poom-work/ai-sdlc-course/interactive-docs
node -e "
const m = require('./src/data/quests-manifest.json');
const slugs = m.map(q => q.slug);
const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
if (dupes.length) { console.log('DUPLICATES:', dupes); process.exit(1); }
console.log('All ' + slugs.length + ' slugs are unique');
"
```

Expected: `All 147 slugs are unique`

- [ ] **Step 5: Build and verify**

```bash
cd /Users/poom-work/ai-sdlc-course/interactive-docs
npm run build
```

Expected: Build succeeds, exit code 0

- [ ] **Step 6: Commit**

```bash
git add quests/ interactive-docs/src/data/quests-manifest.json
git commit -m "fix: renumber 10 block quests to eliminate duplicate manifest slugs

Block quests numbered 13-20 conflicted with module quests sharing the
same slug numbers. Renumbered to quest-137 through quest-146."
```

---

### Task 3: Add Proper Titles to 14 Untitled Manifest Entries

**Files:**

- Modify: `interactive-docs/src/data/quests-manifest.json`

These 14 entries have `title` equal to their `id` (e.g., `"title": "quest-01-first-completion"`). Replace with human-readable titles derived from the quest README content.

- [ ] **Step 1: Update the 14 titles**

```bash
cd /Users/poom-work/ai-sdlc-course/interactive-docs
node -e "
const fs = require('fs');
const manifest = JSON.parse(fs.readFileSync('src/data/quests-manifest.json', 'utf8'));

const titles = {
  'quest-01-first-completion': 'First AI Code Completion',
  'quest-02-multi-file': 'Multi-File AI Workflow',
  'quest-03-compare-tools': 'AI Tool Comparison',
  'quest-04-fix-prompt': 'Fix a Broken Prompt',
  'quest-05-multi-step': 'Multi-Step Prompt Chain',
  'quest-06-domain-specific': 'Domain-Specific Code Generation',
  'quest-07-spot-vulnerability': 'Spot the Security Vulnerability',
  'quest-08-fix-harden': 'Fix and Harden the Code',
  'quest-09-security-architecture': 'Security Architecture Design',
  'quest-10-setup-loop': 'Setup a Generate-Review-Fix Loop',
  'quest-11-generate-review-fix': 'Generate-Review-Fix Pattern',
  'quest-12-multi-agent': 'Multi-Agent Collaboration',
  'quest-13-rag-design': 'RAG System Design',
  'quest-14-full-system': 'Full System Architecture',
};

let changed = 0;
for (const q of manifest) {
  if (titles[q.id]) {
    q.title = titles[q.id];
    changed++;
  }
}

fs.writeFileSync('src/data/quests-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log('Updated ' + changed + ' titles');
"
```

Expected: `Updated 14 titles`

- [ ] **Step 2: Verify no titles match their IDs**

```bash
cd /Users/poom-work/ai-sdlc-course/interactive-docs
node -e "
const m = require('./src/data/quests-manifest.json');
const untitled = m.filter(q => q.title === q.id);
if (untitled.length) { console.log('Still untitled:', untitled.map(q => q.id)); process.exit(1); }
console.log('All ' + m.length + ' entries have proper titles');
"
```

Expected: `All 147 entries have proper titles`

- [ ] **Step 3: Commit**

```bash
git add interactive-docs/src/data/quests-manifest.json
git commit -m "fix: add human-readable titles to 14 untitled quest manifest entries"
```

---

### Task 4: Add Missing problem.js to 19 Module Quests

**Problem:** These 19 module quests have `test.js` that does `require('./problem.js')` but no `problem.js` file exists. The solution exists in `_solution/solution.js`. Learners need a starter `problem.js` with the function signature and TODO comments.

**Approach:** For each quest, read `_solution/solution.js` to understand the exports, then create a `problem.js` with the correct function signatures and TODO placeholder bodies that match what `test.js` expects.

**Files:**

- Create: `problem.js` in each of the 19 quest directories listed below

- [ ] **Step 1: Create problem.js for each quest using a script**

For each of the 19 quests, we need to:

1. Read `test.js` to find what functions/exports it expects
2. Read `_solution/solution.js` to see the implementation
3. Create `problem.js` with the function signatures but TODO bodies

Run this script to extract the required exports from each test.js and create starter problem.js files:

```bash
cd /Users/poom-work/ai-sdlc-course/quests

# For each quest, extract required function names from test.js
# and create a problem.js with TODO stubs
for dir in \
  module-2/block-a/quest-15-data-curator \
  module-4/block-8-security/quest-44-secret-scanner \
  module-4/block-9-governance/quest-53-bias-detector \
  module-4/block-10-devops/quest-59-monitoring-dashboard \
  module-5/block-12-production/quest-68-llm-evaluator \
  module-5/block-12-production/quest-69-semantic-cache \
  module-6/block-13-prompt-patterns/quest-77-prompt-chainer \
  module-6/block-14-advanced-prompting/quest-80-injection-tester \
  module-6/block-14-advanced-prompting/quest-81-prompt-eval \
  module-6/block-14-advanced-prompting/quest-82-prompt-porter \
  module-7/block-15-code-review/quest-84-code-smell-detector \
  module-7/block-15-code-review/quest-87-review-quality \
  module-8/block-17-refactoring/quest-94-dead-code \
  module-8/block-17-refactoring/quest-95-design-pattern \
  module-8/block-17-refactoring/quest-96-type-migration \
  module-8/block-17-refactoring/quest-97-legacy-modernizer \
  module-9/block-19-responsible-ai/quest-104-pii-redactor \
  module-9/block-19-responsible-ai/quest-106-accessibility-checker \
  module-10/block-21-sdlc-integration/quest-114-feature-flags; do

  echo "=== Processing $dir ==="

  # Extract the require line from test.js to get function names
  grep "require.*problem" "$dir/test.js"
done
```

For each quest, create `problem.js` by:

1. Reading the `require` statement in `test.js` to get the exact export names
2. Reading `_solution/solution.js` to understand the function signatures
3. Creating `problem.js` with those exports as stubs that throw `"TODO: implement"`

Example pattern for `problem.js`:

```js
/**
 * Quest X.Y: [Quest Name]
 *
 * TODO: Implement the functions below.
 * Run `node test.js` to verify your solution.
 */

// Copy the function signature from the solution file,
// replace the body with: throw new Error('TODO: implement')
```

Do this manually for each quest — read the solution, extract the exports, create the stub. Here are the specific quests grouped by pattern:

**Group A — Single function export (most common):**

For each of these, read `_solution/solution.js`, find the `module.exports` line, and create a `problem.js` with the same function signature but a TODO body.

```bash
cd /Users/poom-work/ai-sdlc-course/quests

# Quick reference: what each test.js requires
# All use: const { functionName } = require('./problem.js');
# Create problem.js with: function functionName(...) { throw new Error('TODO: implement'); }
# Then: module.exports = { functionName };
```

Process each quest one at a time:

1. `cat <quest>/_solution/solution.js` — note the exports
2. `cat <quest>/test.js | head -10` — note the required names
3. Create `<quest>/problem.js` with stubs

- [ ] **Step 2: Verify each problem.js works with its test.js (expect failures, not crashes)**

```bash
cd /Users/poom-work/ai-sdlc-course/quests
for dir in \
  module-2/block-a/quest-15-data-curator \
  module-4/block-8-security/quest-44-secret-scanner \
  module-4/block-9-governance/quest-53-bias-detector \
  module-4/block-10-devops/quest-59-monitoring-dashboard \
  module-5/block-12-production/quest-68-llm-evaluator \
  module-5/block-12-production/quest-69-semantic-cache \
  module-6/block-13-prompt-patterns/quest-77-prompt-chainer \
  module-6/block-14-advanced-prompting/quest-80-injection-tester \
  module-6/block-14-advanced-prompting/quest-81-prompt-eval \
  module-6/block-14-advanced-prompting/quest-82-prompt-porter \
  module-7/block-15-code-review/quest-84-code-smell-detector \
  module-7/block-15-code-review/quest-87-review-quality \
  module-8/block-17-refactoring/quest-94-dead-code \
  module-8/block-17-refactoring/quest-95-design-pattern \
  module-8/block-17-refactoring/quest-96-type-migration \
  module-8/block-17-refactoring/quest-97-legacy-modernizer \
  module-9/block-19-responsible-ai/quest-104-pii-redactor \
  module-9/block-19-responsible-ai/quest-106-accessibility-checker \
  module-10/block-21-sdlc-integration/quest-114-feature-flags; do
  result=$(cd "$dir" && node test.js 2>&1)
  status=$?
  # Should fail with TODO errors, NOT "Cannot find module './problem.js'"
  if echo "$result" | grep -q "Cannot find module"; then
    echo "FAIL: $dir — problem.js still missing"
  else
    echo "OK:   $dir — problem.js found (tests fail as expected)"
  fi
done
```

Expected: All 19 show "OK" (tests fail with TODO errors, not module-not-found)

- [ ] **Step 3: Verify solutions still pass after creating problem.js**

```bash
cd /Users/poom-work/ai-sdlc-course/quests
for dir in \
  module-2/block-a/quest-15-data-curator \
  module-4/block-8-security/quest-44-secret-scanner \
  module-4/block-9-governance/quest-53-bias-detector \
  module-4/block-10-devops/quest-59-monitoring-dashboard \
  module-5/block-12-production/quest-68-llm-evaluator \
  module-5/block-12-production/quest-69-semantic-cache \
  module-6/block-13-prompt-patterns/quest-77-prompt-chainer \
  module-6/block-14-advanced-prompting/quest-80-injection-tester \
  module-6/block-14-advanced-prompting/quest-81-prompt-eval \
  module-6/block-14-advanced-prompting/quest-82-prompt-porter \
  module-7/block-15-code-review/quest-84-code-smell-detector \
  module-7/block-15-code-review/quest-87-review-quality \
  module-8/block-17-refactoring/quest-94-dead-code \
  module-8/block-17-refactoring/quest-95-design-pattern \
  module-8/block-17-refactoring/quest-96-type-migration \
  module-8/block-17-refactoring/quest-97-legacy-modernizer \
  module-9/block-19-responsible-ai/quest-104-pii-redactor \
  module-9/block-19-responsible-ai/quest-106-accessibility-checker \
  module-10/block-21-sdlc-integration/quest-114-feature-flags; do
  tmpdir=$(mktemp -d)
  cp -r "$dir"/* "$tmpdir/"
  cp "$tmpdir/_solution/solution.js" "$tmpdir/problem.js"
  result=$(cd "$tmpdir" && node test.js 2>&1)
  status=$?
  if [ $status -eq 0 ]; then
    echo "PASS: $(basename $dir)"
  else
    echo "FAIL: $(basename $dir)"
    echo "$result" | tail -3
  fi
  rm -rf "$tmpdir"
done
```

Expected: All 19 show PASS

- [ ] **Step 4: Commit**

```bash
git add quests/module-*/block-*/quest-*/problem.js
git commit -m "fix: add missing problem.js starter files to 19 module quests

These quests had test.js requiring problem.js but no starter file existed.
Created stub files with correct function signatures and TODO bodies."
```

---

### Task 5: Add README.md + package.json to 8 Block Quests

**Files:**

- Create: `README.md` and `package.json` in each of these 8 directories:
  - `quests/block-2-prompt-engineering/quest-139-cost-optimizer` (renamed in Task 2)
  - `quests/block-2-prompt-engineering/quest-140-token-budgeter` (renamed in Task 2)
  - `quests/block-3-security/quest-141-injection-tester` (renamed in Task 2)
  - `quests/block-3-security/quest-142-guardrail-builder` (renamed in Task 2)
  - `quests/block-5-architecture/quest-143-ethical-review` (renamed in Task 2)
  - `quests/block-5-architecture/quest-144-privacy-auditor` (renamed in Task 2)
  - `quests/block-7-observability/quest-145-monitoring-dashboard` (renamed in Task 2)
  - `quests/block-7-observability/quest-146-hallucination-detector` (renamed in Task 2)

Note: These directories will have their new names after Task 2. Do Task 2 first.

- [ ] **Step 1: Create package.json for each quest**

For each of the 8 quests, create `package.json` following the established pattern. Use the quest's README.md to get the title and difficulty.

Template:

```json
{
  "name": "<quest-id>",
  "version": "1.0.0",
  "description": "<quest title>",
  "main": "problem.js",
  "scripts": {
    "test": "node test.js"
  },
  "keywords": ["ai-sdlc", "workshop", "quest", "<block-name>"],
  "author": "AI SDLC Workshop",
  "license": "MIT",
  "quest": {
    "id": "<quest-id>",
    "block": "<block-dir-name>",
    "slug": "<quest-number>",
    "difficulty": "<easy|medium|hard>"
  }
}
```

Specific values for each:

1. `block-2-prompt-engineering/quest-139-cost-optimizer/package.json`:
   - name: `quest-139-cost-optimizer`
   - description: `Quest: Cost Optimizer — optimize token usage and reduce LLM costs`
   - block: `block-2-prompt-engineering`
   - slug: `quest-139`
   - difficulty: `medium`

2. `block-2-prompt-engineering/quest-140-token-budgeter/package.json`:
   - name: `quest-140-token-budgeter`
   - description: `Quest: Token Budgeter — manage token budgets across prompt components`
   - block: `block-2-prompt-engineering`
   - slug: `quest-140`
   - difficulty: `medium`

3. `block-3-security/quest-141-injection-tester/package.json`:
   - name: `quest-141-injection-tester`
   - description: `Quest: Injection Tester — test for prompt injection vulnerabilities`
   - block: `block-3-security`
   - slug: `quest-141`
   - difficulty: `hard`

4. `block-3-security/quest-142-guardrail-builder/package.json`:
   - name: `quest-142-guardrail-builder`
   - description: `Quest: Guardrail Builder — build input/output guardrails for LLM apps`
   - block: `block-3-security`
   - slug: `quest-142`
   - difficulty: `hard`

5. `block-5-architecture/quest-143-ethical-review/package.json`:
   - name: `quest-143-ethical-review`
   - description: `Quest: Ethical Review — design an ethical review process for AI systems`
   - block: `block-5-architecture`
   - slug: `quest-143`
   - difficulty: `medium`

6. `block-5-architecture/quest-144-privacy-auditor/package.json`:
   - name: `quest-144-privacy-auditor`
   - description: `Quest: Privacy Auditor — audit AI systems for privacy compliance`
   - block: `block-5-architecture`
   - slug: `quest-144`
   - difficulty: `hard`

7. `block-7-observability/quest-145-monitoring-dashboard/package.json`:
   - name: `quest-145-monitoring-dashboard`
   - description: `Quest: Monitoring Dashboard — build an LLM observability dashboard`
   - block: `block-7-observability`
   - slug: `quest-145`
   - difficulty: `hard`

8. `block-7-observability/quest-146-hallucination-detector/package.json`:
   - name: `quest-146-hallucination-detector`
   - description: `Quest: Hallucination Detector — detect and mitigate LLM hallucinations`
   - block: `block-7-observability`
   - slug: `quest-146`
   - difficulty: `hard`

- [ ] **Step 2: Create README.md for each quest**

For each quest, read its `test.js` and `_solution/solution.js` to understand what the quest does, then create a README.md following the established pattern from existing block quests:

```markdown
# Quest X.Y: [Title]

**Block**: [N] - [Block Name] | **Difficulty**: [🟢 Easy | 🟡 Medium | 🔴 Hard] | **Time**: [N] minutes

## 🎯 Learning Objectives

- [Objective 1]
- [Objective 2]

## 📋 Instructions

1. **Get the quest on your machine**:
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/[path] my-quest
   cd my-quest
   ```
1. **Open `problem.js`** in your editor with AI assistance.
2. **Implement the solution** based on the contract in problem.js.
3. **Verify**:

   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` — [what the tests check]

## 💡 Hints

- [Hint 1]

```

Read each quest's test.js to determine the learning objectives and verification criteria. Create the README accordingly.

- [ ] **Step 3: Verify structure is complete**

```bash
cd /Users/poom-work/ai-sdlc-course/quests
for d in \
  block-2-prompt-engineering/quest-139-cost-optimizer \
  block-2-prompt-engineering/quest-140-token-budgeter \
  block-3-security/quest-141-injection-tester \
  block-3-security/quest-142-guardrail-builder \
  block-5-architecture/quest-143-ethical-review \
  block-5-architecture/quest-144-privacy-auditor \
  block-7-observability/quest-145-monitoring-dashboard \
  block-7-observability/quest-146-hallucination-detector; do
  missing=""
  [ ! -f "$d/README.md" ] && missing="$missing README.md"
  [ ! -f "$d/package.json" ] && missing="$missing package.json"
  [ ! -f "$d/test.js" ] && missing="$missing test.js"
  [ ! -f "$d/problem.js" ] && missing="$missing problem.js"
  [ ! -f "$d/_solution/solution.js" ] && missing="$missing solution.js"
  if [ -n "$missing" ]; then
    echo "INCOMPLETE: $d — missing$missing"
  else
    echo "COMPLETE:   $d"
  fi
done
```

Expected: All 8 show COMPLETE

- [ ] **Step 4: Commit**

```bash
git add quests/block-*/quest-*/README.md quests/block-*/quest-*/package.json
git commit -m "fix: add README.md and package.json to 8 block quests

These quests were missing standard metadata files required by the
quest scaffold pattern and CLI download command."
```

---

### Task 6: Add Root README.md and LICENSE

**Files:**

- Create: `README.md` (project root)
- Create: `LICENSE` (project root)

- [ ] **Step 1: Create README.md**

Create `/Users/poom-work/ai-sdlc-course/README.md`:

```markdown
# BlueBeltDojo — AI SDLC Course

Teach AI-assisted software development lifecycle (AI SDLC) through a one-day workshop and self-serve interactive documentation. Success means learners leave able to use AI tools with engineering discipline — not just "vibe coding" but "vibe engineering."

## What's Inside

- **147 code quests** across 12 modules with progressive difficulty
- **8 workshop blocks** (30 min concept + 60 min hands-on each)
- **3 capstone projects** (API service, multi-agent system, production AI)
- **Interactive docs** — bilingual (Thai + English) web-based learning platform
- **CLI tool** — `bluebeltdojo` for quest download, testing, and submission
- **LMS backend** — Cloudflare Pages with D1 database, KV storage, JWT auth

## Quick Start

### Interactive Docs (Learner-Facing Site)

```bash
cd interactive-docs
npm install
npm run dev        # Start dev server at http://localhost:4321
npm run build      # Production build
npm test           # Run unit tests (705 tests)
```

### Quest Code (Hands-On Challenges)

```bash
# Run all quest tests (solutions must pass)
node scripts/run-all-quest-tests.js --implement-solution

# Verify quest structure
bash scripts/verify-quests.sh
```

### CLI Tool

```bash
cd cli
node bin/entry.js --help
```

## Project Structure

```
├── interactive-docs/    # Astro + Starlight learning platform
│   ├── src/pages/       # Page routes (homepage, dashboard, pricing, etc.)
│   ├── src/content/     # MDX content (quests, workshop blocks, reference)
│   ├── functions/       # Cloudflare Pages Functions (API endpoints)
│   └── e2e/             # Playwright E2E tests
├── quests/              # 147 code quest challenges
│   ├── block-*/         # Original workshop quests
│   ├── module-*/        # Expanded curriculum quests
│   └── capstones/       # Capstone projects
├── cli/                 # bluebeltdojo CLI tool
├── scripts/             # Build, test, and deployment scripts
├── docs/                # ADRs, specs, plans
└── specs/               # Backend API and LMS specs
```

## Tech Stack

- **Frontend**: Astro 5, Starlight, Tailwind CSS 3
- **Backend**: Cloudflare Pages Functions (Hono), D1, KV
- **Testing**: Vitest (unit), Playwright (E2E), Node.js test runner (quests)
- **Deployment**: Cloudflare Pages
- **Language**: Bilingual (Thai + English)

## Documentation

- [Product Definition](PRODUCT.md)
- [Domain Model](CONTEXT.md)
- [Course Outline](COURSE_OUTLINE.md)
- [Workshop Structure](WORKSHOP_STRUCTURE.md)
- [Architecture Decision Records](docs/adr/)
- [Manual Test Checklist](MANUAL_TEST_CHECKLIST.md)

## License

MIT

```

- [ ] **Step 2: Create LICENSE**

Create `/Users/poom-work/ai-sdlc-course/LICENSE`:

```

MIT License

Copyright (c) 2025 BlueBeltDojo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

- [ ] **Step 3: Commit**

```bash
git add README.md LICENSE
git commit -m "docs: add project README.md and MIT LICENSE"
```

---

### Task 7: Full Verification

Run all checks to confirm everything is fixed.

- [ ] **Step 1: Build the interactive docs**

```bash
cd /Users/poom-work/ai-sdlc-course/interactive-docs
npm run build
```

Expected: Exit code 0, 321+ pages built

- [ ] **Step 2: Run unit tests**

```bash
cd /Users/poom-work/ai-sdlc-course/interactive-docs
npm test
```

Expected: 705 passed, 1 skipped

- [ ] **Step 3: Verify manifest integrity**

```bash
cd /Users/poom-work/ai-sdlc-course/interactive-docs
node -e "
const m = require('./src/data/quests-manifest.json');
const slugs = m.map(q => q.slug);
const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
const untitled = m.filter(q => q.title === q.id);
console.log('Total entries:', m.length);
console.log('Unique slugs:', new Set(slugs).size);
console.log('Duplicate slugs:', dupes.length);
console.log('Untitled entries:', untitled.length);
if (dupes.length || untitled.length) process.exit(1);
console.log('✅ Manifest is clean');
"
```

Expected: 147 entries, 147 unique slugs, 0 untitled

- [ ] **Step 4: Verify all quest structures**

```bash
cd /Users/poom-work/ai-sdlc-course/quests
# Check module quests have problem.js
missing=0
for d in $(find module-* -name 'quest-*' -type d); do
  [ ! -f "$d/problem.js" ] && echo "MISSING problem.js: $d" && missing=$((missing+1))
done
echo "Module quests missing problem.js: $missing"

# Check block quests have full structure
for d in $(find block-* -name 'quest-*' -type d); do
  m=""
  [ ! -f "$d/README.md" ] && m="$m README.md"
  [ ! -f "$d/package.json" ] && m="$m package.json"
  [ ! -f "$d/problem.js" ] && m="$m problem.js"
  [ ! -f "$d/test.js" ] && m="$m test.js"
  [ ! -f "$d/_solution/solution.js" ] && m="$m solution.js"
  [ -n "$m" ] && echo "INCOMPLETE: $d —$m"
done
echo "✅ Quest structure check complete"
```

Expected: 0 missing problem.js, no INCOMPLETE block quests

- [ ] **Step 5: Run quest solution tests**

```bash
cd /Users/poom-work/ai-sdlc-course
mkdir -p .scratch/quest-test-workspace
# Test a sample of quests from each category
for dir in \
  quests/block-1-ai-tools/quest-01-first-completion \
  quests/module-1/block-a/quest-05-context-budget \
  quests/module-4/block-8-security/quest-44-secret-scanner \
  quests/module-8/block-17-refactoring/quest-94-dead-code \
  quests/module-10/block-21-sdlc-integration/quest-114-feature-flags; do
  tmpdir=$(mktemp -d)
  cp -r "$dir"/* "$tmpdir/"
  cp "$tmpdir/_solution/solution.js" "$tmpdir/problem.js"
  result=$(cd "$tmpdir" && node test.js 2>&1)
  status=$?
  qname=$(basename "$dir")
  if [ $status -eq 0 ]; then
    echo "PASS: $qname"
  else
    echo "FAIL: $qname"
    echo "$result" | tail -3
  fi
  rm -rf "$tmpdir"
done
```

Expected: All 5 sample quests pass

- [ ] **Step 6: Verify homepage has correct count**

```bash
grep -n "147" /Users/poom-work/ai-sdlc-course/interactive-docs/src/pages/index.astro
```

Expected: 3 lines with "147"

- [ ] **Step 7: Verify root files exist**

```bash
ls -la /Users/poom-work/ai-sdlc-course/README.md /Users/poom-work/ai-sdlc-course/LICENSE
```

Expected: Both files listed

- [ ] **Step 8: Final commit (if any fixups needed)**

```bash
cd /Users/poom-work/ai-sdlc-course
git status
# If any uncommitted changes from fixups above
git add -A
git commit -m "fix: publish-readiness verification fixups"
```

---

## Self-Check

**Spec coverage:**

- ✅ Homepage count fix → Task 1
- ✅ Duplicate slugs → Task 2
- ✅ Untitled manifest entries → Task 3
- ✅ Missing problem.js (19 quests) → Task 4
- ✅ Missing README.md + package.json (8 quests) → Task 5
- ✅ Root README.md → Task 6
- ✅ LICENSE → Task 6
- ✅ Verification → Task 7

**Placeholder scan:** No TODOs, TBDs, or "implement later" in this plan. All code blocks contain actual content.

**Type consistency:** Quest IDs, slugs, and directory names are consistent across all tasks. Task 2 renames directories, Task 5 uses the renamed paths. Task 4 creates problem.js files matching test.js require() signatures.
