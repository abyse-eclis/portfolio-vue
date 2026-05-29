# portfolio-vue

Standalone **Vue 3 + Vite + Tailwind v4 + Supabase** version of the portfolio
front-end, split out from the Laravel/Inertia project so the public site can be
deployed as a static SPA (e.g. Vercel/Netlify) with Supabase as the backend.

## Status

The presentational Vue code has been copied over from the Laravel/Inertia repo.
The project scaffold (Vite, router, Tailwind, Supabase client) is in place, but
the data layer still needs to be migrated off Inertia.

### ✅ Done
- Vite + Vue + TypeScript + Tailwind v4 scaffold
- `vue-router` set up to mirror the old Laravel routes (`src/router.ts`)
- Supabase client (`src/lib/supabase.ts`) + `.env.example`
- All `.vue` components, composables, i18n, layouts copied into `src/`

### 🚧 To do — rewire off Inertia
These files still `import` from `@inertiajs/vue3` and must be migrated:

| File | Change needed |
| --- | --- |
| `Pages/Portfolio/Home.vue`, `Portfolio/ProjectDetail.vue`, `Freelance/Home.vue` | replace Inertia page props with `supabase.from(...).select()` calls |
| `Components/Shared/ContactForm.vue`, `*/ContactSection.vue` | submit via Supabase insert / Edge Function instead of POST to Laravel |
| `Components/Shared/Footer.vue`, `Portfolio/ProjectFilter.vue`, `Shared/Toast.vue` | swap Inertia `<Link>` / router for `<router-link>` / `vue-router` |
| `Composables/useSeo.ts`, `useLocale.ts`, `useSiteMode.ts` | drop `usePage()`; read state from router / Supabase |
| `i18n/index.ts` | drop the Inertia-shared locale lookup |

Run `grep -rl "@inertiajs" src` to see the current list.

### Also needed
- A Supabase schema for projects / profile / certificates / etc. + **Row Level
  Security policies on every table** before going live.
- An admin solution (Filament from the Laravel repo is gone here) — build a small
  Vue admin or use the Supabase Studio table editor.

## Getting started
```bash
npm install
cp .env.example .env   # fill in VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
npm run dev
```

> The original Laravel/Inertia version lives in the `portfolio` repo and remains
> fully functional.
