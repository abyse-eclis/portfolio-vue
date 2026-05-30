# Supabase setup

SQL to provision the database this app reads from. Apply **in order** via the
Supabase Dashboard → SQL Editor (or `psql`):

| File | Purpose |
|------|---------|
| `001_schema.sql`  | Tables + indexes (Postgres translation of the original Laravel migrations) |
| `002_rls.sql`     | Row Level Security — public read on content, insert-only on `contact_submissions` |
| `003_storage.sql` | Public storage bucket `devfolio-public` for images/resume |
| `004_admin.sql`   | Admin panel: certificate `orientation` column + `authenticated` write RLS + storage write policies |

After running these:

1. Copy `.env.example` → `.env` and set `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`.
2. Seed content (one `profiles` row is required — the home pages render once it
   loads). Insert with the service_role key / dashboard, which bypasses RLS.
3. Upload images to the `devfolio-public` bucket; store the object key in the
   matching `*_path` column.
4. **Admin panel:** after running `004_admin.sql`, create the admin user in
   Dashboard → Authentication → Users → *Add user* (set email + password,
   confirm it). Keep public sign-ups disabled. Log in at `/admin/login`.

## Contact Edge Function (`submit-contact`)

The old Laravel flow sent a notification email and rate-limited the contact form
(`throttle:contact`) — neither can be done safely from the browser. That logic
now lives in [`functions/submit-contact/index.ts`](functions/submit-contact/index.ts):
service_role insert + per-IP rate limit + optional Resend email.

Deploy:

```bash
supabase functions deploy submit-contact --no-verify-jwt

# Optional email notification (skipped if these are unset):
supabase secrets set RESEND_API_KEY=...        \
                     CONTACT_NOTIFY_TO=you@example.com \
                     CONTACT_NOTIFY_FROM=noreply@yourdomain.com
# Optional CORS lockdown (defaults to "*"):
supabase secrets set ALLOWED_ORIGIN=https://yourdomain.com
```

Then set `VITE_USE_CONTACT_FN=true` in the frontend `.env` so
`src/Composables/useContact.ts` invokes the function instead of inserting
directly. (`SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` are injected by the
Edge runtime automatically.)
