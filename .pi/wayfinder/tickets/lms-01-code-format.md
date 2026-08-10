# Ticket: Access Code Format Decision

## Question

What format should the individual access codes use?

**Options:**

1. **Simple Alphanumeric** (e.g., `ABC-123-XYZ-789`)
   - Pros: Easy to type, human-readable
   - Cons: Less secure, shorter lifespan
   
2. **UUID-style** (e.g., `550e8400-e29b-41d4-a716-446655440000`)
   - Pros: Globally unique, standard
   - Cons: Hard to type, not human-friendly

3. **Custom Pattern** (e.g., `BBD-{YEAR}-{SEQUENCE}-{CHECKSUM}`)
   - Pros: Can encode metadata, checksum for validation
   - Cons: More complex to implement

4. **Short Token** (e.g., `a1b2c3d4`)
   - Pros: Very easy to type
   - Cons: Higher collision risk, need more validation

**Considerations:**
- Students will type these codes manually
- Admin will generate them in bulk
- Need to prevent guessing/brute force
- May need to track which code accessed what

**Recommendation:** Option 3 (Custom Pattern) with format `BBD-XXXX-XXXX` where X is alphanumeric. This gives:
- Brand prefix (BBD = BlueBeltDojo)
- Easy to type (4-4 format)
- Enough entropy to prevent guessing
- Can add checksum for validation

## Resolution

<!-- To be filled when ticket is resolved -->
