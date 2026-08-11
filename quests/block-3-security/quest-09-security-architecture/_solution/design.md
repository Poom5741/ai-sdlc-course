# Security Architecture — API Auth Flow (reference; write your own)

> This is a REFERENCE shape for `design.md`. The learner writes their own.
> Do not ship this to learners; it lives in `_solution/` to keep the
> validator green for maintainers.

## System

A public REST API requiring authenticated access. Clients send an API key in
the `Authorization` header; the API enforces per-key rate limiting. We
threat-model the auth flow, define controls, and document each control's
failure mode.

## Threats

1. **Credential theft** — an attacker steals a valid API key (phishing, repo
   leak, MITM) and impersonates the key owner.
2. **Abuse / denial-of-service** — one client floods the API with requests,
   exhausting rate budget or backend capacity.
3. **Credential stuffing / brute force** — an attacker probes many candidate
   keys against a protected endpoint.
4. **Key leakage in logs/URLs** — the API key is logged or placed in a query
   string, exposing it to anyone with log access.
5. **Replay of intercepted requests** — a captured valid request is replayed
   later by an attacker.

## Controls

- **API key** (per-client, secret, revocable): proves the caller's identity.
  Sent only in the `Authorization` header (never the URL); rotated on a
  schedule and on suspected leak.
- **Rate limiting** (per-key, token bucket): caps requests per window per key.
  Returns 429 with `Retry-After` on overflow; rattled progressively before
  hard-blocking.
- **TLS / HSTS**: encrypts the wire so the key and body cannot be intercepted
  or replayed from the network.
- **Key revocation + rotation**: a leaked key is revoked immediately and
  replaced; a rotation job cycles keys quarterly.
- **Hardening against brute force**: invalid-key responses are
  indistinguishable from valid-but-unauthorized (uniform 401), and repeated
  failures escalate to a temporary block.

## Failure Modes

- If the **API key** is compromised: revoke + rotate; window of abuse is the
  detection lag. Mitigation: short rotation window + anomaly alerts on usage
  spikes.
- If **rate limiting** is bypassed (a client spoofs multiple keys): fall back
  to IP-level limits; alert on a single IP spreading across many keys.
- If **TLS** is downgraded by a proxy: refuse the connection (HSTS preload) and
  log the attempt; no fallback to plaintext.
- If **brute-force hardening** misfires and blocks a real user: provide a
  self-service unlock with a short cooling-off window.
- If **replay** is observed (same nonce/timestamp twice): reject and flag the
  key for rotation; clients must include a timestamp + nonce in signed
  requests in hardened mode.

## Notes

This design is deliberately small: API key + rate limiting + TLS + rotation +
brute-force hardening + replay protection. Each control maps to a threat, and
each control has a failure mode and a fallback. The lesson: threat-model
before you build, so every control has a reason and every failure has a
plan.