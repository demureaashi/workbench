import { randomUUID } from "node:crypto";
import { DEFAULT_WORKSPACE, PALETTES, PRIORITIES, ROLE_STATUSES, STAGES } from "@talent/shared";
import type { BootstrapPayload, Candidate, Capture, PaletteName, Role, RoleStatus, Template, Workspace } from "@talent/shared";
import type { TalentDatabase } from "./client";

type DbRow = Record<string, unknown>;

export function listWorkspaces(db: TalentDatabase): Workspace[] {
  return (db.prepare("SELECT * FROM workspaces WHERE archived = 0 ORDER BY created_at ASC").all() as DbRow[]).map(toWorkspace);
}

export function getBootstrap(db: TalentDatabase, workspaceId?: string): BootstrapPayload {
  const workspaces = listWorkspaces(db);
  const activeWorkspace = workspaces.find((workspace) => workspace.id === workspaceId) || workspaces[0] || DEFAULT_WORKSPACE;
  return {
    workspaces,
    activeWorkspace,
    roles: listRoles(db, activeWorkspace.id),
    candidates: listCandidates(db, activeWorkspace.id),
    templates: listTemplates(db, activeWorkspace.id),
    captures: listCaptures(db, activeWorkspace.id)
  };
}

export function createWorkspace(db: TalentDatabase, input: Partial<Workspace>): Workspace {
  const palette = validPalette(input.palette) ? input.palette : "house";
  const workspace: Workspace = {
    id: input.id || randomUUID(),
    name: input.name?.trim() || "Untitled Workspace",
    mark: (input.mark?.trim() || "TW").slice(0, 3).toUpperCase(),
    type: input.type?.trim() || "Talent workspace",
    palette
  };

  db.prepare(`
    INSERT INTO workspaces (id, name, mark, type, palette)
    VALUES (@id, @name, @mark, @type, @palette)
  `).run(workspace);

  return workspace;
}

export function updateWorkspace(db: TalentDatabase, id: string, input: Partial<Workspace>): Workspace | null {
  const current = db.prepare("SELECT * FROM workspaces WHERE id = ?").get(id) as DbRow | undefined;
  if (!current) return null;

  const next: Workspace = {
    id,
    name: input.name?.trim() || String(current.name),
    mark: (input.mark?.trim() || String(current.mark)).slice(0, 3).toUpperCase(),
    type: input.type?.trim() || String(current.type),
    palette: validPalette(input.palette) ? input.palette : (String(current.palette) as PaletteName),
    archived: input.archived ?? Boolean(current.archived)
  };

  db.prepare(`
    UPDATE workspaces
    SET name = @name,
        mark = @mark,
        type = @type,
        palette = @palette,
        archived = @archived,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = @id
  `).run({ ...next, archived: next.archived ? 1 : 0 });

  return next;
}

export function listRoles(db: TalentDatabase, workspaceId: string): Role[] {
  return db.prepare("SELECT * FROM roles WHERE workspace_id = ? ORDER BY archived ASC, priority ASC, opened DESC").all(workspaceId).map((row) => toRole(db, row as DbRow));
}

export function listCandidates(db: TalentDatabase, workspaceId: string): Candidate[] {
  return db.prepare("SELECT * FROM candidates WHERE workspace_id = ? ORDER BY archived ASC, follow_up ASC, name ASC").all(workspaceId).map((row) => toCandidate(db, row as DbRow));
}

export function listTemplates(db: TalentDatabase, workspaceId: string): Template[] {
  return db.prepare("SELECT * FROM templates WHERE workspace_id = ? ORDER BY title ASC").all(workspaceId).map((row) => toTemplate(row as DbRow));
}

export function listCaptures(db: TalentDatabase, workspaceId: string): Capture[] {
  return db.prepare("SELECT * FROM captures WHERE workspace_id = ? AND dismissed = 0 ORDER BY captured_when DESC").all(workspaceId).map((row) => toCapture(row as DbRow));
}

function toWorkspace(row: DbRow): Workspace {
  return {
    id: String(row.id),
    name: String(row.name),
    mark: String(row.mark),
    type: String(row.type),
    palette: validPalette(String(row.palette)) ? String(row.palette) as PaletteName : "house",
    archived: Boolean(row.archived)
  };
}

