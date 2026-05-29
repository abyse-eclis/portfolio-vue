-- 003_storage.sql
-- Public storage bucket for images/resume. The app builds URLs as
--   {SUPABASE_URL}/storage/v1/object/public/{bucket}/{path}
-- (see src/Composables/useSupabaseImage.ts). The bucket name must match
-- VITE_SUPABASE_PUBLIC_BUCKET (default: 'devfolio-public').
--
-- Columns ending in *_path (avatar_path, thumbnail_path, cover_path,
-- image_path, icon_path, resume_path, and gallery[].path) store the object
-- key WITHIN this bucket.

insert into storage.buckets (id, name, public)
values ('devfolio-public', 'devfolio-public', true)
on conflict (id) do update set public = true;

-- A public bucket already serves objects read-only over the public URL, so no
-- extra SELECT policy is required for anonymous reads. Uploads should be done
-- with the service_role key (dashboard / admin tooling), which bypasses RLS.
