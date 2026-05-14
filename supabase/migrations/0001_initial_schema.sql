-- Genie MVP schema
-- Run in Supabase SQL Editor or through Supabase CLI.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  full_name text not null,
  avatar_url text
);

create table public.family_archives (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  description text
);

create table public.archive_members (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  archive_id uuid not null references public.family_archives(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('owner', 'editor', 'viewer')),
  unique (archive_id, profile_id)
);

create table public.archive_invite_codes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archive_id uuid not null references public.family_archives(id) on delete cascade,
  created_by uuid not null references public.profiles(id) on delete cascade,
  code_hash text not null unique,
  code_preview text,
  revoked_at timestamptz
);

create table public.people (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archive_id uuid not null references public.family_archives(id) on delete cascade,
  created_by uuid references public.profiles(id) on delete set null,
  full_name text not null,
  given_name text,
  family_name text,
  birth_date date,
  death_date date,
  birth_place text,
  notes text,
  image_url text
);

create table public.relationships (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archive_id uuid not null references public.family_archives(id) on delete cascade,
  created_by uuid references public.profiles(id) on delete set null,
  person_one_id uuid not null references public.people(id) on delete cascade,
  person_two_id uuid not null references public.people(id) on delete cascade,
  relationship_type text not null check (relationship_type in ('parent', 'child', 'partner', 'sibling', 'other')),
  notes text,
  check (person_one_id <> person_two_id)
);

create table public.stories (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archive_id uuid not null references public.family_archives(id) on delete cascade,
  created_by uuid references public.profiles(id) on delete set null,
  title text not null,
  excerpt text not null default '',
  body text,
  date_text text,
  location text,
  image_url text
);

create table public.story_people (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  archive_id uuid not null references public.family_archives(id) on delete cascade,
  story_id uuid not null references public.stories(id) on delete cascade,
  person_id uuid not null references public.people(id) on delete cascade,
  unique (story_id, person_id)
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archive_id uuid not null references public.family_archives(id) on delete cascade,
  uploaded_by uuid references public.profiles(id) on delete set null,
  storage_path text not null,
  alt_text text,
  caption text,
  mime_type text,
  unique (storage_path)
);

create table public.story_media (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  archive_id uuid not null references public.family_archives(id) on delete cascade,
  story_id uuid not null references public.stories(id) on delete cascade,
  media_asset_id uuid not null references public.media_assets(id) on delete cascade,
  unique (story_id, media_asset_id)
);

create table public.person_media (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  archive_id uuid not null references public.family_archives(id) on delete cascade,
  person_id uuid not null references public.people(id) on delete cascade,
  media_asset_id uuid not null references public.media_assets(id) on delete cascade,
  unique (person_id, media_asset_id)
);

create index on public.family_archives(owner_id);
create index on public.archive_members(profile_id);
create index on public.archive_invite_codes(archive_id);
create index on public.people(archive_id);
create index on public.relationships(archive_id);
create index on public.stories(archive_id);
create index on public.media_assets(archive_id);

create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
create trigger family_archives_updated_at before update on public.family_archives
for each row execute function public.set_updated_at();
create trigger archive_invite_codes_updated_at before update on public.archive_invite_codes
for each row execute function public.set_updated_at();
create trigger people_updated_at before update on public.people
for each row execute function public.set_updated_at();
create trigger relationships_updated_at before update on public.relationships
for each row execute function public.set_updated_at();
create trigger stories_updated_at before update on public.stories
for each row execute function public.set_updated_at();
create trigger media_assets_updated_at before update on public.media_assets
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.family_archives enable row level security;
alter table public.archive_members enable row level security;
alter table public.archive_invite_codes enable row level security;
alter table public.people enable row level security;
alter table public.relationships enable row level security;
alter table public.stories enable row level security;
alter table public.story_people enable row level security;
alter table public.media_assets enable row level security;
alter table public.story_media enable row level security;
alter table public.person_media enable row level security;

create or replace function public.is_archive_owner(target_archive_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.family_archives
    where id = target_archive_id and owner_id = auth.uid()
  );
$$;

