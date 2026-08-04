-- Talent Workbench cloud schema for Supabase.
-- Run this in Supabase SQL Editor or with `supabase db push`.

create extension if not exists pgcrypto;

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  name text not null,
  mark text not null,
  type text not null,
  palette text not null default 'house',
  archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  title text not null default '',
  client text not null default '',
  location text not null default '',
  priority text not null default 'Medium',
  status text not null default 'Active',
  target integer not null default 0,
  submitted integer not null default 0,
  week text not null default '',
  board text not null default '',
  must text[] not null default '{}',
  nice text not null default '',
  manager text not null default '',
  comp text not null default '',
  opened date,
  due date,
  brief text not null default '',
  screening text not null default '',
  notes text not null default '',
  archived boolean not null default false,
  closed date,
  close_reason text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.candidates (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null default '',
  title text not null default '',
  company text not null default '',
  location text not null default '',
  role_id uuid references public.roles(id) on delete set null,
  stage text not null default 'Sourced',
  follow_up date,
  last_contact date,
  snoozed_until date,
  snoozed_on date,
  contacted_on date,
  touches integer not null default 0,
  linkedin text not null default '',
  linkedin_key text not null default '',
  email text not null default '',
  skills text[] not null default '{}',
  notes text not null default '',
  remarks text not null default '',
  sequence text not null default '',
  archived boolean not null default false,
  archived_at date,
  close_reason text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.candidate_links (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  url text not null,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.candidate_files (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  size bigint not null default 0,
  mime_type text not null default '',
  storage_key text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.templates (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  title text not null default '',
  type text not null default 'Outreach',
  body text not null default '',
  used integer not null default 0,
  last_used date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.captures (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  source text not null default '',
  title text not null default '',
  url text not null default '',
  captured_when timestamptz not null default now(),
  snippet text not null default '',
  name text not null default '',
  parsed_title text not null default '',
  company text not null default '',
  location text not null default '',
  email text not null default '',
  linkedin_url text not null default '',
  link text not null default '',
  role_id uuid references public.roles(id) on delete set null,
  dismissed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists roles_workspace_idx on public.roles(workspace_id);
create index if not exists candidates_workspace_idx on public.candidates(workspace_id);
create index if not exists candidates_role_idx on public.candidates(role_id);
create unique index if not exists candidates_workspace_linkedin_key_unique
  on public.candidates(workspace_id, linkedin_key)
  where linkedin_key <> '';
create index if not exists candidate_links_candidate_idx on public.candidate_links(candidate_id);
create index if not exists candidate_files_candidate_idx on public.candidate_files(candidate_id);
create index if not exists templates_workspace_idx on public.templates(workspace_id);
create index if not exists captures_workspace_idx on public.captures(workspace_id);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists workspaces_touch_updated_at on public.workspaces;
create trigger workspaces_touch_updated_at before update on public.workspaces
for each row execute function public.touch_updated_at();

drop trigger if exists roles_touch_updated_at on public.roles;
create trigger roles_touch_updated_at before update on public.roles
for each row execute function public.touch_updated_at();

drop trigger if exists candidates_touch_updated_at on public.candidates;
create trigger candidates_touch_updated_at before update on public.candidates
for each row execute function public.touch_updated_at();

drop trigger if exists templates_touch_updated_at on public.templates;
create trigger templates_touch_updated_at before update on public.templates
for each row execute function public.touch_updated_at();

drop trigger if exists captures_touch_updated_at on public.captures;
create trigger captures_touch_updated_at before update on public.captures
for each row execute function public.touch_updated_at();

create or replace function public.workspace_is_owned(target_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.workspaces
    where id = target_workspace_id
      and owner_id = auth.uid()
  );
$$;

alter table public.workspaces enable row level security;
alter table public.roles enable row level security;
alter table public.candidates enable row level security;
alter table public.candidate_links enable row level security;
alter table public.candidate_files enable row level security;
alter table public.templates enable row level security;
alter table public.captures enable row level security;

drop policy if exists "workspace owner access" on public.workspaces;
create policy "workspace owner access" on public.workspaces
for all
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

drop policy if exists "role workspace owner access" on public.roles;
create policy "role workspace owner access" on public.roles
for all
using (public.workspace_is_owned(workspace_id))
with check (public.workspace_is_owned(workspace_id));

drop policy if exists "candidate workspace owner access" on public.candidates;
create policy "candidate workspace owner access" on public.candidates
for all
using (public.workspace_is_owned(workspace_id))
with check (public.workspace_is_owned(workspace_id));

drop policy if exists "candidate link owner access" on public.candidate_links;
create policy "candidate link owner access" on public.candidate_links
for all
using (
  exists (
    select 1
    from public.candidates c
    where c.id = candidate_id
      and public.workspace_is_owned(c.workspace_id)
  )
)
with check (
  exists (
    select 1
    from public.candidates c
    where c.id = candidate_id
      and public.workspace_is_owned(c.workspace_id)
  )
);

drop policy if exists "candidate file owner access" on public.candidate_files;
create policy "candidate file owner access" on public.candidate_files
for all
using (public.workspace_is_owned(workspace_id))
with check (public.workspace_is_owned(workspace_id));

drop policy if exists "template workspace owner access" on public.templates;
create policy "template workspace owner access" on public.templates
for all
using (public.workspace_is_owned(workspace_id))
with check (public.workspace_is_owned(workspace_id));

drop policy if exists "capture workspace owner access" on public.captures;
create policy "capture workspace owner access" on public.captures
for all
using (public.workspace_is_owned(workspace_id))
with check (public.workspace_is_owned(workspace_id));

insert into storage.buckets (id, name, public)
values ('candidate-files', 'candidate-files', false)
on conflict (id) do nothing;

drop policy if exists "candidate file storage owner access" on storage.objects;
create policy "candidate file storage owner access" on storage.objects
for all
using (
  bucket_id = 'candidate-files'
  and auth.uid()::text = (storage.foldername(name))[1]
)
with check (
  bucket_id = 'candidate-files'
  and auth.uid()::text = (storage.foldername(name))[1]
);
