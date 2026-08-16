#!/usr/bin/env node
/**
 * Quest Test Runner
 *
 * Runs node test.js in each quest directory and reports pass/fail.
 *
 * Usage:
 *   node scripts/run-all-quest-tests.js [options]
 *
 * Options:
 *   --filter <names>    Comma-separated quest names to test (default: all)
 *   --implement-solution Copy _solution/solution.js → problem.js before testing
 *   --json              Output machine-readable JSON
 *   --dry-run           List quests without running tests
 *   --timeout <ms>      Per-quest timeout in ms (default: 10000)
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const WORKSPACE = path.resolve(
  __dirname,
  "..",
  ".scratch",
  "quest-test-workspace",
);

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    filter: null,
    implementSolution: false,
    json: false,
    dryRun: false,
    timeout: 10000,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--filter" && args[i + 1]) {
      opts.filter = args[++i].split(",").map((s) => s.trim());
    } else if (args[i] === "--implement-solution") {
      opts.implementSolution = true;
    } else if (args[i] === "--json") {
      opts.json = true;
    } else if (args[i] === "--dry-run") {
      opts.dryRun = true;
    } else if (args[i] === "--timeout" && args[i + 1]) {
      opts.timeout = parseInt(args[++i], 10);
    }
  }
  return opts;
}

function discoverQuests(workspace) {
  const quests = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (entry.name.startsWith("quest-")) {
          quests.push(path.join(dir, entry.name));
        } else {
          walk(path.join(dir, entry.name));
        }
      }
    }
  };
  walk(workspace);
  return quests.sort();
}

function filterQuests(quests, filter) {
  if (!filter) return quests;
  return quests.filter((q) => {
    const name = path.basename(q);
    return filter.some((f) => name.includes(f));
  });
}

function implementSolution(questDir) {
  const solution = path.join(questDir, "_solution", "solution.js");
  const problem = path.join(questDir, "problem.js");
  if (fs.existsSync(solution) && fs.existsSync(problem)) {
    fs.copyFileSync(solution, problem);
    return true;
  }
  return false;
}

function runTest(questDir, timeout) {
  const testFile = path.join(questDir, "test.js");
  if (!fs.existsSync(testFile)) {
    return {
      status: "skip",
      exitCode: -1,
      output: "test.js not found",
      duration: 0,
    };
  }

  const start = Date.now();
  try {
    const output = execSync("node test.js", {
      cwd: questDir,
      timeout,
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    });
    return {
      status: "pass",
      exitCode: 0,
      output: output.trim(),
      duration: Date.now() - start,
    };
  } catch (err) {
    return {
      status: "fail",
      exitCode: err.status || 1,
      output: (err.stdout || "") + "\n" + (err.stderr || ""),
      duration: Date.now() - start,
    };
  }
}

function main() {
  const opts = parseArgs();
  let quests = discoverQuests(WORKSPACE);
  quests = filterQuests(quests, opts.filter);

  if (opts.dryRun) {
    console.log(`Found ${quests.length} quests:`);
    quests.forEach((q) => console.log(`  ${path.relative(WORKSPACE, q)}`));
    return;
  }

  const results = [];
  let pass = 0;
  let fail = 0;
  let skip = 0;

  for (const questDir of quests) {
    const name = path.relative(WORKSPACE, questDir);

    if (opts.implementSolution) {
      implementSolution(questDir);
    }

    const result = runTest(questDir, opts.timeout);
    results.push({ name, ...result });

    if (result.status === "pass") pass++;
    else if (result.status === "fail") fail++;
    else skip++;

    if (!opts.json) {
      const icon =
        result.status === "pass" ? "✅" : result.status === "fail" ? "❌" : "⏭️";
      console.log(`${icon} ${name} (${result.duration}ms)`);
      if (result.status === "fail") {
        const lines = result.output.split("\n").slice(0, 5);
        lines.forEach((l) => console.log(`   ${l}`));
      }
    }
  }

  const summary = {
    total: quests.length,
    pass,
    fail,
    skip,
    results,
  };

  if (opts.json) {
    const json = JSON.stringify(summary, null, 2);
    process.stdout.write(json + "\n");
  } else {
    console.log(`\n${"=".repeat(50)}`);
    console.log(
      `Total: ${summary.total} | Pass: ${pass} | Fail: ${fail} | Skip: ${skip}`,
    );
    console.log(`${"=".repeat(50)}`);
  }

  process.exit(fail > 0 ? 1 : 0);
}

main();