function toRole(db: TalentDatabase, row: DbRow): Role {
  const id = String(row.id);
  const must = db.prepare("SELECT value FROM role_must_haves WHERE role_id = ? ORDER BY position ASC").all(id).map((item) => String((item as DbRow).value));
  const status = ROLE_STATUSES.includes(row.status as RoleStatus) ? row.status as RoleStatus : "Active";
  return {
    id,
    workspaceId: String(row.workspace_id),
    title: String(row.title),
    client: String(row.client),
    location: String(row.location),
    priority: PRIORITIES.includes(row.priority as Role["priority"]) ? row.priority as Role["priority"] : "Medium",
    status,
    target: Number(row.target || 0),
    submitted: Number(row.submitted || 0),
    week: String(row.week || ""),
    board: String(row.board || ""),
    must,
    nice: String(row.nice || ""),
    manager: String(row.manager || ""),
    comp: String(row.comp || ""),
    opened: String(row.opened || ""),
    due: String(row.due || ""),
    brief: String(row.brief || ""),
    screening: String(row.screening || ""),
    notes: String(row.notes || ""),
    archived: Boolean(row.archived),
    closed: String(row.closed || ""),
    closeReason: String(row.close_reason || "")
  };
}

function toCandidate(db: TalentDatabase, row: DbRow): Candidate {
  const id = String(row.id);
  const skills = db.prepare("SELECT value FROM candidate_skills WHERE candidate_id = ? ORDER BY position ASC").all(id).map((item) => String((item as DbRow).value));
  const links = db.prepare("SELECT url FROM candidate_links WHERE candidate_id = ? ORDER BY position ASC").all(id).map((item) => String((item as DbRow).url));
  const files = db.prepare("SELECT * FROM candidate_files WHERE candidate_id = ? ORDER BY created_at DESC").all(id).map((file) => ({
    id: String((file as DbRow).id),
    candidateId: id,
    name: String((file as DbRow).name),
    size: Number((file as DbRow).size || 0),
    mimeType: String((file as DbRow).mime_type || ""),
    storageKey: String((file as DbRow).storage_key),
    createdAt: String((file as DbRow).created_at)
  }));

  const stage = STAGES.includes(row.stage as Candidate["stage"]) ? row.stage as Candidate["stage"] : "Sourced";
  return {
    id,
    workspaceId: String(row.workspace_id),
    name: String(row.name),
    title: String(row.title || ""),
    company: String(row.company || ""),
    location: String(row.location || ""),
    roleId: String(row.role_id || ""),
    stage,
    followUp: String(row.follow_up || ""),
    lastContact: String(row.last_contact || ""),
    snoozedUntil: String(row.snoozed_until || ""),
    snoozedOn: String(row.snoozed_on || ""),
    contactedOn: String(row.contacted_on || ""),
    touches: Number(row.touches || 0),
    linkedin: String(row.linkedin || ""),
    email: String(row.email || ""),
    files,
    links,
    skills,
    notes: String(row.notes || ""),
    remarks: String(row.remarks || ""),
    sequence: String(row.sequence || ""),
    archived: Boolean(row.archived),
    archivedAt: String(row.archived_at || ""),
    closeReason: String(row.close_reason || "")
  };
}

function toTemplate(row: DbRow): Template {
  return {
    id: String(row.id),
    workspaceId: String(row.workspace_id),
    title: String(row.title),
    type: String(row.type),
    body: String(row.body),
    used: Number(row.used || 0),
    lastUsed: String(row.last_used || "")
  };
}

function toCapture(row: DbRow): Capture {
  return {
    id: String(row.id),
    workspaceId: String(row.workspace_id),
    source: String(row.source || ""),
    title: String(row.title),
    url: String(row.url || ""),
    when: String(row.captured_when || ""),
    snippet: String(row.snippet || ""),
    name: String(row.name || ""),
    parsedTitle: String(row.parsed_title || ""),
    company: String(row.company || ""),
    location: String(row.location || ""),
    email: String(row.email || ""),
    link: String(row.link || ""),
    roleId: String(row.role_id || ""),
    dismissed: Boolean(row.dismissed)
  };
}

function validPalette(value: unknown): value is PaletteName {
  return typeof value === "string" && value in PALETTES;
}
