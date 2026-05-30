# Frontend

เอกสารนี้อธิบายโครงสร้างฝั่ง frontend ของ DevFolio — Vue 3 + Vite + TypeScript + Tailwind v4 พร้อมระบบ composables สำหรับดึงข้อมูลจาก Supabase, i18n, และ animation (GSAP + Three.js)

---

## Table of Contents

- [1. Tech Overview](#1-tech-overview)
- [2. Directory Structure](#2-directory-structure)
- [3. App Bootstrap](#3-app-bootstrap)
- [4. Component Tree](#4-component-tree)
- [5. Composables](#5-composables)
- [6. i18n Setup](#6-i18n-setup)
- [7. Animation Architecture](#7-animation-architecture)
- [8. Tailwind v4 Theme](#8-tailwind-v4-theme)
- [9. Types](#9-types)
- [10. Performance Guidelines](#10-performance-guidelines)

---

## 1. Tech Overview

| Item | Version | หมายเหตุ |
|------|---------|---------|
| Vue | 3.4+ | Composition API, `<script setup>` |
| TypeScript | 5.4+ | strict mode |
| Vite | 5+ | `@vitejs/plugin-vue` |
| vue-router | 4.x | History mode, lazy-loaded routes |
| Supabase JS | 2.x | `@supabase/supabase-js` — anon key + RLS |
| Tailwind CSS | 4.0+ | CSS-first config, `@import "tailwindcss"` |
| vue-i18n | 9.x | Composition API mode |
| GSAP | 3.12+ | `gsap/ScrollTrigger` |
| Three.js | r160+ | WebGL background |

> **ไม่มี** `@inertiajs/vue3` หรือ `laravel-vite-plugin` อีกต่อไป — โปรเจคนี้เป็น standalone Vue SPA

---

## 2. Directory Structure

```
src/
├── main.ts                     # App entrypoint
├── App.vue                     # Root component (router-view)
├── router.ts                   # vue-router routes
├── vite-env.d.ts
├── css/
│   └── app.css                 # Tailwind v4 + custom theme
├── lib/
│   ├── supabase.ts             # Supabase client (anon key)
│   ├── translate.ts            # tField() bilingual helper
│   └── mappers.ts              # Raw row → typed view model
├── types/
│   ├── index.ts                # Locale, SiteMode, SharedProps
│   └── pages.ts                # Per-page prop types (PortfolioHomeProps, …)
├── i18n/
│   ├── index.ts                # createI18n instance
│   ├── th.ts                   # Static TH strings (nav, buttons, errors)
│   └── en.ts
├── Layouts/
│   ├── PortfolioLayout.vue
│   └── FreelanceLayout.vue
├── Pages/
│   ├── Portfolio/
│   │   ├── Home.vue
│   │   └── ProjectDetail.vue
│   ├── Freelance/
│   │   └── Home.vue
│   └── Contact/
│       └── ThankYou.vue
├── Components/
│   ├── Shared/
│   │   ├── Navbar.vue
│   │   ├── Footer.vue
│   │   ├── LocaleToggle.vue
│   │   ├── Button.vue
│   │   ├── Icon.vue
│   │   ├── SectionHeading.vue
│   │   ├── LazyImage.vue
│   │   ├── ContactForm.vue
│   │   └── Toast.vue
│   ├── Portfolio/
│   │   ├── Hero.vue
│   │   ├── About.vue
│   │   ├── SkillGrid.vue / SkillCategoryBlock.vue / SkillBar.vue
│   │   ├── ProjectGrid.vue / ProjectCard.vue / ProjectFilter.vue
│   │   ├── CertificateGrid.vue / CertificateCard.vue
│   │   └── ContactSection.vue
│   ├── Freelance/
│   │   ├── Hero.vue / About.vue
│   │   ├── PackageGrid.vue / PackageCard.vue
│   │   ├── SelectedProjects.vue
│   │   ├── TestimonialCarousel.vue
│   │   ├── ProcessTimeline.vue
│   │   └── ContactSection.vue
│   └── Three/
│       ├── SpaceBackground.vue
│       └── StarField.vue
└── Composables/
    ├── useLocale.ts            # locale ref + switchLocale()
    ├── useSiteMode.ts          # portfolio | freelance (จาก route name)
    ├── useProfile.ts           # fetch profiles table
    ├── useSkills.ts            # fetch skill_categories + skills
    ├── useProjects.ts          # fetch projects (portfolio)
    ├── useFreelanceProjects.ts # fetch projects (freelance — show_in_freelance)
    ├── useProject.ts           # fetch single project + gallery
    ├── useCertificates.ts      # fetch certificates
    ├── usePackages.ts          # fetch packages + features
    ├── useTestimonials.ts      # fetch testimonials
    ├── useProcessSteps.ts      # fetch process_steps
    ├── useSharedProfile.ts     # profile summary สำหรับ Navbar/Footer
    ├── useContact.ts           # submitContact() (insert หรือ Edge Function)
    ├── useFlash.ts             # toast message state
    ├── useSupabaseImage.ts     # getPublicUrl(), transform(), srcset()
    ├── useScrollAnim.ts        # GSAP ScrollTrigger wrapper
    ├── useGsapAnim.ts          # GSAP animation utilities
    ├── useReducedMotion.ts     # prefers-reduced-motion
    ├── useSeo.ts               # document.title + meta tags
    └── useFormatPrice.ts       # Intl.NumberFormat('th-TH')
```

---

## 3. App Bootstrap

### 3.1 `src/main.ts`

```ts
import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import './css/app.css';

createApp(App).use(router).mount('#app');
```

> i18n ถูก inject ใน `App.vue` ผ่าน `app.use(i18n)` — ดู `src/App.vue`

### 3.2 `src/router.ts`

```ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/',                  name: 'portfolio.home',    component: () => import('@/Pages/Portfolio/Home.vue') },
    { path: '/projects/:slug',    name: 'portfolio.project', component: () => import('@/Pages/Portfolio/ProjectDetail.vue') },
    { path: '/freelance',         name: 'freelance.home',    component: () => import('@/Pages/Freelance/Home.vue') },
    { path: '/contact/thank-you', name: 'contact.thankYou',  component: () => import('@/Pages/Contact/ThankYou.vue') },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => ({ top: 0 }),
});
```

### 3.3 `src/App.vue`

```vue
<script setup lang="ts">
import { createI18n } from 'vue-i18n';
import th from '@/i18n/th';
import en from '@/i18n/en';
import { locale } from '@/Composables/useLocale';

const i18n = createI18n({ legacy: false, locale: locale.value, fallbackLocale: 'en', messages: { th, en } });
</script>

<template>
    <router-view />
</template>
```

### 3.4 `vite.config.ts`

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
    plugins: [vue(), tailwindcss()],
    resolve: {
        alias: { '@': path.resolve(__dirname, 'src') },
    },
    build: {
        target: 'es2022',
        rollupOptions: {
            output: {
                manualChunks: {
                    three: ['three'],
                    gsap: ['gsap', 'gsap/ScrollTrigger'],
                    supabase: ['@supabase/supabase-js'],
                },
            },
        },
    },
});
```

---

## 4. Component Tree

### 4.1 Portfolio Mode

```
PortfolioLayout
├── SpaceBackground (Three.js StarField)
├── Navbar (variant="portfolio")
│   ├── LocaleToggle
│   └── router-link ไป /freelance (ModeSwitcher)
├── <router-view>
│   └── Portfolio/Home.vue
│       ├── Hero
│       ├── About
│       ├── SkillGrid
│       │   └── SkillCategoryBlock × N → SkillBar × N
│       ├── ProjectGrid
│       │   ├── ProjectFilter (tech chips)
│       │   └── ProjectCard × N (LazyImage)
│       ├── CertificateGrid → CertificateCard × N
│       └── ContactSection → ContactForm + SocialIconRow
└── Footer
```

### 4.2 Freelance Mode

```
FreelanceLayout
├── SpaceBackground
├── Navbar (variant="freelance")
├── <router-view>
│   └── Freelance/Home.vue
│       ├── Hero (tagline + CTA)
│       ├── About (stats)
│       ├── PackageGrid → PackageCard × N
│       ├── SelectedProjects → ProjectCard × N
│       ├── TestimonialCarousel
│       ├── ProcessTimeline
│       └── ContactSection
└── Footer
```

### 4.3 Page ใช้ Layout ผ่าน `<component>`

ต่างจาก Inertia (`defineOptions({ layout })`) — ใน Vue SPA layout ถูก wrap ที่ route level หรือใช้ `<component :is>` ใน page:

```vue
<!-- Pages/Portfolio/Home.vue -->
<script setup lang="ts">
import PortfolioLayout from '@/Layouts/PortfolioLayout.vue';
import { useProfile } from '@/Composables/useProfile';
import { useSkills } from '@/Composables/useSkills';
import { useProjects } from '@/Composables/useProjects';
import { useCertificates } from '@/Composables/useCertificates';

const { portfolio: profile, loading: profileLoading } = useProfile();
const { skillBlocks, loading: skillsLoading } = useSkills();
const { projects, loading: projectsLoading } = useProjects();
const { certificates } = useCertificates();
</script>

<template>
    <PortfolioLayout>
        <Hero :profile="profile" />
        <About :profile="profile" />
        <SkillGrid :skill-blocks="skillBlocks" />
        <ProjectGrid :projects="projects" />
        <CertificateGrid :certificates="certificates" />
        <ContactSection />
    </PortfolioLayout>
</template>
```

---

## 5. Composables

### 5.1 Data Composables (Supabase)

ทุก data composable มี pattern เดียวกัน:

```ts
export function useXxx() {
    const data = ref<Xxx | null>(null);
    const loading = ref(true);
    const error = ref<string | null>(null);

    async function load() {
        loading.value = true;
        const { data: rows, error: e } = await supabase.from('xxx').select('…');
        if (e) error.value = e.message;
        data.value = rows ? mapXxx(rows, locale.value) : null;
        loading.value = false;
    }

    onMounted(load);
    watch(locale, load);  // refetch เมื่อภาษาเปลี่ยน

    return { data, loading, error };
}
```

| Composable | ดึงจาก table | หมายเหตุ |
|-----------|------------|---------|
| `useProfile` | `profiles` | คืนทั้ง `portfolio` และ `freelance` shape |
| `useSharedProfile` | `profiles` + `social_links` | สำหรับ Navbar/Footer |
| `useSkills` | `skill_categories` + `skills` | nested join |
| `useProjects` | `projects` | portfolio — ทุก project |
| `useFreelanceProjects` | `projects` | `show_in_freelance=true` |
| `useProject` | `projects` | single project by slug |
| `useCertificates` | `certificates` | sort by issued_at DESC |
| `usePackages` | `packages` + `package_features` | nested |
| `useTestimonials` | `testimonials` | `is_published=true` |
| `useProcessSteps` | `process_steps` | sort by step_number |

### 5.2 `useLocale`

```ts
// module-level singleton — ทุก component share locale เดียวกัน
const locale = ref<Locale>(initialLocale()); // อ่านจาก cookie

export function useLocale() {
    function switchLocale(next: Locale) {
        document.cookie = `locale=${next};path=/;expires=…;SameSite=Lax`;
        locale.value = next;
    }
    return { locale, switchLocale };
}
export { locale };
```

### 5.3 `useSiteMode`

```ts
import { useRoute } from 'vue-router';

export function useSiteMode() {
    const route = useRoute();
    const mode = computed(() =>
        String(route.name ?? '').startsWith('freelance') ? 'freelance' : 'portfolio'
    );
    return { mode, isPortfolio: computed(() => mode.value === 'portfolio'), isFreelance: computed(() => mode.value === 'freelance') };
}
```

### 5.4 `useContact`

```ts
// src/Composables/useContact.ts
export async function submitContact(payload: ContactPayload) {
    // ตัวเลือก 1: direct insert (ไม่มี email)
    const { error } = await supabase.from('contact_submissions').insert({ … });

    // ตัวเลือก 2 (production): ผ่าน Edge Function
    // const res = await fetch(`${SUPABASE_URL}/functions/v1/submit-contact`, { method: 'POST', body: JSON.stringify(payload) });

    return { error: error ? error.message : null };
}
```

### 5.5 `useSupabaseImage`

```ts
const BASE = import.meta.env.VITE_SUPABASE_URL;
const BUCKET = import.meta.env.VITE_SUPABASE_PUBLIC_BUCKET;

export function useSupabaseImage() {
    function getPublicUrl(path: string | null): string | null {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `${BASE}/storage/v1/object/public/${BUCKET}/${path}`;
    }

    function transform(path: string | null, opts: TransformOptions = {}): string | null {
        // ใช้ Supabase Image Transform API
        const params = new URLSearchParams();
        if (opts.width) params.set('width', String(opts.width));
        if (opts.height) params.set('height', String(opts.height));
        if (opts.resize) params.set('resize', opts.resize);
        const qs = params.toString();
        if (!path) return null;
        return `${BASE}/storage/v1/render/image/public/${BUCKET}/${path}${qs ? '?' + qs : ''}`;
    }

    return { getPublicUrl, transform };
}
```

### 5.6 `useScrollAnim`

Wrapper บาง ๆ รอบ GSAP ScrollTrigger — ใช้งานเหมือนเดิม ดูตัวอย่างใน `src/Composables/useScrollAnim.ts`

---

## 6. i18n Setup

### 6.1 `src/i18n/index.ts`

```ts
import { createI18n } from 'vue-i18n';
import th from './th';
import en from './en';
import { locale } from '@/Composables/useLocale';

export const i18n = createI18n({
    legacy: false,
    locale: locale.value,
    fallbackLocale: 'en',
    messages: { th, en },
});

export type MessageSchema = typeof th;
```

### 6.2 สองชั้นของข้อความ

| ชั้น | แหล่งที่มา | ตัวอย่าง |
|-----|-----------|---------|
| **DB content** (dynamic) | `tField(row, 'title', locale)` | `project.title`, `profile.headline` |
| **UI label** (static) | `$t('nav.projects')` | nav links, button text, validation errors |

ข้อดี: bundle ไม่ต้องพก content จริง / admin แก้ content ได้ทันทีไม่ต้อง rebuild

---

## 7. Animation Architecture

เหมือน architecture เดิม — ดูรายละเอียดได้ที่ `src/Composables/useScrollAnim.ts` และ `src/Composables/useGsapAnim.ts`

### 7.1 Z-layer

```
z-50  — Navbar, Toast
z-40  — Dropdown
z-10  — Page main content
z-0   — SpaceBackground (Three.js canvas)
```

### 7.2 GSAP Conventions

| Use case | Pattern |
|---------|---------|
| Scroll enter | `useScrollAnim()` composable |
| Hero intro | `gsap.timeline()` ใน `onMounted` |
| Hover | Tailwind `transition` + `@mouseenter` GSAP |

### 7.3 Three.js Performance Guard

- `powerPreference: 'low-power'`
- Pause render loop เมื่อ `document.hidden`
- `useReducedMotion()` — ถ้า OS ตั้ง reduce motion → skip animation

---

## 8. Tailwind v4 Theme

```css
/* src/css/app.css */
@import "tailwindcss";

@theme {
    --color-space-950: #05050f;
    --color-nebula-violet: #8b5cf6;
    --color-nebula-pink: #ec4899;
    --color-nebula-cyan: #22d3ee;
    --font-sans: 'Inter', 'Noto Sans Thai', system-ui, sans-serif;
    --font-display: 'Space Grotesk', 'Inter', sans-serif;
}
```

---

## 9. Types

### 9.1 `src/types/index.ts`

```ts
export type Locale = 'th' | 'en';
export type SiteMode = 'portfolio' | 'freelance';
```

### 9.2 `src/types/pages.ts`

ดู file จริงที่ `src/types/pages.ts` — มี interfaces:
- `ProfilePortfolio`, `ProfileFreelance`
- `SkillCategoryBlock`, `SkillItem`
- `ProjectCardData`, `ProjectDetailData`
- `CertificateCardData`
- `TestimonialData`
- `PackageData`, `PackageFeature`
- `ProcessStepData`
- `PortfolioHomeProps`, `FreelanceHomeProps`

---

## 10. Performance Guidelines

| Rule | How |
|------|-----|
| Images ≥ 100KB | `useSupabaseImage().transform()` |
| Lazy load images | `LazyImage.vue` (IntersectionObserver) |
| Heavy components | `defineAsyncComponent()` |
| Respect reduced motion | `useReducedMotion()` |
| Three.js chunk | Vite `manualChunks: { three: ['three'] }` |
| Supabase chunk | `manualChunks: { supabase: ['@supabase/supabase-js'] }` |
| Route code split | vue-router lazy `() => import(…)` |
