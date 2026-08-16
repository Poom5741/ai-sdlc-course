# BlueBeltDojo Manual Test Checklist

**Staging URL:** https://bluebeltdojo.pages.dev  
**Test Date:** _______________  
**Tester:** _______________

## Pre-test Setup
- [ ] Open staging URL in browser
- [ ] Open browser DevTools Console (F12)
- [ ] Verify TEST MODE button appears in bottom-right corner
- [ ] Verify it does NOT appear on bluebeltdojo.ai (production check)

---

## 1. Role Switcher
- [ ] Click TEST MODE — role panel expands
- [ ] Select "Visitor" — localStorage cleared, page reloads
- [ ] Select "White Belt" — token + user + progress injected
- [ ] Select "Black Belt" — full progress data injected
- [ ] Active role badge shows correct role name
- [ ] Click TEST MODE again — panel collapses

## 2. Homepage (/)
- [ ] Page loads without errors in console
- [ ] Hero section visible: "Master AI Coding Like a Black Belt"
- [ ] "$149" price visible
- [ ] "START TRAINING" button links to /pricing
- [ ] "VIEW CURRICULUM" button works
- [ ] Navigation: CURRICULUM, BELTS, FAQ, COMMUNITY links work
- [ ] Sign In link goes to /login
- [ ] GET STARTED link goes to /register or /pricing

## 3. Pricing Page (/pricing)
- [ ] "$149 one-time" displayed
- [ ] "MOST POPULAR" badge visible
- [ ] Feature list includes: 147 quests, 3 capstones, belt system, certificates, community
- [ ] CTA button visible

## 4. Login Page (/login)
- [ ] Email + password form renders
- [ ] Link to /register page works
- [ ] Submit with empty fields — shows validation error
- [ ] Submit with invalid email — shows error

## 5. Register Page (/register)
- [ ] Email + password + display name form renders
- [ ] Link to /login page works
- [ ] Submit with empty fields — shows validation
- [ ] Submit with short password (< 8 chars) — shows error

## 6. Dashboard (/dashboard)
- [ ] As Visitor — shows login prompt or redirect
- [ ] As White Belt — shows empty dashboard with belt progress
- [ ] As Blue Belt — shows 25/147 quests, Blue belt badge
- [ ] As Black Belt — shows 147/147 quests, Black belt badge
- [ ] Module completion percentages visible
- [ ] Quest checklist per module visible

## 7. Belt System
- [ ] Belt display: White → Blue → Purple → Brown → Black
- [ ] Belt requirements shown (quests needed for next belt)
- [ ] Progress bar to next belt works

## 8. Quest Pages (sample 5 different quests)
- [ ] /quests/quest-1-first-code — loads, has bluebeltdojo download command
- [ ] /quests/quest-43-sql-injection-spotter — loads correctly
- [ ] /quests/quest-83-automated-pr-reviewer — loads correctly
- [ ] /quests/quest-119-git-repo-setup — loads correctly
- [ ] /quests/quest-129-pages-deploy — loads correctly
- [ ] Each quest has: Learning Objectives, Instructions, Verification, Hints
- [ ] Each quest shows `bluebeltdojo download` command (not `npx degit`)

## 9. Capstone Pages
- [ ] /capstones/capstone-1-api-service — loads, shows requirements + rubric
- [ ] /capstones/capstone-2-multi-agent — loads
- [ ] /capstones/capstone-3-production-ai — loads
- [ ] Each capstone has: requirements, rubric, starter instructions

## 10. Community Page (/community)
- [ ] Page loads
- [ ] Discord info / invite visible
- [ ] Community guidelines visible

## 11. Certificate Page
- [ ] /certificate/test — loads (shows placeholder or error for invalid ID)
- [ ] /verify/test-token — shows "certificate not found" for invalid token

## 12. API Endpoints
- [ ] GET /api/quests — returns JSON array with 147 quests
- [ ] GET /api/belt — returns belt requirements JSON
- [ ] POST /api/auth/register — validates input, returns error for missing fields
- [ ] POST /api/auth/login — validates input, returns error for wrong credentials
- [ ] GET /api/auth/me — returns 401 without token
- [ ] POST /api/submit — returns 401 without token
- [ ] GET /api/progress — returns progress data

## 13. Sidebar Navigation
- [ ] All 12 modules visible in sidebar
- [ ] Module 11: Git & GitHub visible with 10 quest links
- [ ] Module 12: Cloudflare Deployment visible with 8 quest links
- [ ] Capstones section visible
- [ ] Account section: Dashboard, Community, Pricing links work
- [ ] Reference section links work
- [ ] Collapsed modules expand on click

## 14. Quests API Data Integrity
- [ ] GET /api/quests returns exactly 147 entries
- [ ] First quest: quest-01-first-completion
- [ ] Last quest: quest-136-fullstack-deploy
- [ ] Each entry has: id, title, difficulty, block, slug
- [ ] Difficulties distributed: easy, medium, hard

## 15. Mobile Responsive (optional)
- [ ] Homepage readable on mobile viewport (375px)
- [ ] Navigation hamburger menu works
- [ ] Quest pages readable on mobile

---

## Issues Found

| # | Page | Issue | Severity | Fixed? |
|---|------|-------|----------|--------|
| 1 |     |       |          |        |
| 2 |     |       |          |        |
| 3 |     |       |          |        |

## Sign-off

- [ ] All critical issues fixed
- [ ] Ready for production deploy

Tester Signature: _______________ Date: _______________
