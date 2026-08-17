#!/bin/bash
# Promote a user to admin role
# Usage: ./scripts/promote-admin.sh <email>

EMAIL=${1:-"admin@bluebeltdojo.ai"}

echo "Promoting $EMAIL to admin role..."

npx wrangler d1 execute ai-sdlc-course --remote \
  --command "UPDATE users SET role = 'admin' WHERE email = '$EMAIL';"

echo ""
echo "Done! User $EMAIL is now an admin."
echo "Login at /login and you'll be redirected to /admin"
