# Ticket: Storage Backend Decision

## Question

Where should access codes be stored?

**Options:**

1. **Cloudflare KV**
   - Pros: Simple key-value, fast reads, global edge
   - Cons: No relational queries, eventual consistency
   
2. **Cloudflare D1**
   - Pros: SQL database, relational queries, ACID
   - Cons: More complex setup, may be overkill

3. **JSON File in Repo**
   - Pros: Simple, version-controlled
   - Cons: Not scalable, no runtime updates

4. **External Service** (Airtable, Supabase)
   - Pros: Admin UI built-in, easy management
   - Cons: External dependency, cost

**Considerations:**
- Need to validate codes at runtime
- Admin needs to create/list codes
- May want to track usage per code
- Small scale (hundreds to thousands of codes)

**Recommendation:** Option 1 (Cloudflare KV) with this structure:

```json
{
  "code:BBD-XXXX-XXXX": {
    "created": "2024-01-15T10:00:00Z",
    "used": false,
    "usedBy": null,
    "expires": "2024-12-31T23:59:59Z",
    "plan": "workshop-2024"
  }
}
```

Simple, fast, and足够 for the scale. Admin can query via Workers API.

## Resolution

<!-- To be filled when ticket is resolved -->
