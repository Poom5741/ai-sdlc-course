# Backend API Specification

## Problem Statement

BlueBeltDojo is an AI SDLC course platform with 147 quests, progress tracking, and certificates. The frontend is built with Astro and deployed to Cloudflare Pages, but has no backend — login/register forms call non-existent API endpoints, progress is localStorage-only, and there's no way to persist user data, manage access codes, or issue verifiable certificates. The platform cannot launch without a working backend.

The project needs a complete backend API that handles authentication (via access codes for paid users), server-side progress tracking, certificate issuance, and a full admin dashboard — all deployed on Cloudflare.

## Solution

Build a monolith Cloudflare Worker using the Hono framework as the API layer, with D1 (SQLite) for persistent data and KV for session storage. The worker will handle all `/api/*` routes, authenticate requests via JWT, and integrate with the existing Astro frontend.

**Stack:**
- **Cloudflare Worker** — Hono-based API server
- **D1** — Primary database (users, quests, progress, certificates, access codes, audit log)
- **KV** — Session token storage for logout/invalidation
- **Astro Frontend** — Existing static frontend, no changes needed beyond API base URL configuration

## User Stories

### Authentication & Registration

1. As a paid workshop attendee, I want to register with an access code so that I can create an account after paying externally
2. As a user, I want to register with email, password, display name, and access code so that my identity is established
3. As a system, I want to validate access codes are unused and not expired so that only paying users can register
4. As a system, I want to hash passwords with bcrypt so that user credentials are stored securely
5. As a system, I want to mark access codes as used upon registration so that codes cannot be reused
6. As a registered user, I want to log in with email and password so that I can access my account
7. As a system, I want to verify passwords using bcrypt so that authentication is secure
8. As a logged-in user, I want to receive a JWT token so that subsequent requests are authenticated
9. As a system, I want to store session tokens in KV so that sessions can be invalidated on logout
10. As a logged-in user, I want to view my profile via /api/auth/me so that the frontend can display my information
11. As a user, I want to log out so that my session is invalidated and my token no longer works
12. As a system, I want JWTs to expire after 1 hour so that sessions don't remain valid indefinitely
13. As a system, I want to verify JWT signature and expiration on every authenticated request so that security is maintained

### Quest Management

14. As a user, I want to view the list of all quests via /api/quests so that I can see available challenges
15. As a user, I want to view quest details via /api/quests/:id so that I can understand a specific quest
16. As a system, I want to store quest metadata in D1 so that quests can be managed via admin
17. As a system, I want to serve quest rich content from static files so that content updates don't require database changes
18. As an admin, I want to enable/disable quests so that I can control which quests are visible to users
19. As an admin, I want to reorder quests so that I can adjust the learning flow

### Progress Tracking

20. As a user, I want my quest progress saved server-side so that it persists across devices
21. As a user, I want to view my progress via /api/progress so that I can see my completion status
22. As a user, I want to update quest status (not_started, in_progress, submitted, completed) so that my journey is tracked
23. As a user, I want to submit proof of completion (URL or file) for code quests so that my work can be verified
24. As a user, I want to submit manual submissions for design quests so that I can complete non-automated challenges
25. As a user, I want to view my completion statistics via /api/progress/stats so that I can see my dashboard metrics
26. As a system, I want to calculate belt levels based on quest completion so that progression is automated

### Certificates

27. As a user, I want a certificate issued when I complete a belt level so that I have proof of achievement
28. As a system, I want to generate unique verification tokens for each certificate so that they can be shared
29. As a user, I want to view my certificate via /api/certificates/:id so that I can see my achievement
30. As anyone, I want to verify a certificate via /api/verify/:token so that certificates can be validated publicly
31. As a system, I want certificates to be tied to belt levels (white, blue, purple, brown, black) so that achievement is clear

### Admin Dashboard — Code Management

32. As an admin, I want to log in via /api/admin/login so that I can access admin functions
33. As a system, I want to check admin role in JWT so that non-admins cannot access admin routes
34. As an admin, I want to generate access codes in bulk (10, 50, 100) so that I can prepare for workshops
35. As an admin, I want to set expiration dates on access codes so that old codes don't work forever
36. As an admin, I want to view all codes via /api/admin/codes with pagination so that I can manage inventory
37. As an admin, I want to see which codes are used, unused, or expired so that I can track distribution
38. As an admin, I want to revoke unused codes via DELETE /api/admin/codes/:id so that I can invalidate compromised codes

