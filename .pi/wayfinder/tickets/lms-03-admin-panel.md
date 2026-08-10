# Ticket: Admin Panel Decision

## Question

How should the admin panel work?

**Options:**

1. **Separate Route** (`/admin`)
   - Pros: Clean separation, easy to protect
   - Cons: Needs its own auth

2. **CLI Tool**
   - Pros: No UI to build, scriptable
   - Cons: Not user-friendly for non-technical admins

3. **External Dashboard** (Airtable, Notion)
   - Pros: Built-in UI, easy to use
   - Cons: External dependency

4. **Interactive CLI in Site** (`/admin` with terminal UI)
   - Pros: Integrated, no external deps
   - Cons: More complex to build

**Considerations:**
- Admin may not be technical
- Need to create codes in bulk
- Need to list codes with status
- Need to see usage statistics

**Recommendation:** Option 1 (Separate Route) with simple auth:

```
/admin
├── Login (admin password)
├── Dashboard
│   ├── Create Code (single or bulk)
│   ├── List Codes (with filters)
│   ├── Usage Stats
│   └── Export CSV
```

Admin auth: Simple password stored in Cloudflare environment variables.

## Resolution

<!-- To be filled when ticket is resolved -->
