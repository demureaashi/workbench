-- Align Supabase tables with the shipped static Workbench app.
-- The app uses stable text ids such as ws_*, role_* and cand_* so local
-- IndexedDB records can sync without remapping every relationship.

drop policy if exists "workspace owner access" on public.workspaces;
drop policy if exists "role workspace owner access" on public.roles;
drop policy if exists "candidate workspace owner access" on public.candidates;
drop policy if exists "candidate link owner access" on public.candidate_links;
drop policy if exists "candidate file owner access" on public.candidate_files;
drop policy if exists "template workspace owner access" on public.templates;
drop policy if exists "capture workspace owner access" on public.captures;

alter table public.captures drop constraint if exists captures_role_id_fkey;
alter table public.captures drop constraint if exists captures_workspace_id_fkey;
alter table public.templates drop constraint if exists templates_workspace_id_fkey;
alter table public.candidate_files drop constraint if exists candidate_files_workspace_id_fkey;
alter table public.candidate_files drop constraint if exists candidate_files_candidate_id_fkey;
alter table public.candidate_links drop constraint if exists candidate_links_candidate_id_fkey;
alter table public.candidates drop constraint if exists candidates_role_id_fkey;
alter table public.candidates drop constraint if exists candidates_workspace_id_fkey;
alter table public.roles drop constraint if exists roles_workspace_id_fkey;

drop function if exists public.workspace_is_owned(uuid);

alter table public.workspaces alter column id drop default;
alter table public.workspaces alter column id type text using id::text;

alter table public.roles alter column id drop default;
alter table public.roles alter column id type text using id::text;
alter table public.roles alter column workspace_id type text using workspace_id::text;
alter table public.roles add column if not exists archived_at date;

alter table public.candidates alter column id drop default;
alter table public.candidates alter column id type text using id::text;
alter table public.candidates alter column workspace_id type text using workspace_id::text;
alter table public.candidates alter column role_id type text using role_id::text;

alter table public.candidate_links alter column id drop default;
alter table public.candidate_links alter column id type text using id::text;
alter table public.candidate_links alter column candidate_id type text using candidate_id::text;

alter table public.candidate_files alter column id drop default;
alter table public.candidate_files alter column id type text using id::text;
alter table public.candidate_files alter column candidate_id type text using candidate_id::text;
alter table public.candidate_files alter column workspace_id type text using workspace_id::text;

alter table public.templates alter column id drop default;
alter table public.templates alter column id type text using id::text;
alter table public.templates alter column workspace_id type text using workspace_id::text;
alter table public.templates add column if not exists meta text not null default 'No usage yet';

alter table public.captures alter column id drop default;
alter table public.captures alter column id type text using id::text;
alter table public.captures alter column workspace_id type text using workspace_id::text;
alter table public.captures alter column role_id type text using role_id::text;
alter table public.captures add column if not exists dismissed_at timestamptz;

alter table public.roles
  add constraint roles_workspace_id_fkey foreign key (workspace_id) references public.workspaces(id) on delete cascade;

alter table public.candidates
  add constraint candidates_workspace_id_fkey foreign key (workspace_id) references public.workspaces(id) on delete cascade;
alter table public.candidates
  add constraint candidates_role_id_fkey foreign key (role_id) references public.roles(id) on delete set null;

alter table public.candidate_links
  add constraint candidate_links_candidate_id_fkey foreign key (candidate_id) references public.candidates(id) on delete cascade;

alter table public.candidate_files
  add constraint candidate_files_candidate_id_fkey foreign key (candidate_id) references public.candidates(id) on delete cascade;
alter table public.candidate_files
  add constraint candidate_files_workspace_id_fkey foreign key (workspace_id) references public.workspaces(id) on delete cascade;

alter table public.templates
  add constraint templates_workspace_id_fkey foreign key (workspace_id) references public.workspaces(id) on delete cascade;

alter table public.captures
  add constraint captures_workspace_id_fkey foreign key (workspace_id) references public.workspaces(id) on delete cascade;
alter table public.captures
  add constraint captures_role_id_fkey foreign key (role_id) references public.roles(id) on delete set null;

create or replace function public.workspace_is_owned(target_workspace_id text)
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

create policy "workspace owner access" on public.workspaces
for all
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

create policy "role workspace owner access" on public.roles
for all
using (public.workspace_is_owned(workspace_id))
with check (public.workspace_is_owned(workspace_id));

create policy "candidate workspace owner access" on public.candidates
for all
using (public.workspace_is_owned(workspace_id))
with check (public.workspace_is_owned(workspace_id));

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

create policy "candidate file owner access" on public.candidate_files
for all
using (public.workspace_is_owned(workspace_id))
with check (public.workspace_is_owned(workspace_id));

create policy "template workspace owner access" on public.templates
for all
using (public.workspace_is_owned(workspace_id))
with check (public.workspace_is_owned(workspace_id));

create policy "capture workspace owner access" on public.captures
for all
using (public.workspace_is_owned(workspace_id))
with check (public.workspace_is_owned(workspace_id));
