CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  display_name TEXT NOT NULL DEFAULT '',
  current_belt TEXT NOT NULL DEFAULT 'white',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS quest_progress (
  user_id TEXT NOT NULL REFERENCES users(id),
  quest_id TEXT NOT NULL,
  completed_at TEXT,
  attempts INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, quest_id)
);

CREATE TABLE IF NOT EXISTS capstone_submissions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  capstone_id TEXT NOT NULL,
  repo_url TEXT,
  deployed_url TEXT,
  status TEXT NOT NULL DEFAULT 'submitted',
  submitted_at TEXT NOT NULL DEFAULT (datetime('now')),
  graded_at TEXT,
  score INTEGER,
  feedback TEXT
);

CREATE TABLE IF NOT EXISTS certificates (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  belt TEXT NOT NULL,
  issued_at TEXT NOT NULL DEFAULT (datetime('now')),
  verification_token TEXT UNIQUE NOT NULL,
  skills TEXT
);

CREATE INDEX idx_quest_progress_user ON quest_progress(user_id);
CREATE INDEX idx_certificates_token ON certificates(verification_token);
CREATE INDEX idx_certificates_user ON certificates(user_id);

-- Access codes for workshop registration
CREATE TABLE IF NOT EXISTS access_codes (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  used_by TEXT REFERENCES users(id),
  used_at TEXT,
  expires_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_access_codes_code ON access_codes(code);

-- Audit log for tracking all system events
CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  action TEXT NOT NULL,
  details TEXT,
  ip_address TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_audit_log_user ON audit_log(user_id);
CREATE INDEX idx_audit_log_action ON audit_log(action);
CREATE INDEX idx_audit_log_created ON audit_log(created_at);
