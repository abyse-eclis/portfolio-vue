# Admin — จัดการ Content

DevFolio ใช้ **Supabase Dashboard (Studio)** สำหรับจัดการ content แทน Filament เพราะโปรเจคนี้ไม่มี Laravel backend อีกต่อไป

---

## Table of Contents

- [1. Overview](#1-overview)
- [2. Supabase Studio — Basic CRUD](#2-supabase-studio--basic-crud)
- [3. Image Upload ไปยัง Storage](#3-image-upload-ไปยัง-storage)
- [4. Seed ข้อมูลแรก](#4-seed-ข้อมูลแรก)
- [5. Table Reference](#5-table-reference)
- [6. Custom Vue Admin (Optional)](#6-custom-vue-admin-optional)

---

## 1. Overview

| งาน | เครื่องมือ |
|-----|-----------|
| เพิ่ม/แก้/ลบ project, package, testimonial | Supabase Studio → Table Editor |
| อัพโหลด thumbnail, avatar | Supabase Studio → Storage |
| ดู contact submissions | Supabase Studio → Table Editor → `contact_submissions` |
| รัน SQL migration | Supabase Studio → SQL Editor |
| ตั้ง RLS policies | Supabase Studio → Authentication → Policies |

**URL**: `https://supabase.com/dashboard/project/<project-ref>`

---

## 2. Supabase Studio — Basic CRUD

### 2.1 Table Editor

1. เปิด Dashboard → เลือก project
2. ไปที่ **Table Editor** (sidebar ซ้าย)
3. เลือก table เช่น `projects`
4. คลิก **Insert row** หรือ double-click เพื่อแก้ไข

### 2.2 เพิ่ม Project ใหม่

ข้อมูลที่ต้องกรอก (bilingual):

| Column | ตัวอย่าง |
|--------|---------|
| `slug` | `my-awesome-project` |
| `title_th` | โปรเจคสุดเจ๋ง |
| `title_en` | My Awesome Project |
| `description_th` | คำอธิบายภาษาไทย |
| `description_en` | English description |
| `type` | `web` / `mobile` / `api` |
| `tech_stack` | `["Vue","TypeScript","Supabase"]` (JSON array) |
| `is_featured` | `true` / `false` |
| `show_in_freelance` | `true` / `false` |
| `thumbnail_path` | path จาก Storage (ดู § 3) |

### 2.3 Filter ข้อมูลใน Studio

ใช้ **Filter** บนหน้า Table Editor หรือ SQL Editor:

```sql
-- ดู project ที่ featured
SELECT * FROM projects WHERE is_featured = true ORDER BY sort_order;

-- ดู contact submissions ที่ยังไม่ได้อ่าน
SELECT * FROM contact_submissions WHERE is_read = false ORDER BY created_at DESC;
```

---

## 3. Image Upload ไปยัง Storage

### 3.1 ผ่าน Supabase Studio

1. ไปที่ **Storage** → เลือก bucket `devfolio-public`
2. Navigate ไปยัง folder ที่ต้องการ เช่น `projects/thumbnail/`
3. คลิก **Upload file** → เลือกรูป
4. copy path ที่ได้ (เช่น `projects/thumbnail/1-abc.webp`)
5. นำ path ไปใส่ใน `thumbnail_path` ของ project ใน Table Editor

### 3.2 Path Convention

```
devfolio-public/
├── profile/
│   └── avatar-{uuid}.webp
├── projects/
│   ├── thumbnail/
│   │   └── {project_id}-{uuid}.webp
│   ├── cover/
│   │   └── {project_id}-{uuid}.webp
│   └── gallery/
│       └── {project_id}/{uuid}.webp
├── skills/
│   └── icon-{skill_id}-{uuid}.svg
├── certificates/
│   └── {certificate_id}-{uuid}.webp
└── testimonials/
    └── avatar-{testimonial_id}-{uuid}.webp
```

### 3.3 ตรวจสอบ Public URL

```
https://<project>.supabase.co/storage/v1/object/public/devfolio-public/<path>
```

ทดสอบได้ใน browser โดยตรง — ถ้า 404 แสดงว่า path ผิดหรือ bucket ยังไม่ public

---

## 4. Seed ข้อมูลแรก

### 4.1 Profile (singleton)

รันใน SQL Editor (ใช้ service_role key — bypass RLS):

```sql
INSERT INTO profiles (
    name, email,
    headline_th, headline_en,
    bio_th, bio_en,
    freelance_tagline_th, freelance_tagline_en,
    freelance_bio_th, freelance_bio_en,
    years_experience
) VALUES (
    'Your Name', 'hello@yourdomain.com',
    'Full-Stack Developer', 'Full-Stack Developer',
    'แนะนำตัวสั้น ๆ ภาษาไทย', 'Short bio in English',
    'รับทำเว็บครบวงจร', 'Full-service web development',
    'คำโปรย freelance ภาษาไทย', 'Freelance bio in English',
    2
);
```

### 4.2 Skill Categories

```sql
INSERT INTO skill_categories (slug, name_th, name_en, icon, sort_order) VALUES
    ('frontend', 'ฝั่งหน้าบ้าน', 'Frontend', 'code-bracket', 1),
    ('backend', 'ฝั่งหลังบ้าน', 'Backend', 'server', 2),
    ('database', 'ฐานข้อมูล', 'Database', 'circle-stack', 3),
    ('devops', 'เครื่องมือและ DevOps', 'Tools & DevOps', 'wrench', 4);
```

### 4.3 Social Links

```sql
INSERT INTO social_links (profile_id, platform, url, icon, sort_order) VALUES
    (1, 'github', 'https://github.com/yourname', 'github', 1),
    (1, 'linkedin', 'https://linkedin.com/in/yourname', 'linkedin', 2);
```

---

## 5. Table Reference

### Tables ที่แก้บ่อย

| Table | ใช้แก้อะไร |
|-------|-----------|
| `profiles` | ข้อมูลส่วนตัว, bio, headline |
| `social_links` | ลิงก์ social media |
| `skill_categories` + `skills` | ทักษะและระดับ |
| `projects` | portfolio / freelance projects |
| `certificates` | ใบรับรอง |
| `packages` + `package_features` | แพ็คเกจในหน้า Freelance |
| `testimonials` | รีวิวจากลูกค้า |
| `process_steps` | ขั้นตอนการทำงาน |
| `contact_submissions` | ข้อความที่รับมา (ดูอย่างเดียว) |

### Bilingual Fields

ทุก content field มีคู่ `_th` / `_en` — ต้องกรอกทั้งสองภาษาเพื่อให้ frontend แสดงถูกต้อง

ถ้ากรอกแค่ภาษาเดียว: `tField()` จะ fallback ไป EN โดยอัตโนมัติ

---

## 6. Custom Vue Admin (Optional)

ถ้าต้องการ UI admin แบบมีหน้าต่างแยก มีตัวเลือก:

### ตัวเลือก A: Route `/admin` ใน SPA เดียวกัน

เพิ่ม route `/admin` ใน `router.ts` พร้อม auth guard:

```ts
// router.ts
import { supabase } from '@/lib/supabase';

router.beforeEach(async (to) => {
    if (to.path.startsWith('/admin')) {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return '/admin/login';
    }
});
```

ใช้ **Supabase Auth** สำหรับ admin login:

```ts
// admin login
await supabase.auth.signInWithPassword({ email, password });
// admin write ผ่าน authenticated role (ต้องตั้ง RLS policy)
```

### ตัวเลือก B: Directus / Payload CMS

Headless CMS ที่ connect กับ Supabase Postgres ได้

### ตัวเลือก C: คงใช้ Supabase Studio

สำหรับ personal portfolio ที่แก้ content ไม่บ่อย — Studio เพียงพอ