create or replace function public.can_read_archive(target_archive_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_archive_owner(target_archive_id)
    or exists (
      select 1 from public.archive_members
      where archive_id = target_archive_id and profile_id = auth.uid()
    );
$$;

create policy "Profiles are readable by owner" on public.profiles
for select using (id = auth.uid());
create policy "Users create own profile" on public.profiles
for insert with check (id = auth.uid());
create policy "Users update own profile" on public.profiles
for update using (id = auth.uid()) with check (id = auth.uid());

create policy "Owners read archives" on public.family_archives
for select using (owner_id = auth.uid());
create policy "Owners create archives" on public.family_archives
for insert with check (owner_id = auth.uid());
create policy "Owners update archives" on public.family_archives
for update using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "Owners delete archives" on public.family_archives
for delete using (owner_id = auth.uid());

create policy "Members can read memberships" on public.archive_members
for select using (public.can_read_archive(archive_id));
create policy "Owners manage memberships" on public.archive_members
for all using (public.is_archive_owner(archive_id)) with check (public.is_archive_owner(archive_id));

create policy "Owners manage invite codes" on public.archive_invite_codes
for all using (public.is_archive_owner(archive_id)) with check (public.is_archive_owner(archive_id));

create policy "Read people in readable archive" on public.people
for select using (public.can_read_archive(archive_id));
create policy "Owners write people" on public.people
for all using (public.is_archive_owner(archive_id)) with check (public.is_archive_owner(archive_id));

create policy "Read relationships in readable archive" on public.relationships
for select using (public.can_read_archive(archive_id));
create policy "Owners write relationships" on public.relationships
for all using (public.is_archive_owner(archive_id)) with check (public.is_archive_owner(archive_id));

create policy "Read stories in readable archive" on public.stories
for select using (public.can_read_archive(archive_id));
create policy "Owners write stories" on public.stories
for all using (public.is_archive_owner(archive_id)) with check (public.is_archive_owner(archive_id));

create policy "Read story people in readable archive" on public.story_people
for select using (public.can_read_archive(archive_id));
create policy "Owners write story people" on public.story_people
for all using (public.is_archive_owner(archive_id)) with check (public.is_archive_owner(archive_id));

create policy "Read media in readable archive" on public.media_assets
for select using (public.can_read_archive(archive_id));
create policy "Owners write media" on public.media_assets
for all using (public.is_archive_owner(archive_id)) with check (public.is_archive_owner(archive_id));

create policy "Read story media in readable archive" on public.story_media
for select using (public.can_read_archive(archive_id));
create policy "Owners write story media" on public.story_media
for all using (public.is_archive_owner(archive_id)) with check (public.is_archive_owner(archive_id));

create policy "Read person media in readable archive" on public.person_media
for select using (public.can_read_archive(archive_id));
create policy "Owners write person media" on public.person_media
for all using (public.is_archive_owner(archive_id)) with check (public.is_archive_owner(archive_id));

-- Narrow prototype RPC for PIN resolution. The app hashes the entered PIN on the server
-- and sends the hash here, so raw PIN values do not live in the browser or table.
create or replace function public.resolve_archive_invite(input_code_hash text)
returns table (archive_id uuid, archive_name text)
language sql
stable
security definer
set search_path = public
as $$
  select a.id, a.name
  from public.archive_invite_codes c
  join public.family_archives a on a.id = c.archive_id
  where c.code_hash = input_code_hash
    and c.revoked_at is null
  limit 1;
$$;

revoke all on function public.resolve_archive_invite(text) from public;
grant execute on function public.resolve_archive_invite(text) to anon, authenticated;

-- Storage bucket and policies. Files should be uploaded as:
-- archive_id/file-id.ext
insert into storage.buckets (id, name, public)
values ('archive-media', 'archive-media', false)
on conflict (id) do nothing;

create policy "Owners read archive media objects" on storage.objects
for select using (
  bucket_id = 'archive-media'
  and public.can_read_archive((storage.foldername(name))[1]::uuid)
);

create policy "Owners upload archive media objects" on storage.objects
for insert with check (
  bucket_id = 'archive-media'
  and public.is_archive_owner((storage.foldername(name))[1]::uuid)
);

create policy "Owners update archive media objects" on storage.objects
for update using (
  bucket_id = 'archive-media'
  and public.is_archive_owner((storage.foldername(name))[1]::uuid)
) with check (
  bucket_id = 'archive-media'
  and public.is_archive_owner((storage.foldername(name))[1]::uuid)
);

create policy "Owners delete archive media objects" on storage.objects
for delete using (
  bucket_id = 'archive-media'
  and public.is_archive_owner((storage.foldername(name))[1]::uuid)
);
