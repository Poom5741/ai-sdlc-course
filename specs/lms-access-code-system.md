# Specification: Learning Management System (LMS) - Access Code System

## Overview

Add a paywall-gated learning system to the AI SDLC course interactive docs. Students receive individual access codes after payment, which grant them access to protected workshop content and quests.

**Repository**: `Poom5741/ai-sdlc-course`
**Status**: Draft
**Created**: 2024-01-15

---

## Goals

1. **Access Control**: Only students with valid codes can access protected content
2. **Code Management**: Admin can create, list, and manage access codes
3. **Simple Auth**: No complex user accounts - codes ARE the authentication
4. **Seamless UX**: Minimal friction for legitimate students
5. **SEO Friendly**: Reference docs remain open for marketing

---

## User Roles

### Student
- Receives access code after payment
- Enters code to unlock content
- Code persists across sessions

### Admin
- Creates access codes
- Manages code lifecycle
- Views usage statistics
- Exports code lists

---

## Content Protection Rules

| Content | Access Level | Reason |
|---------|--------------|--------|
| `/workshop/overview` | **Open** | Marketing/SEO |
| `/workshop/block-*` | **Protected** | Core product |
| `/reference/*` | **Open** | SEO + documentation |
| `/quests/*` | **Protected** | Hands-on value |
| `/challenges/*` | **Protected** | Core product |
| `/admin` | **Admin Only** | Management |

---

## Access Code Format

### Pattern
```
BBD-XXXX-XXXX
```

- **BBD**: Brand prefix (BlueBeltDojo)
- **XXXX**: 4 alphanumeric characters (uppercase)
- **XXXX**: 4 alphanumeric characters (uppercase)
- **Separator**: Hyphen

### Examples
```
BBD-ABCD-1234
BBD-XYZ7-89KL
BBD-MNOP-56QR
```

### Validation Rules
- Must match pattern `^BBD-[A-Z0-9]{4}-[A-Z0-9]{4}$`
- Case-insensitive input (convert to uppercase)
- No ambiguous characters (0/O, 1/I/L)

---

## Storage Schema (Cloudflare KV)

### Key Structure
```
code:{CODE}           → Code record
stats:{CODE}          → Usage statistics
admin:{SESSION}       → Admin session
```

### Code Record
```json
{
  "code": "BBD-ABCD-1234",
  "created": "2024-01-15T10:00:00Z",
  "createdBy": "admin",
  "used": false,
  "usedAt": null,
  "usedBy": null,
  "expires": "2024-12-31T23:59:59Z",
  "plan": "workshop-2024",
  "metadata": {
    "batch": "batch-001",
    "notes": "January cohort"
  }
}
```

### Usage Statistics
```json
{
  "code": "BBD-ABCD-1234",
  "firstAccess": "2024-01-20T14:30:00Z",
  "lastAccess": "2024-01-25T09:15:00Z",
  "accessCount": 12,
  "pagesVisited": [
    "/workshop/block-1",
    "/workshop/block-2",
    "/quests/quest-1"
  ]
}
```

### Admin Session
```json
{
  "sessionId": "sess_abc123",
  "created": "2024-01-15T10:00:00Z",
  "expires": "2024-01-15T22:00:00Z",
  "ip": "192.168.1.1"
}
```

---

## API Endpoints

### POST /api/validate-code

**Purpose**: Validate an access code

**Request**:
```json
{
  "code": "BBD-ABCD-1234"
}
```

**Response (Valid)**:
```json
{
  "valid": true,
  "code": "BBD-ABCD-1234",
  "expires": "2024-12-31T23:59:59Z",
  "plan": "workshop-2024"
}
```

**Response (Invalid)**:
```json
{
  "valid": false,
  "error": "Invalid or expired code"
}
```

**Rate Limiting**: 5 attempts per minute per IP

---

### POST /api/admin/login

**Purpose**: Admin authentication

**Request**:
```json
{
  "password": "admin-password-here"
}
```

