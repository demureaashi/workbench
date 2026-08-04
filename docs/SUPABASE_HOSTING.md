# Supabase-backed Talent Workbench

Use Supabase as the persisted cloud source of truth and keep IndexedDB as the offline cache.

## Where to add the Supabase project values

Do not commit real keys. The anon key is browser-safe, but keeping configuration in environment variables makes deploys cleaner.

For local React/Vite development, create `.env.local` from `.env.example`:

```sh
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
VITE_SUPABASE_STORAGE_BUCKET=candidate-files
```

For GitHub Pages, add these as repository variables:

GitHub repo -> Settings -> Secrets and variables -> Actions -> Variables

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_STORAGE_BUCKET`

Or from the repo root:

```sh
gh variable set VITE_SUPABASE_URL --body "https://your-project-ref.supabase.co"
gh variable set VITE_SUPABASE_ANON_KEY --body "your-public-anon-key"
gh variable set VITE_SUPABASE_STORAGE_BUCKET --body "candidate-files"
```

The Pages workflow writes those values into `_site/config.js` during deploy. The committed `config.js` is intentionally blank so local QA is quiet. Never add `SUPABASE_SERVICE_ROLE_KEY` to the frontend or GitHub Pages artifact.

For a local static preview, temporarily edit `config.js` with the same public values, test, and reset it before committing:

```sh
git restore config.js
```

## Database migrations

For GitHub Actions, store the database connection string as an encrypted repository secret:

```sh
gh secret set SUPABASE_DB_URL --body "postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres"
```

Use the Supabase **Session pooler** string, not the direct `db.<project-ref>.supabase.co` string, for GitHub Actions. Supabase direct database connections use IPv6 by default, and GitHub Actions is IPv4-only unless the Supabase IPv4 add-on is enabled.

Run migrations from GitHub:

```sh
gh workflow run supabase-migrate.yml
```

## Supabase setup

1. Run the migration workflow, or open Supabase SQL Editor and run `supabase/migrations/0001_talent_workbench.sql`.
2. Authentication -> Providers -> enable Email.
3. Authentication -> URL Configuration:
   - Site URL: `https://workbench.akankshaps.com`
   - Redirect URLs:
     - `https://workbench.akankshaps.com/**`
     - `http://127.0.0.1:5173/**`
     - `http://127.0.0.1:4174/**`
4. Storage -> confirm private bucket `candidate-files` exists.

## Hosting option

Keep the static frontend on GitHub Pages for now:

```txt
workbench.akankshaps.com -> GitHub Pages
Supabase -> Postgres, Auth, private file storage
IndexedDB -> offline cache in each browser
```

This avoids operating a Node API. If we later need server-only logic, add a thin API on Railway/Fly/Vercel functions.

This is the clean "option 3" for `workbench.akankshaps.com`: GitHub Pages hosts the exact visual app, while Supabase handles the persisted database, auth, and private resume files.

## Implementation sequence

1. Add `@supabase/supabase-js` to the web app.
2. Add a sign-in screen using Supabase Auth magic links.
3. Build a Supabase repository module for workspaces, roles, candidates, templates, captures and files.
4. Keep local IndexedDB writes instant, then sync to Supabase in the background.
5. Use `linkedin_key` for duplicate protection in Supabase, matching the app's canonical LinkedIn logic.
6. Move resume blobs from IndexedDB-only into Supabase Storage with paths like:

```txt
{user_id}/{workspace_id}/{candidate_id}/{file_id}-{filename}
```

7. Show sync status in the UI: `Local`, `Syncing`, `Synced`, `Needs attention`.
