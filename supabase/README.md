# Supabase setup

SQL to provision the database this app reads from. Apply **in order** via the
Supabase Dashboard → SQL Editor (or `psql`):

| File | Purpose |
|------|---------|
| `001_schema.sql`  | Tables + indexes (Postgres translation of the original Laravel migrations) |
| `002_rls.sql`     | Row Level Security — public read on content, insert-only on `contact_submissions` |
| `003_storage.sql` | Public storage bucket `devfolio-public` for images/resume |

After running these:

1. Copy `.env.example` → `.env` and set `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`.
2. Seed content (one `profiles` row is required — the home pages render once it
   loads). Insert with the service_role key / dashboard, which bypasses RLS.
3. Upload images to the `devfolio-public` bucket; store the object key in the
   matching `*_path` column.

## Not covered here (needs an Edge Function)

The old Laravel flow also sent a notification email and rate-limited the contact
form (`throttle:contact`). Those can't be done safely from the browser. When
ready, add a `submit-contact` Edge Function (service_role insert + email +
per-IP rate limit) and point `src/Composables/useContact.ts` at it instead of
the direct `insert`.