**Response (Success)**:
```json
{
  "success": true,
  "sessionId": "sess_abc123",
  "expires": "2024-01-15T22:00:00Z"
}
```

**Response (Failed)**:
```json
{
  "success": false,
  "error": "Invalid password"
}
```

**Security**:
- Password stored in Cloudflare environment variable
- Session expires after 12 hours
- IP-based session binding

---

### GET /api/admin/codes

**Purpose**: List all access codes

**Headers**:
```
Authorization: Bearer {sessionId}
```

**Query Parameters**:
- `status`: all | used | unused | expired
- `plan`: filter by plan
- `batch`: filter by batch
- `page`: pagination (default: 1)
- `limit`: items per page (default: 50)

**Response**:
```json
{
  "codes": [
    {
      "code": "BBD-ABCD-1234",
      "created": "2024-01-15T10:00:00Z",
      "used": true,
      "usedAt": "2024-01-20T14:30:00Z",
      "expires": "2024-12-31T23:59:59Z",
      "plan": "workshop-2024"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 150,
    "pages": 3
  }
}
```

---

### POST /api/admin/codes

**Purpose**: Create new access code(s)

**Headers**:
```
Authorization: Bearer {sessionId}
```

**Request (Single)**:
```json
{
  "plan": "workshop-2024",
  "expires": "2024-12-31T23:59:59Z",
  "metadata": {
    "notes": "Individual sale"
  }
}
```

**Request (Bulk)**:
```json
{
  "count": 25,
  "plan": "workshop-2024",
  "expires": "2024-12-31T23:59:59Z",
  "batch": "february-cohort",
  "metadata": {
    "notes": "February cohort - 25 students"
  }
}
```

**Response**:
```json
{
  "created": [
    "BBD-ABCD-1234",
    "BBD-EFGH-5678",
    "..."
  ],
  "count": 25
}
```

---

### DELETE /api/admin/codes/:code

**Purpose**: Revoke an access code

**Headers**:
```
Authorization: Bearer {sessionId}
```

**Response**:
```json
{
  "success": true,
  "code": "BBD-ABCD-1234",
  "revoked": "2024-01-25T10:00:00Z"
}
```

---

## UI Components

### Code Modal (Student)

```
┌─────────────────────────────────────────┐
│  🔐 Enter Access Code                   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ BBD-____-____                   │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Don't have a code? Get access →        │
│                                         │
│  [Validate Code]                        │
│                                         │
│  ──────────── OR ────────────           │
│                                         │
│  Continue without code (limited access) │
└─────────────────────────────────────────┘
```

**Behavior**:
- Auto-format input: `BBD-XXXX-XXXX`
- Uppercase automatically
- Validate on submit
- Show error message for invalid codes
- Store in localStorage on success
- "Continue without code" shows open content only

---

### Admin Panel (`/admin`)

