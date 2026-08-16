#!/usr/bin/env node
// BlueBeltDojo Admin Tools
// Usage: node scripts/admin-tools.js <command> [options]

const { execSync } = require("child_process");

const COMMANDS = {
  "create-code": {
    description: "Create a new access code",
    usage: "node admin-tools.js create-code [count]",
    fn: (args) => {
      const count = parseInt(args[0]) || 1;
      console.log(`\n🔐 Creating ${count} access code(s)...\n`);

      // Generate codes locally
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      const generateSegment = () => {
        let result = "";
        for (let i = 0; i < 4; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
      };

      const codes = [];
      for (let i = 0; i < count; i++) {
        codes.push(`BBD-${generateSegment()}-${generateSegment()}`);
      }

      console.log("Generated codes:");
      codes.forEach((code) => console.log(`  ${code}`));
      console.log(
        "\n⚠️  These codes need to be added to KV via admin panel or API",
      );
      console.log("   Visit /admin → Codes → Create New\n");

      return codes;
    },
  },

  "create-user": {
    description: "Show instructions for creating a user",
    usage: "node admin-tools.js create-user",
    fn: () => {
      console.log("\n👤 Creating a New User Account\n");
      console.log("Option 1: Self-registration");
      console.log("  1. Visit /register");
      console.log("  2. Fill in email, password, display name");
      console.log("  3. Account is created immediately\n");
      console.log("Option 2: Direct D1 insert (for test accounts)");
      console.log(
        '  Run: wrangler d1 execute bluebeltdojo --remote --command "',
      );
      console.log(
        "    INSERT INTO users (id, email, password_hash, display_name, current_belt)",
      );
      console.log(
        "    VALUES ('usr_custom_id', 'user@example.com', 'hash:salt', 'Name', 'white')\"",
      );
      console.log("  Note: Password hash must be generated properly\n");
    },
  },

  "list-users": {
    description: "List all registered users",
    usage: "node admin-tools.js list-users",
    fn: () => {
      console.log("\n👥 Listing all users...\n");
      try {
        const result = execSync(
          'wrangler d1 execute bluebeltdojo --remote --command "SELECT id, email, display_name, current_belt, created_at FROM users"',
          { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] },
        );
        console.log(result);
      } catch (e) {
        console.error("Error listing users:", e.message);
      }
    },
  },

  "list-codes": {
    description: "List all access codes in KV",
    usage: "node admin-tools.js list-codes",
    fn: () => {
      console.log("\n🔑 Access codes are stored in KV namespace");
      console.log("   Visit /admin → Codes to view and manage\n");
      console.log("   Or use wrangler KV commands directly:");
      console.log(
        "   wrangler kv key list --namespace-id=01da0f401560496f89d9b5686567024e\n",
      );
    },
  },

  help: {
    description: "Show this help message",
    fn: () => {
      console.log("\n🥋 BlueBeltDojo Admin Tools\n");
      console.log("Usage: node scripts/admin-tools.js <command> [options]\n");
      console.log("Commands:");
      Object.entries(COMMANDS).forEach(([cmd, info]) => {
        console.log(`  ${cmd.padEnd(15)} ${info.description}`);
      });
      console.log("");
    },
  },
};

const [, , command, ...args] = process.argv;

if (!command || !COMMANDS[command]) {
  COMMANDS.help.fn();
  process.exit(0);
}

COMMANDS[command].fn(args);
