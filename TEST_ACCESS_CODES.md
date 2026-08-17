# Test Access Codes

> ⚠️ **TEST ONLY** — These codes have no backend to validate against yet.
> When the backend is built, use the admin panel at `/admin` to generate real codes.

## Format

`BBD-XXXX-XXXX` (BBD prefix + 4 alphanumeric + 4 alphanumeric)

Characters: A-Z (excl. I, L, O) + 2-9 (excl. 0, 1)

## Workshop Codes (workshop-2025)

| # | Code | Plan |
| --- | ------ | ------ |
| 1 | `BBD-YF79-PRTD` | workshop-2025 |
| 2 | `BBD-A2PY-X9VK` | workshop-2025 |
| 3 | `BBD-HQZU-EEDC` | workshop-2025 |
| 4 | `BBD-EBNX-4M4P` | workshop-2025 |
| 5 | `BBD-8F7V-D4UB` | workshop-2025 |

## Premium Codes (premium)

| # | Code | Plan |
| --- | ------ | ------ |
| 6 | `BBD-X4FK-K8F9` | premium |
| 7 | `BBD-7ZFT-EB32` | premium |
| 8 | `BBD-4Y3M-6TPE` | premium |
| 9 | `BBD-AMJK-A7RS` | premium |
| 10 | `BBD-ZTNP-Y53V` | premium |

## How to Use

1. Go to `/register`
2. Fill in name, email, password
3. Enter one of the codes above
4. (Currently will fail — backend not built yet)

## Next Steps

- [ ] Build Cloudflare Worker backend (Hono + D1 + KV)
- [ ] Implement `/api/validate-code` endpoint
- [ ] Implement `/api/auth/register` and `/api/auth/login`
- [ ] Implement `/api/admin/codes` for code generation
- [ ] Deploy to Cloudflare Pages + Workers