```
┌─────────────────────────────────────────────────────────────┐
│  🔧 Admin Panel                              [Logout]       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─ Dashboard ────────────────────────────────────────────┐│
│  │ Total Codes: 150    Used: 89    Unused: 51    Expired: 10││
│  └────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─ Create Codes ─────────────────────────────────────────┐│
│  │ Plan: [workshop-2024 ▼]                                ││
│  │ Count: [25    ]                                        ││
│  │ Expires: [2024-12-31]                                  ││
│  │ Batch: [february-cohort]                               ││
│  │ Notes: [February cohort - 25 students]                 ││
│  │                                                         ││
│  │ [Generate Codes]                                       ││
│  └────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─ Code List ────────────────────────────────────────────┐│
│  │ Filter: [All ▼] [All Plans ▼] [Search...]              ││
│  │                                                         ││
│  │ Code          | Status | Used At       | Plan          ││
│  │ BBD-ABCD-1234 | ✅ Used | Jan 20, 2024 | workshop-2024 ││
│  │ BBD-EFGH-5678 | ⏳ Unused | -           | workshop-2024 ││
│  │ BBD-IJKL-9012 | ❌ Expired | -          | workshop-2024 ││
│  │                                                         ││
│  │ [Export CSV] [Revoke Selected]                          ││
│  └────────────────────────────────────────────────────────┘│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Client-Side Flow

### 1. Page Load Check
```javascript
function checkAccess() {
  const code = localStorage.getItem('bbt_access_code');
  const expires = localStorage.getItem('bbt_code_expires');
  
  if (!code || new Date(expires) < new Date()) {
    showCodeModal();
    return false;
  }
  
  return true;
}
```

### 2. Code Validation
```javascript
async function validateCode(code) {
  const response = await fetch('/api/validate-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  });
  
  const result = await response.json();
  
  if (result.valid) {
    localStorage.setItem('bbt_access_code', code);
    localStorage.setItem('bbt_code_expires', result.expires);
    hideCodeModal();
    showContent();
  } else {
    showError(result.error);
  }
}
```

### 3. Auto-Format Input
```javascript
function formatCodeInput(input) {
  // Remove non-alphanumeric
  let value = input.value.replace(/[^A-Za-z0-9]/g, '');
  
  // Uppercase
  value = value.toUpperCase();
  
  // Add hyphens: BBD-XXXX-XXXX
  if (value.length > 3) value = value.slice(0, 3) + '-' + value.slice(3);
  if (value.length > 8) value = value.slice(0, 8) + '-' + value.slice(8);
  
  // Limit length
  value = value.slice(0, 13);
  
  input.value = value;
}
```

---

## Security Considerations

### Rate Limiting
- 5 validation attempts per minute per IP
- 10 admin login attempts per hour per IP
- 429 Too Many Requests response

### Code Security
- Codes are case-insensitive (normalized to uppercase)
- No ambiguous characters (0/O, 1/I/L)
- Hyphens ignored during validation
- 10^8 possible codes (sufficient for scale)

### Session Security
- Admin sessions expire after 12 hours
- Sessions bound to IP address
- HttpOnly cookies for session storage
- CSRF protection on admin endpoints

### Data Protection
- No personal data stored with codes
- Usage stats are anonymous
- Admin password in environment variable
- KV data encrypted at rest

---

## Environment Variables

```bash
# Admin password
ADMIN_PASSWORD=your-secure-password-here

# KV namespace binding
KV_NAMESPACE=lms-codes

# Optional: Expiry default (days)
CODE_EXPIRY_DEFAULT=365
```

---

## Implementation Phases

### Phase 1: Core (MVP)
- [ ] KV namespace setup
- [ ] POST /api/validate-code
- [ ] Code modal component
- [ ] Client-side auth flow

### Phase 2: Admin
- [ ] POST /api/admin/login
- [ ] GET /api/admin/codes
- [ ] POST /api/admin/codes
- [ ] Admin panel UI

### Phase 3: Enhancements
- [ ] Bulk code generation
- [ ] CSV export
- [ ] Usage statistics
- [ ] Code revocation

### Phase 4: Polish
- [ ] Rate limiting
- [ ] Error handling
- [ ] Loading states
- [ ] Mobile responsive

---

## Success Criteria

1. ✅ Students can enter code and access protected content
2. ✅ Code persists across browser sessions
3. ✅ Admin can create single and bulk codes
4. ✅ Admin can list and filter codes
5. ✅ Invalid/expired codes are rejected
6. ✅ Reference docs remain open for SEO
7. ✅ Modal appears only on protected pages
8. ✅ No impact on site performance

---

## Open Questions

1. **Payment Integration**: Should we integrate with Stripe directly, or keep it external?
2. **Code Sharing**: How to prevent code sharing between students?
3. **Refund Handling**: How to handle revoked codes for refunds?
4. **Multi-device**: Should one code work on multiple devices?

---

## Dependencies

- Cloudflare Pages (existing)
- Cloudflare Workers (for API)
- Cloudflare KV (for storage)
- Astro (existing framework)

---

## References

- [Cloudflare KV Docs](https://developers.cloudflare.com/kv/)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Astro Middleware](https://docs.astro.build/en/guides/middleware/)
