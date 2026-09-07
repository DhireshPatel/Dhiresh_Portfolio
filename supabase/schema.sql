-- ─────────────────────────────────────────────────────────
-- Dhiresh Portfolio — Supabase schema
-- Paste this entire file into the Supabase SQL Editor and run it.
-- ─────────────────────────────────────────────────────────

-- Extension needed for gen_random_uuid()
create extension if not exists pgcrypto;

-- ─────────────────────────────────────────────────────────
-- Table: contact_messages
-- ─────────────────────────────────────────────────────────
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  subject     text not null,
  message     text not null,
  status      text not null default 'new' check (status in ('new', 'read', 'replied', 'archived')),
  created_at  timestamptz not null default now()
);

-- Helpful indexes for the admin dashboard
create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);
create index if not exists contact_messages_status_idx on public.contact_messages (status);

-- ─────────────────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────────────────
alter table public.contact_messages enable row level security;

-- Remove any pre-existing policies with the same names before re-creating
drop policy if exists "Public can insert contact messages" on public.contact_messages;
drop policy if exists "Authenticated users can read contact messages" on public.contact_messages;
drop policy if exists "Authenticated users can update contact messages" on public.contact_messages;
drop policy if exists "Authenticated users can delete contact messages" on public.contact_messages;

-- Anyone (anon + authenticated) may INSERT a new message — this is what the
-- public contact form uses. Nothing else is granted to the public role.
create policy "Public can insert contact messages"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

-- Only authenticated (logged in) users — i.e. the admin — may read messages.
create policy "Authenticated users can read contact messages"
  on public.contact_messages
  for select
  to authenticated
  using (true);

-- Only authenticated users may update message status.
create policy "Authenticated users can update contact messages"
  on public.contact_messages
  for update
  to authenticated
  using (true)
  with check (true);

-- Only authenticated users may delete messages.
create policy "Authenticated users can delete contact messages"
  on public.contact_messages
  for delete
  to authenticated
  using (true);

-- ─────────────────────────────────────────────────────────
-- Notes
-- ─────────────────────────────────────────────────────────
-- 1. Create your admin user from the Supabase dashboard:
--    Authentication → Users → Add User (email + password).
-- 2. Any authenticated user can access the admin dashboard in this schema.
--    If you plan to have multiple Supabase Auth users for other purposes,
--    consider adding an `is_admin` claim/table and tightening these
--    policies to check it instead of just `authenticated`.
