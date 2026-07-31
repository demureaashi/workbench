export const MIGRATIONS = [
  {
    id: 1,
    name: "initial",
    sql: `
      CREATE TABLE IF NOT EXISTS workspaces (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        mark TEXT NOT NULL,
        type TEXT NOT NULL,
        palette TEXT NOT NULL,
        archived INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS roles (
        id TEXT PRIMARY KEY,
        workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        client TEXT NOT NULL,
        location TEXT NOT NULL,
        priority TEXT NOT NULL,
        status TEXT NOT NULL,
        target INTEGER NOT NULL DEFAULT 0,
        submitted INTEGER NOT NULL DEFAULT 0,
        week TEXT NOT NULL DEFAULT '',
        board TEXT NOT NULL DEFAULT '',
        nice TEXT NOT NULL DEFAULT '',
        manager TEXT NOT NULL DEFAULT '',
        comp TEXT NOT NULL DEFAULT '',
        opened TEXT NOT NULL DEFAULT '',
        due TEXT NOT NULL DEFAULT '',
        brief TEXT NOT NULL DEFAULT '',
        screening TEXT NOT NULL DEFAULT '',
        notes TEXT NOT NULL DEFAULT '',
        archived INTEGER NOT NULL DEFAULT 0,
        closed TEXT NOT NULL DEFAULT '',
        close_reason TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS roles_workspace_idx ON roles(workspace_id);

      CREATE TABLE IF NOT EXISTS role_must_haves (
        role_id TEXT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
        value TEXT NOT NULL,
        position INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (role_id, value)
      );

      CREATE TABLE IF NOT EXISTS candidates (
        id TEXT PRIMARY KEY,
        workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        title TEXT NOT NULL DEFAULT '',
        company TEXT NOT NULL DEFAULT '',
        location TEXT NOT NULL DEFAULT '',
        role_id TEXT NOT NULL DEFAULT '',
        stage TEXT NOT NULL DEFAULT 'Sourced',
        follow_up TEXT NOT NULL DEFAULT '',
        last_contact TEXT NOT NULL DEFAULT '',
        snoozed_until TEXT NOT NULL DEFAULT '',
        snoozed_on TEXT NOT NULL DEFAULT '',
        contacted_on TEXT NOT NULL DEFAULT '',
        touches INTEGER NOT NULL DEFAULT 0,
        linkedin TEXT NOT NULL DEFAULT '',
        email TEXT NOT NULL DEFAULT '',
        notes TEXT NOT NULL DEFAULT '',
        remarks TEXT NOT NULL DEFAULT '',
        sequence TEXT NOT NULL DEFAULT '',
        archived INTEGER NOT NULL DEFAULT 0,
        archived_at TEXT NOT NULL DEFAULT '',
        close_reason TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS candidates_workspace_idx ON candidates(workspace_id);
      CREATE INDEX IF NOT EXISTS candidates_role_idx ON candidates(role_id);

      CREATE TABLE IF NOT EXISTS candidate_skills (
        candidate_id TEXT NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
        value TEXT NOT NULL,
        position INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (candidate_id, value)
      );

      CREATE TABLE IF NOT EXISTS candidate_links (
        id TEXT PRIMARY KEY,
        candidate_id TEXT NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
        url TEXT NOT NULL,
        position INTEGER NOT NULL DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS candidate_files (
        id TEXT PRIMARY KEY,
        candidate_id TEXT NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        size INTEGER NOT NULL,
        mime_type TEXT NOT NULL DEFAULT '',
        storage_key TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS templates (
        id TEXT PRIMARY KEY,
        workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        type TEXT NOT NULL,
        body TEXT NOT NULL,
        used INTEGER NOT NULL DEFAULT 0,
        last_used TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS templates_workspace_idx ON templates(workspace_id);

      CREATE TABLE IF NOT EXISTS captures (
        id TEXT PRIMARY KEY,
        workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
        source TEXT NOT NULL DEFAULT '',
        title TEXT NOT NULL,
        url TEXT NOT NULL DEFAULT '',
        captured_when TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        snippet TEXT NOT NULL DEFAULT '',
        name TEXT NOT NULL DEFAULT '',
        parsed_title TEXT NOT NULL DEFAULT '',
        company TEXT NOT NULL DEFAULT '',
        location TEXT NOT NULL DEFAULT '',
        email TEXT NOT NULL DEFAULT '',
        link TEXT NOT NULL DEFAULT '',
        role_id TEXT NOT NULL DEFAULT '',
        dismissed INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS captures_workspace_idx ON captures(workspace_id);
    `
  }
] as const;
