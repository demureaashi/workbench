-- Public write-only capture dropbox for bookmarklets.
-- Bookmarklets run on third-party pages and cannot access the Workbench
-- operator session. They can write here with the public anon key; signed-in
-- Workbench sessions review the pending rows later.

create table if not exists public.capture_drops (
  id text primary key,
  workspace_id text not null default 'st',
  source text not null default 'Web',
  title text not null default '',
  url text not null default '',
  captured_when timestamptz not null default now(),
  snippet text not null default '',
  email_clues text not null default '',
  linkedin_url text not null default '',
  status text not null default 'pending',
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists capture_drops_status_created_idx on public.capture_drops(status, created_at desc);

alter table public.capture_drops enable row level security;

drop policy if exists "capture drops anonymous insert" on public.capture_drops;
create policy "capture drops anonymous insert" on public.capture_drops
for insert
to anon, authenticated
with check (status = 'pending');

drop policy if exists "capture drops authenticated review" on public.capture_drops;
create policy "capture drops authenticated review" on public.capture_drops
for select
to authenticated
using (true);

drop policy if exists "capture drops authenticated update" on public.capture_drops;
create policy "capture drops authenticated update" on public.capture_drops
for update
to authenticated
using (true)
with check (true);
