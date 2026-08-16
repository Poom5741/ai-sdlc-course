/**
 * Quest 4.17: Monitoring Dashboard Builder — test suite
 * Requires ./problem.js exporting { buildDashboard }. Run: node test.js
 */

const { buildDashboard } = require("./problem.js");

let passed = 0;
let failed = 0;

console.log("Quest 4.17: Monitoring Dashboard Builder\n");

function check(label, cond, detail) {
 if (cond) {
  console.log(`PASS ${label}`);
  passed++;
 } else {
  console.log(`FAIL ${label}`);
  if (detail) console.log(`   ${detail}`);
  failed++;
 }
}

const metrics = [
 { name: "latency", value: 100, timestamp: 1000, tags: { env: "prod" } },
 { name: "latency", value: 150, timestamp: 2000, tags: { env: "prod" } },
 { name: "latency", value: 200, timestamp: 3000, tags: { env: "prod" } },
 { name: "latency", value: 500, timestamp: 4000, tags: { env: "prod" } },
 { name: "latency", value: 3000, timestamp: 5000, tags: { env: "prod" } },
 { name: "errors", value: 1, timestamp: 1000, tags: { env: "prod" } },
 { name: "errors", value: 0, timestamp: 2000, tags: { env: "prod" } },
];

const result = buildDashboard(metrics);

// Test 1: Summary
check("summary has latency", result.summary["latency"] !== undefined);
check("summary has errors", result.summary["errors"] !== undefined);
check(
 "avg is correct",
 result.summary["latency"].avg === 790,
 `got ${result.summary["latency"].avg}`,
);
check("min is correct", result.summary["latency"].min === 100);
check("max is correct", result.summary["latency"].max === 3000);

// Test 2: P95 (THE EDGE CASE)
check(
 "has p95 calculation",
 result.summary["latency"].p95 !== undefined,
 `naive AI misses p95 — got ${JSON.stringify(Object.keys(result.summary["latency"]))}`,
);
check(
 "p95 is between max and median",
 result.summary["latency"].p95 >= 200,
 `p95: ${result.summary["latency"].p95}`,
);

// Test 3: Alerts
check("alerts is array", Array.isArray(result.alerts));
check(
 "detects high latency alert",
 result.alerts.some((a) => a.metric === "latency"),
 `alerts: ${JSON.stringify(result.alerts)}`,
);

// Test 4: Trends
check("trends is array", Array.isArray(result.trends));
check(
 "latency trend is up",
 result.trends.some((t) => t.metric === "latency" && t.direction === "up"),
);

// Test 5: Count
check("summary has count", result.summary["latency"].count === 5);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
 console.log(
  "\nQuest 4.17 complete. You observe with p95 — averages hide outliers.",
 );
 process.exit(0);
}
console.log(
 "\nHint: check the p95 test. Naive AI computes avg/min/max but misses percentiles.",
);
process.exit(1);
