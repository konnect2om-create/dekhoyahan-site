-- Early-access signups captured by POST /api/join (see worker.js).
--
-- This matches a `members` table that already existed live on the
-- production D1 database before this migration file did (created
-- directly, outside of `wrangler d1 migrations`). Written to match that
-- schema exactly rather than replace it, so this file is safe to apply
-- against both a fresh database and the existing one.
--
-- joined_at is the original signup time and is never rewritten; a repeat
-- signup only resets status back to 'active' (see worker.js).

CREATE TABLE IF NOT EXISTS members (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  email      TEXT NOT NULL COLLATE NOCASE UNIQUE,
  status     TEXT NOT NULL DEFAULT 'active'
               CHECK (status IN ('active', 'removed')),
  joined_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_members_status ON members (status);
CREATE INDEX IF NOT EXISTS idx_members_joined_at ON members (joined_at);
