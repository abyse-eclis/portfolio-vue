-- 004_admin.sql
-- Adds the admin panel: authenticated write access (RLS) + storage write
-- policies + the certificate orientation column. Safe to re-run.
--
-- Auth model: a single admin user created in the Supabase Dashboard
-- (Authentication → Users → Add user). Public signup stays disabled. Anyone
-- with a valid session (the `authenticated` role) gets full read/write on the
-- content tables; the public site keeps using the anon read-only policies.

-- ---------------------------------------------------------------------------
-- certificates: support portrait + landscape layouts
-- ---------------------------------------------------------------------------
alter table certificates
    add column if not exists orientation varchar(12) not null default 'landscape';

-- normalise any unexpected values, then constrain
update certificates set orientation = 'landscape'
    where orientation not in ('landscape', 'portrait');

alter table certificates drop constraint if exists certificates_orientation_chk;
alter table certificates
    add constraint certificates_orientation_chk
    check (orientation in ('landscape', 'portrait'));

-- ---------------------------------------------------------------------------
-- authenticated full access on every content table
-- ---------------------------------------------------------------------------
do $$
declare
    t text;
    tables text[] := array[
        'profiles', 'skill_categories', 'skills', 'social_links', 'projects',
        'certificates', 'packages', 'package_features', 'process_steps',
        'testimonials', 'contact_submissions'
    ];
begin
    foreach t in array tables loop
        execute format('drop policy if exists "authenticated full access" on %I;', t);
        execute format(
            'create policy "authenticated full access" on %I for all to authenticated using (true) with check (true);',
            t
        );
    end loop;
end $$;

-- ---------------------------------------------------------------------------
-- storage: authenticated users may write to the public bucket
-- (anonymous reads already work because the bucket is public)
-- ---------------------------------------------------------------------------
drop policy if exists "admin upload devfolio-public" on storage.objects;
create policy "admin upload devfolio-public" on storage.objects
    for insert to authenticated
    with check (bucket_id = 'devfolio-public');

drop policy if exists "admin update devfolio-public" on storage.objects;
create policy "admin update devfolio-public" on storage.objects
    for update to authenticated
    using (bucket_id = 'devfolio-public')
    with check (bucket_id = 'devfolio-public');

drop policy if exists "admin delete devfolio-public" on storage.objects;
create policy "admin delete devfolio-public" on storage.objects
    for delete to authenticated
    using (bucket_id = 'devfolio-public');
