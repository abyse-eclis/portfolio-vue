# Data Layer — Supabase Queries

DevFolio ไม่มี REST API ของตัวเอง — Vue SPA ดึงข้อมูลจาก **Supabase โดยตรง** ผ่าน `@supabase/supabase-js` ด้วย anon key (RLS enforced) เอกสารนี้กำหนด query ที่ใช้ในแต่ละ page และ composable

---

## Table of Contents

- [1. Supabase Client](#1-supabase-client)
- [2. Shared Data (Navbar/Footer)](#2-shared-data-navbarfooter)
- [3. Portfolio Pages](#3-portfolio-pages)
- [4. Freelance Page](#4-freelance-page)
- [5. Contact Form](#5-contact-form)
- [6. Image URLs](#6-image-urls)
- [7. Filter Pattern (Projects)](#7-filter-pattern-projects)
- [8. Error Handling Pattern](#8-error-handling-pattern)

---

## 1. Supabase Client

```ts
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
);
```

RLS ต้องเปิดทุกตาราง มิฉะนั้น anon key จะ error — ดู [database.md § RLS](database.md#6-rls-policy-strategy)

---

## 2. Shared Data (Navbar/Footer)

### composable: `useSharedProfile`

```ts
// src/Composables/useSharedProfile.ts
const { data, error } = await supabase
    .from('profiles')
    .select('id, name, avatar_path')
    .order('id')
    .limit(1)
    .maybeSingle();

// social_links สำหรับ Footer
const { data: links } = await supabase
    .from('social_links')
    .select('id, platform, url, icon, sort_order, show_in_portfolio, show_in_freelance')
    .order('sort_order');
```

---

## 3. Portfolio Pages

### 3.1 `Portfolio/Home` — `useProfile` + `useSkills` + `useProjects` + `useCertificates`

**Profile:**
```ts
// src/Composables/useProfile.ts
const { data } = await supabase
    .from('profiles')
    .select(`
        id, name, avatar_path, resume_path, years_experience,
        headline_th, headline_en, bio_th, bio_en,
        freelance_tagline_th, freelance_tagline_en,
        freelance_bio_th, freelance_bio_en
    `)
    .order('id').limit(1).maybeSingle();
```

**Skills (nested):**
```ts
// src/Composables/useSkills.ts
const { data } = await supabase
    .from('skill_categories')
    .select(`
        id, slug, name_th, name_en, icon, sort_order,
        skills ( id, name, level, icon_path, sort_order )
    `)
    .order('sort_order');
// → map แต่ละ category เป็น SkillCategoryBlock
```

**Projects (portfolio):**
```ts
// src/Composables/useProjects.ts
let query = supabase
    .from('projects')
    .select(`
        id, slug, title_th, title_en, description_th, description_en,
        type, thumbnail_path, url, repo_url, tech_stack, is_featured, completed_at
    `)
    .order('sort_order');

// กรองตาม tech (ถ้ามี)
if (tech) query = query.contains('tech_stack', [tech]);
// กรองตาม type
if (type) query = query.eq('type', type);
```

**Certificates:**
```ts
// src/Composables/useCertificates.ts
const { data } = await supabase
    .from('certificates')
    .select('id, title_th, title_en, issuer, image_path, credential_url, issued_at')
    .order('issued_at', { ascending: false });
```

### 3.2 `Portfolio/ProjectDetail` — `useProject`

```ts
// src/Composables/useProject.ts
const { data } = await supabase
    .from('projects')
    .select(`
        id, slug, title_th, title_en, description_th, description_en,
        role_th, role_en, type, thumbnail_path, cover_path,
        url, repo_url, tech_stack, gallery, is_featured, completed_at,
        testimonials ( id, client_name, client_role_th, client_role_en,
            client_company, avatar_path, content_th, content_en, rating, is_published )
    `)
    .eq('slug', slug)
    .maybeSingle();
// gallery คือ JSONB array: [{ path, alt_th, alt_en }]
```

---

## 4. Freelance Page

### `Freelance/Home` — `useProfile` + `usePackages` + `useFreelanceProjects` + `useTestimonials` + `useProcessSteps`

**Packages (nested features):**
```ts
// src/Composables/usePackages.ts
const { data } = await supabase
    .from('packages')
    .select(`
        id, slug, name_th, name_en, tagline_th, tagline_en,
        description_th, description_en, price, currency, is_recommended, sort_order,
        package_features ( id, feature_th, feature_en, included, sort_order )
    `)
    .order('sort_order');
```

**Freelance Projects:**
```ts
// src/Composables/useFreelanceProjects.ts
const { data } = await supabase
    .from('projects')
    .select('id, slug, title_th, title_en, description_th, description_en, thumbnail_path, url, tech_stack')
    .eq('show_in_freelance', true)
    .order('sort_order')
    .limit(8);
```

**Testimonials:**
```ts
// src/Composables/useTestimonials.ts
const { data } = await supabase
    .from('testimonials')
    .select(`
        id, client_name, client_role_th, client_role_en,
        client_company, avatar_path, content_th, content_en, rating,
        projects ( id, slug, title_th, title_en )
    `)
    .eq('is_published', true)
    .order('sort_order')
    .limit(6);
```

**Process Steps:**
```ts
// src/Composables/useProcessSteps.ts
const { data } = await supabase
    .from('process_steps')
    .select('id, step_number, title_th, title_en, description_th, description_en, icon')
    .order('step_number');
```

---

## 5. Contact Form

### 5.1 Current Implementation (Direct Insert)

```ts
// src/Composables/useContact.ts
export async function submitContact(payload: ContactPayload) {
    const { error } = await supabase.from('contact_submissions').insert({
        mode: payload.mode,
        name: payload.name,
        email: payload.email,
        phone: payload.phone || null,
        subject: payload.subject || null,
        message: payload.message,
        metadata: {
            locale: payload.locale,
            package_slug: payload.package_slug || null,
            user_agent: navigator.userAgent,
            referrer: document.referrer || null,
        },
    });
    return { error: error ? error.message : null };
}
```

RLS ต้องอนุญาต `INSERT` สำหรับ `anon` บน `contact_submissions` — ดู [database.md § 6.3](database.md#63-select-policies-public-readable-tables)

### 5.2 Production Implementation (Edge Function)

สำหรับ production ต้องใช้ Edge Function เพื่อ:
- Rate limiting (IP-based)
- Server-side validation
- Email notification
- ไม่ expose service_role key ต่อ browser

**Edge Function** (`supabase/functions/submit-contact/index.ts`):

```ts
import { serve } from 'https://deno.land/std/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
    const payload = await req.json();

    // Rate limit (ตัวอย่างง่าย — ใช้ KV store หรือ upstash ใน production)
    // ...

    // Validate
    if (!payload.name || !payload.email || !payload.message) {
        return new Response(JSON.stringify({ error: 'ข้อมูลไม่ครบ' }), { status: 400 });
    }

    // Insert ด้วย service_role key
    const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { error } = await supabase.from('contact_submissions').insert({ ... });

    // Send email (ผ่าน Resend API)
    await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}` },
        body: JSON.stringify({ from: '…', to: '…', subject: '…', html: '…' }),
    });

    return new Response(JSON.stringify({ ok: true }));
});
```

**deploy:**
```bash
supabase functions deploy submit-contact
```

**`useContact.ts` สลับไปใช้ Edge Function:**
```ts
const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY },
    body: JSON.stringify(payload),
});
const result = await res.json();
return { error: result.error ?? null };
```

---

## 6. Image URLs

### 6.1 Public URL

```ts
// src/Composables/useSupabaseImage.ts
function getPublicUrl(path: string | null): string | null {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}
```

### 6.2 Image Transform

```ts
function transform(path: string | null, opts: { width?: number; height?: number; resize?: string }): string | null {
    const params = new URLSearchParams();
    if (opts.width) params.set('width', String(opts.width));
    if (opts.height) params.set('height', String(opts.height));
    if (opts.resize) params.set('resize', opts.resize);
    return `${SUPABASE_URL}/storage/v1/render/image/public/${BUCKET}/${path}?${params}`;
}
```

ใช้ใน `ProjectCard.vue`:
```ts
const thumbUrl = transform(project.thumbnail_path, { width: 800, height: 500, resize: 'cover' });
```

---

## 7. Filter Pattern (Projects)

ต่างจาก Inertia (`router.reload({ only: ['projects'], data: { tech } })`) — ตอนนี้เป็น **reactive filter ใน composable**:

```ts
// src/Composables/useProjects.ts
const filterTech = ref<string | null>(null);
const filterType = ref<string | null>(null);

async function load() {
    let query = supabase.from('projects').select('…').order('sort_order');
    if (filterTech.value) query = query.contains('tech_stack', [filterTech.value]);
    if (filterType.value) query = query.eq('type', filterType.value);
    const { data } = await query;
    projects.value = (data ?? []).map(mapProject);
}

watch([filterTech, filterType], load);
```

ใน `ProjectFilter.vue`:
```ts
const { filterTech } = useProjects();
// เมื่อ user คลิก tech badge
filterTech.value = 'Vue'; // → composable refetch อัตโนมัติ
```

---

## 8. Error Handling Pattern

```ts
// ทุก composable ใช้ pattern นี้
const loading = ref(true);
const error = ref<string | null>(null);

async function load() {
    loading.value = true;
    error.value = null;
    const { data, error: e } = await supabase.from('…').select('…');
    if (e) {
        error.value = e.message;
        loading.value = false;
        return;
    }
    // transform data …
    loading.value = false;
}
```

ใน template:
```vue
<template>
    <div v-if="loading">Loading…</div>
    <div v-else-if="error" class="text-red-400">{{ error }}</div>
    <div v-else>
        <!-- content -->
    </div>
</template>
```
