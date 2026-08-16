# Quest 18.3: Framework Migration

**Block**: 18 - AI Migration | **Difficulty**: 🔴 Hard | **Time**: 35 minutes

## 🎯 Learning Objectives

- Migrate Express routes to Fastify routes.
- **Migrate one route at a time** — don't rewrite the whole app.

## 💡 Hints

- `res.status(N).send()` → `reply.code(N).send()` (status codes must be handled).
- `req.body` → `request.body`, `res.send()` → `reply.send()`.
- Handler params: `(req, res)` → `(request, reply)`.
