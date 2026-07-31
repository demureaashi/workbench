# Talent Workbench Monorepo Implementation Plan

## Goal

Move Talent Workbench from a static offline-first SPA to a dynamic monorepo with a React frontend, Node.js API, and SQLite persistence while preserving the current design source of truth exactly: warm paper ground, Playfair Display headings, Figtree UI, per-workspace CSS custom properties, inline table editing, drawers, dialogs, and responsive behavior.

## Target Stack

- `apps/web`: React + Vite + TypeScript frontend.
- `apps/api`: Node.js API server.
- `packages/shared`: Shared TypeScript types, enums, palette definitions, date helpers, scoring constants, and import/export payload contracts.
- `packages/db`: SQLite schema, migrations, repository functions, and seed/import helpers.
- SQLite deployment:
  - For a real local `talent.db`, deploy Node on a host with persistent disk such as Fly.io, Render, Railway, DigitalOcean, or a VPS.
  - For Vercel, use Turso/libSQL or another hosted SQLite-compatible service because Vercel serverless does not provide a durable local SQLite file.
- Resume files:
  - Local/persistent-disk deployment: store files on disk and metadata in SQLite.
  - Vercel-compatible deployment: store files in object/blob storage and metadata in SQLite-compatible DB.

## Migration Principles

- Keep the current static app at the repo root until the React app is feature-complete and visually verified.
- Treat `styles.css`, `fonts/`, and the original design file as the canonical design system. React components should consume the same class names and CSS variables.
- Move data shape first, then persistence, then behavior. Do not change UI surfaces while porting logic.
- Preserve offline-first behavior where possible by adding a local cache/sync layer after the server-backed MVP is stable.
- Ship with no mock data by default. Keep demo seed as an explicit toggle.

## Data Model

SQLite tables will be workspace-scoped:

- `workspaces`
- `roles`
- `role_must_haves`
- `candidates`
- `candidate_files`
- `candidate_links`
- `candidate_skills`
- `templates`
- `captures`
- `ui_exports` or export helpers only, not app state

Stored dates remain `YYYY-MM-DD`. Locations remain full city and country names. Stage/status values remain shared constants, not free-text.

## API Surface

Initial REST endpoints:

- `GET /health`
- `GET /api/bootstrap?workspaceId=...`
- `GET /api/workspaces`
- `POST /api/workspaces`
- `PATCH /api/workspaces/:id`
- `GET /api/roles`
- `POST /api/roles`
- `PATCH /api/roles/:id`
- `POST /api/roles/:id/duplicate`
- `POST /api/roles/:id/archive`
- `POST /api/roles/:id/restore`
- `GET /api/candidates`
- `POST /api/candidates`
- `PATCH /api/candidates/:id`
- `POST /api/candidates/:id/contacted`
- `POST /api/candidates/:id/snooze`
- `POST /api/candidates/:id/archive`
- `POST /api/candidates/:id/restore`
- `POST /api/candidates/:id/files`
- `DELETE /api/candidates/:id/files/:fileId`
- `GET /api/templates`
- `POST /api/templates`
- `PATCH /api/templates/:id`
- `POST /api/captures`
- `PATCH /api/captures/:id`
- `POST /api/captures/:id/convert`
- `POST /api/captures/:id/dismiss`
- `GET /api/search?q=...&crossWorkspace=0|1`
- `GET /api/export/workspace/:id`
- `POST /api/import/workspace`

## Work Plan

1. Create monorepo scaffolding with workspaces and TypeScript configs.
2. Extract shared constants and types from `app.js` into `packages/shared`.
3. Create SQLite schema and migration runner in `packages/db`.
4. Build API server with health/bootstrap/workspace routes first.
5. Create React shell that renders the current rail/topbar/dashboard using the existing CSS and fonts.
6. Port roles table and role drawer, including inline edit and archive/restore.
7. Port candidates table and candidate drawer, including file uploads/downloads and links.
8. Port follow-up queue logic and scoring.
9. Port templates, capture inbox/bookmarklet receiver, global search, archive, import/export.
10. Add offline cache/sync layer once server-backed behavior is stable.
11. Run full Playwright regression and screenshot comparison against the static reference.

## Current First Slice

This pass starts steps 1-5:

- Add package/workspace scaffolding.
- Add shared model constants and types.
- Add SQLite schema/migration code.
- Add API server bootstrap with workspace and bootstrap routes.
- Add React shell consuming the existing visual system.
