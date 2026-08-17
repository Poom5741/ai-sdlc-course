// Script to create admin user in D1
// Run with: npx wrangler d1 execute ai-sdlc-course --file=./scripts/seed-admin.sql --remote

// First, generate the password hash using the same PBKDF2 method as the app
// This SQL inserts an admin user with a pre-computed password hash

// Admin credentials:
// Email: admin@bluebeltdojo.ai
// Password: bluebeltdojo2024
// Role: admin

const fs = require("fs");

// Generate the SQL file with a placeholder hash
// The hash needs to be generated separately using the app's crypto functions
const sql = `
-- Seed admin user
-- Email: admin@bluebeltdojo.ai
-- Password: bluebeltdojo2024
-- Role: admin

INSERT OR IGNORE INTO users (id, email, password_hash, display_name, current_belt, role)
VALUES (
  'usr_admin_001',
  'admin@bluebeltdojo.ai',
  'PLACEHOLDER_HASH',
  'Admin',
  'black',
  'admin'
);
`;

fs.writeFileSync("./migrations/seed-admin.sql", sql);
console.log("Created seed-admin.sql template");
console.log("");
console.log("NOTE: You need to generate the password hash first!");
console.log("Option 1: Register via /register, then update role to admin");
console.log("Option 2: Use the generate-hash.js script to create the hash");
