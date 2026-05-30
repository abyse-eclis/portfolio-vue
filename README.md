# portfolio-vue

**Vue 3 + Vite + Tailwind v4 + Supabase** — portfolio / freelance SPA

Deploy ได้เป็น static site (Vercel / Netlify) โดยใช้ Supabase เป็น backend ทั้งหมด ไม่มี Laravel server

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vue 3, TypeScript, Vite, Tailwind v4 |
| Routing | vue-router (History mode) |
| Data | `@supabase/supabase-js` อ่าน DB โดยตรง (anon key + RLS) |
| i18n | vue-i18n + bilingual columns ใน DB (`_th` / `_en`) |
| Animation | GSAP + ScrollTrigger, Three.js (StarField) |
| Admin | Supabase Dashboard / Studio (แทน Filament) |
| Contact form | Supabase direct insert (email ผ่าน Edge Function — ดู `docs/api-internal.md`) |

---

## Getting started

```bash
npm install
cp .env.example .env   # ใส่ VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
npm run dev
```

### Environment variables

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
VITE_SUPABASE_PUBLIC_BUCKET=devfolio-public
```

> ⚠️ ใช้ **anon key เท่านั้น** — ห้าม expose `service_role_key` บน browser  
> ทุก table ต้องเปิด **Row Level Security** ก่อน go live

---

## Project structure

```
src/
├── main.ts                  # App entrypoint (createApp + router + i18n)
├── App.vue
├── router.ts                # vue-router routes
├── lib/
│   ├── supabase.ts          # Supabase client singleton
│   ├── translate.ts         # tField() — bilingual column helper
│   └── mappers.ts           # Raw DB row → typed view model
├── Composables/             # Data composables (useProfile, useProjects, …)
├── Pages/
│   ├── Portfolio/Home.vue
│   ├── Portfolio/ProjectDetail.vue
│   ├── Freelance/Home.vue
│   └── Contact/ThankYou.vue
├── Layouts/
│   ├── PortfolioLayout.vue
│   └── FreelanceLayout.vue
├── Components/              # Portfolio/, Freelance/, Shared/, Three/
├── i18n/                    # th.ts, en.ts, index.ts
└── types/                   # index.ts, pages.ts
```

---

## Database setup

รัน SQL ตามลำดับใน Supabase Dashboard → SQL Editor:

| File | เนื้อหา |
|------|---------|
| `supabase/001_schema.sql` | Tables + indexes |
| `supabase/002_rls.sql` | RLS policies (public read + insert contact) |
| `supabase/003_storage.sql` | Public bucket `devfolio-public` |

แล้ว seed ข้อมูลด้วย Dashboard หรือ `service_role` key (ไม่ผ่าน RLS)

---

## Docs

| ไฟล์ | เนื้อหา |
|------|---------|
| [docs/architecture.md](docs/architecture.md) | ภาพรวมสถาปัตยกรรม, request flow, bilingual system |
| [docs/frontend.md](docs/frontend.md) | Vue components, composables, i18n, animation |
| [docs/database.md](docs/database.md) | Schema, RLS, Storage buckets |
| [docs/api-internal.md](docs/api-internal.md) | Supabase queries per page + contact form |
| [docs/deployment.md](docs/deployment.md) | Deploy บน Vercel/Netlify |
| [docs/admin.md](docs/admin.md) | จัดการ content ผ่าน Supabase Studio |
| [docs/phases.md](docs/phases.md) | Roadmap การพัฒนา |

---

## Migration note

โปรเจคนี้แยกออกมาจาก Laravel/Inertia repo — UI components ถูก copy มาแล้ว
data layer ถูก migrate ให้ดึงข้อมูลโดยตรงจาก Supabase ผ่าน composables แทน Inertia page props