### Admin Dashboard — User Management

39. As an admin, I want to view all users via /api/admin/users with pagination so that I can see who's registered
40. As an admin, I want to search users by email or name so that I can find specific accounts
41. As an admin, I want to filter users by belt level so that I can see progression distribution
42. As an admin, I want to view a user's detailed progress via /api/admin/users/:id so that I can help with issues
43. As an admin, I want to update user roles or display names via PUT /api/admin/users/:id so that I can manage accounts

### Admin Dashboard — Quest Management

44. As an admin, I want to view quests with completion statistics via /api/admin/quests so that I can see engagement
45. As an admin, I want to see how many users completed each quest so that I can identify difficult content
46. As an admin, I want to toggle quest enabled/disabled so that I can control the curriculum

### Admin Dashboard — Analytics & Audit

47. As an admin, I want to view analytics via /api/admin/analytics so that I can see platform health
48. As an admin, I want to see registration trends over time so that I can track growth
49. As an admin, I want to see quest completion rates so that I can identify struggling areas
50. As an admin, I want to view the audit log via /api/admin/audit so that I can see all system events
51. As a system, I want to log all login, registration, and progress events so that activity is traceable

### Security & Infrastructure

52. As a system, I want rate limiting (100 req/min per IP) so that abuse is prevented
53. As a system, I want CORS restricted to bluebeltdojo.ai and localhost so that unauthorized origins are blocked
54. As a system, I want standardized API responses (ok/error format) so that the frontend can handle responses consistently
55. As an admin, I want optional IP whitelisting for admin routes so that admin access can be restricted
56. As a system, I want D1 migrations so that database schema can evolve safely

## Implementation Decisions

### Architecture

- **Monolith Worker**: Single Cloudflare Worker handling all API routes using Hono framework
- **No separate services**: All auth, progress, admin, and certificate logic in one worker for simplicity
- **Frontend unchanged**: Existing Astro pages continue to work; only API base URL configuration may need updating

### Database Schema (D1)

Six tables:

1. **users** — id (uuid PK), email (unique), password_hash, display_name, role (user/admin), created_at
2. **access_codes** — id (uuid PK), code (unique, human-readable), used_by (FK users), used_at, created_at, expires_at
3. **quests** — id (text PK, e.g. "quest-01-first-completion"), title, difficulty (easy/medium/hard), block, module, order_index, enabled
4. **progress** — user_id (FK), quest_id (FK), status (not_started/in_progress/submitted/completed), proof_url, verified_at, score, updated_at; composite PK (user_id, quest_id)
5. **certificates** — id (uuid PK), user_id (FK), token (unique, public verification), issued_at, belt_level (white/blue/purple/brown/black)
6. **audit_log** — id (autoincrement), user_id, action, metadata (JSON), created_at

### API Contracts

All responses follow:
```
Success: { "ok": true, "data": ... }
Error: { "ok": false, "error": { "code": "ERROR_CODE", "message": "Human readable" } }
Paginated: { "ok": true, "data": [...], "meta": { "page": 1, "total": 127 } }
```

**Auth routes** (`/api/auth/*`):
- POST /api/auth/register — body: { email, password, displayName, accessCode }
- POST /api/auth/login — body: { email, password }
- POST /api/auth/logout
- GET /api/auth/me

**Quest routes** (`/api/quests/*`):
- GET /api/quests — list all (public)
- GET /api/quests/:id — single quest (public)
- GET /api/quests/:id/content — rich content from static files

**Progress routes** (`/api/progress/*`, auth required):
- GET /api/progress — user's progress
- POST /api/progress/:questId — body: { status, proofUrl? }
- GET /api/progress/stats — completion statistics

**Certificate routes** (`/api/certificates/*`):
- POST /api/certificates/issue — generate for current user (auth required)
- GET /api/certificates/:id — certificate detail
- GET /api/verify/:token — public verification (no auth)

**Admin routes** (`/api/admin/*`, admin role required):
- POST /api/admin/login — body: { email, password }
- GET /api/admin/codes — paginated list
- POST /api/admin/codes — body: { count, expiresAt? }
- DELETE /api/admin/codes/:id
- GET /api/admin/users — paginated, filterable
- GET /api/admin/users/:id — detail with progress
- PUT /api/admin/users/:id — body: { role?, displayName? }
- GET /api/admin/quests — list with stats
- PUT /api/admin/quests/:id — body: { enabled?, orderIndex? }
- GET /api/admin/analytics — overview statistics
- GET /api/admin/audit — paginated event log

