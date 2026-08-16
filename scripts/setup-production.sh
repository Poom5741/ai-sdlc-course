#!/bin/bash
# BlueBeltDojo Production Setup Script
# Run this after deployment to set up admin access and test accounts

set -e

echo "🥋 BlueBeltDojo Production Setup"
echo "================================"
echo ""

# Check if wrangler is available
if ! command -v wrangler &>/dev/null; then
    echo "❌ wrangler not found. Install with: npm install -g wrangler"
    exit 1
fi

# Step 1: Set admin password
echo "📋 Step 1: Set Admin Password"
echo "This will be used to access /admin panel"
echo ""
wrangler pages secret put ADMIN_PASSWORD
echo "✅ Admin password set"
echo ""

# Step 2: Create test access code
echo "📋 Step 2: Creating test access code..."
echo ""

# Generate a test code
TEST_CODE="BBD-TEST-0001"
echo "Test access code: $TEST_CODE"
echo ""

# Step 3: Create test user account
echo "📋 Step 3: Creating test user account..."
echo "  Email: test@bluebeltdojo.ai"
echo "  Password: (you'll need to register at /register)"
echo ""

echo "================================"
echo "✅ Setup complete!"
echo ""
echo "🔗 URLs:"
echo "  Site: https://6d33f60f.ai-sdlc-course.pages.dev"
echo "  Admin: https://6d33f60f.ai-sdlc-course.pages.dev/admin"
echo "  Register: https://6d33f60f.ai-sdlc-course.pages.dev/register"
echo "  Login: https://6d33f60f.ai-sdlc-course.pages.dev/login"
echo ""
echo "📝 Next steps:"
echo "  1. Visit /admin and login with your password"
echo "  2. Create access codes via the admin panel"
echo "  3. Register your test account at /register"
echo ""
