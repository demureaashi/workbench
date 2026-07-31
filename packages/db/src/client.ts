import Database from "better-sqlite3";
import { dirname, join } from "node:path";
import { mkdirSync } from "node:fs";
import { DEFAULT_WORKSPACE } from "@talent/shared";
import { MIGRATIONS } from "./schema";

export type TalentDatabase = Database.Database;

export function openTalentDb(filename = process.env.TALENT_DB_PATH || join(process.cwd(), "data", "talent.db")): TalentDatabase {
  mkdirSync(dirname(filename), { recursive: true });
  const db = new Database(filename);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  migrate(db);
  ensureDefaultWorkspace(db);
  return db;
}

function migrate(db: TalentDatabase): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const hasMigration = db.prepare("SELECT 1 FROM migrations WHERE id = ?");
  const insertMigration = db.prepare("INSERT INTO migrations (id, name) VALUES (?, ?)");

  for (const migration of MIGRATIONS) {
    if (hasMigration.get(migration.id)) continue;
    const run = db.transaction(() => {
      db.exec(migration.sql);
      insertMigration.run(migration.id, migration.name);
    });
    run();
  }
}

function ensureDefaultWorkspace(db: TalentDatabase): void {
  db.prepare(`
    INSERT OR IGNORE INTO workspaces (id, name, mark, type, palette)
    VALUES (@id, @name, @mark, @type, @palette)
  `).run(DEFAULT_WORKSPACE);
}
