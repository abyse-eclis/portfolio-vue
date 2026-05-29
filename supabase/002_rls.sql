-- 002_rls.sql
-- Row Level Security. The frontend talks to Postgres with the public ANON key,
-- so every table MUST have RLS enabled — otherwise the key exposes everything.
--
-- Model:
--   * Content tables  → anon may SELECT only (read-only public site).
--   * testimonials    → anon may SELECT only published rows.
--   * contact_submissions → anon may INSERT only; NO select/update/delete,
--                           so visitors can send a message but can never read
--                           anyone's submissions. Read them via the dashboard
--                           or the service_role key (e.g. an Edge Function).
--
-- Writes to content tables are expected to go through the service_role key
-- (Supabase dashboard / a seeder / an admin tool), which bypasses RLS.
-- Safe to re-run: each policy is dropped first.

-- --- enable RLS ------------------------------------------------------------
alter table profiles            enable row level security;
alter table skill_categories    enable row level security;
alter table skills              enable row level security;
alter table social_links        enable row level security;
alter table projects            enable row level security;
alter table certificates        enable row level security;
alter table packages            enable row level security;
alter table package_features    enable row level security;
alter table process_steps       enable row level security;
alter table testimonials        enable row level security;
alter table contact_submissions enable row level security;

-- --- public read policies --------------------------------------------------
drop policy if exists "public read" on profiles;
create policy "public read" on profiles         for select to anon using (true);

drop policy if exists "public read" on skill_categories;
create policy "public read" on skill_categories for select to anon using (true);

drop policy if exists "public read" on skills;
create policy "public read" on skills           for select to anon using (true);

drop policy if exists "public read" on social_links;
create policy "public read" on social_links     for select to anon using (true);

drop policy if exists "public read" on projects;
create policy "public read" on projects         for select to anon using (true);

drop policy if exists "public read" on certificates;
create policy "public read" on certificates     for select to anon using (true);

drop policy if exists "public read" on packages;
create policy "public read" on packages         for select to anon using (true);

drop policy if exists "public read" on package_features;
create policy "public read" on package_features for select to anon using (true);

drop policy if exists "public read" on process_steps;
create policy "public read" on process_steps    for select to anon using (true);

-- testimonials: only expose published rows (the client also filters, but RLS
-- is the real guard so drafts never leave the database).
drop policy if exists "public read published" on testimonials;
create policy "public read published" on testimonials
    for select to anon using (is_published = true);

-- --- contact_submissions: insert-only for the public ----------------------
drop policy if exists "anyone can submit" on contact_submissions;
create policy "anyone can submit" on contact_submissions
    for insert to anon with check (true);
-- (Intentionally no SELECT/UPDATE/DELETE policy for anon.)
