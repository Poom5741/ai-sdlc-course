# Wayfinder Map: Learning Management System (LMS)

## Destination

Add a paywall-gated learning system where:
- Students get individual access codes
- Admin can create/manage codes
- Only paying students can access workshop content
- Reference docs may be open or protected

## Notes

- **Platform**: Astro 5 + Cloudflare Pages (Wrangler)
- **Storage**: Cloudflare KV or D1 for codes
- **Auth**: Simple code-based (no complex user accounts)
- **Payment**: External (Stripe, etc.) - we handle code distribution
- **Existing content**: Workshop blocks, reference docs, quests

## Decisions so far

<!-- No decisions yet - this is a fresh map -->

## Open Tickets (Frontier)

1. [Code Format Decision](https://github.com/Poom5741/ai-sdlc-course/issues/34) - What format for access codes?
2. [Storage Backend Decision](https://github.com/Poom5741/ai-sdlc-course/issues/35) - Where to store codes?
3. [Admin Panel Decision](https://github.com/Poom5741/ai-sdlc-course/issues/36) - How should admin manage codes?
4. [Content Protection Decision](https://github.com/Poom5741/ai-sdlc-course/issues/37) - Which content to protect?
5. [Auth Flow Decision](https://github.com/Poom5741/ai-sdlc-course/issues/38) - How should code validation work?
6. [Implementation Approach Decision](https://github.com/Poom5741/ai-sdlc-course/issues/39) - Technical implementation strategy?

## Not yet specified

- Code expiry/rotation strategy
- Usage tracking requirements
- Bulk code generation
- Error handling edge cases

## Out of scope

- Payment processing (handled externally)
- User registration/login system (codes are the auth)
- Complex role-based access (just paid vs free)
