// Cloudflare Pages Function: POST /api/submit
// Accepts quest submissions, validates access code, stores in KV

// Code pattern: BBD-XXXX-XXXX (X = alphanumeric uppercase)
const CODE_PATTERN = /^BBD-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

// Normalize code input
function normalizeCode(code) {
  return code.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
}

// Format as BBD-XXXX-XXXX
function formatCode(code) {
  const normalized = normalizeCode(code);
  if (normalized.length < 10) return normalized;
  return `BBD-${normalized.slice(3, 7)}-${normalized.slice(7, 11)}`;
}

// Rate limiting: 5 submissions per minute per IP
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 });
    return true;
  }

  if (record.count >= 5) {
    return false;
  }

  record.count++;
  return true;
}

// Parse client test output to determine pass/fail
function parseTestResult(output) {
  if (!output || typeof output !== 'string') return false;
  const lower = output.toLowerCase();
  // Check for completion indicators
  if (lower.includes('complete') || lower.includes('all tests passed') || lower.includes('quest') && lower.includes('complete')) {
    return true;
  }
  // Check for failure indicators
  if (lower.includes('fail') || lower.includes('error') || lower.includes('assertion')) {
    return false;
  }
  return false;
}

// Generate a simple submission ID
function generateSubmissionId() {
  return 'sub_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
}

export async function onRequestPost(context) {
  const { request, env, cf } = context;
  const ip = cf?.connectingIp || 'unknown';

  // Rate limiting
  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Too many submissions. Please try again later.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Validate access code from Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Authorization required. Run: bluebeltdojo setup <code>' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const rawCode = authHeader.slice(7);
    const code = formatCode(rawCode);

    if (!CODE_PATTERN.test(code)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid access code format' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate code exists in KV
    const codeData = await env.KV_NAMESPACE.get(`code:${code}`, { type: 'json' });
    if (!codeData) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid or expired access code' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if code has expired
    if (codeData.expires && new Date(codeData.expires) < new Date()) {
      return new Response(
        JSON.stringify({ success: false, error: 'Access code has expired' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const body = await request.json();
    const { questId, files, clientTestOutput } = body;

    if (!questId) {
      return new Response(
        JSON.stringify({ success: false, error: 'questId is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!files || typeof files !== 'object') {
      return new Response(
        JSON.stringify({ success: false, error: 'files object is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Determine pass/fail from client test output
    const passed = parseTestResult(clientTestOutput);

    // Create submission record
    const submissionId = generateSubmissionId();
    const submittedAt = new Date().toISOString();

    const submission = {
      submissionId,
      questId,
      code,
      files,
      clientTestOutput: clientTestOutput || null,
      submittedAt,
      passed,
      ip
    };

    // Store submission in KV: submission:<questId>:<code>
    const submissionKey = `submission:${questId}:${code}`;
    
    // Check for previous best
    const previousSubmission = await env.KV_NAMESPACE.get(submissionKey, { type: 'json' });
    const previousBest = previousSubmission ? previousSubmission.passed : null;

    await env.KV_NAMESPACE.put(submissionKey, JSON.stringify(submission));

    // Update progress map: progress:<code>
    const progressKey = `progress:${code}`;
    const progressData = await env.KV_NAMESPACE.get(progressKey, { type: 'json' }) || {
      quests: {}
    };

    const questProgress = progressData.quests[questId] || {
      completed: false,
      submittedAt: null,
      attempts: 0
    };

    questProgress.attempts++;
    questProgress.submittedAt = submittedAt;

    if (passed) {
      questProgress.completed = true;
    }

    progressData.quests[questId] = questProgress;
    await env.KV_NAMESPACE.put(progressKey, JSON.stringify(progressData));

    return new Response(
      JSON.stringify({
        success: true,
        passed,
        testOutput: clientTestOutput || null,
        submissionId,
        previousBest
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Submit error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