### JWT Structure

```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "role": "user" | "admin",
  "iat": 1234567890,
  "exp": 1234571490
}
```

- Expiry: 1 hour
- Stored in KV for session invalidation
- Short-lived, no refresh token mechanism

### Password Security

- bcrypt via WebAssembly (12 rounds)
- Options: `@aspect-build/aspect-toolkit` or `ossl` wasm module
- Hash on register, verify on login

### Access Code Format

- Human-readable: `BLUE-XXXX-YYYY` (4 chars, dash-separated)
- Single-use, marked on registration
- Optional expiration date
- Bulk generation supported (10, 50, 100)

### Rate Limiting

- KV-based sliding window: 100 requests per minute per IP
- No external service dependency
- Applies to all routes, stricter on auth routes (10 req/min)

### CORS

- Allowed origins: `bluebeltdojo.ai`, `localhost`, `*.pages.dev` (staging)
- Credentials: true (for cookie-based auth if needed later)

### Audit Logging

- Events logged: login, register, logout, quest_submit, certificate_issue, admin actions
- Stored in audit_log table with JSON metadata
- Retained indefinitely for pilot; can add cleanup job later

## Testing Decisions

### Testing Philosophy

- Test external behavior (API responses), not internal implementation
- Each route has integration tests against D1 (using miniflare or wrangler dev)
- Auth middleware tested with valid/invalid/expired tokens
- Database queries tested via the route handlers, not in isolation

### Test Coverage

- **Auth routes**: Registration with valid/invalid codes, login success/failure, logout, token expiry
- **Quest routes**: List all, get by ID, content serving
- **Progress routes**: Update progress, stats calculation, unauthorized access
- **Certificate routes**: Issue, verify valid/invalid tokens
- **Admin routes**: Code generation, user management, analytics, admin-only access control
- **Security**: Rate limiting, CORS, JWT verification, role-based access

### Prior Art

- Existing Vitest test suite (85 tests) covers frontend components
- Worker tests will use same Vitest framework with `@cloudflare/vitest-pool-workers`
- Test database: D1 local development database via `wrangler dev`

### Test Commands

```bash
cd worker
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:e2e      # End-to-end tests against local worker
```

## Out of Scope

- **Payment processing** — Handled externally; users get access codes after paying
- **Real-time features** — No WebSockets, no live updates (use polling)
- **Email notifications** — No welcome emails, no progress notifications
- **File upload/storage** — Proof submissions are URLs, not file uploads
- **Thai translations** — Backend API responses are English; Thai content stays in static MDX
- **Browser-based code execution** — Quests run locally via CLI, not in browser
- **Multi-region** — Single Cloudflare region is sufficient
- **Data backup/restore** — Manual for pilot; can add later
- **GDPR/compliance** — Basic audit logging is sufficient for pilot
- **Mobile app** — Web only

## Further Notes

### Migration Path

The existing frontend already calls these API endpoints (from MANUAL_TEST_CHECKLIST.md):
- `/api/auth/login`, `/api/auth/register`
- `/api/quests`, `/api/belt`, `/api/progress`
- `/api/admin/codes`, `/api/admin/login`
- `/api/certificates/:id`, `/api/verify/:token`

The worker should match these existing contracts where possible. The frontend's `RoleSwitcher` component (dev-only) will continue to work with localStorage for testing, but real users will hit the actual API.

### Quest Data Split

- **D1**: Core metadata (id, title, difficulty, block, module, order, enabled)
- **Static files**: Rich content (instructions, hints, verification logic, starter code)

This hybrid approach means quest content can be updated via git push without database migrations, while quest management (enable/disable, reorder) is admin-controllable via D1.

### Future Considerations

- **CLI tool** (`bluebeltdojo verify`): Generates proof files for code quests; backend receives proof URLs
- **Webhook integration**: Trigger on user milestones (belt completion)
- **Analytics dashboard**: Could use D1 analytics or export to external tool
- **API versioning**: Not needed for pilot; add `/api/v2/` prefix if breaking changes needed later
