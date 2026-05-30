# Database

เอกสารนี้อธิบายโครงสร้างฐานข้อมูล PostgreSQL (Supabase) ของ DevFolio — ครอบคลุม ERD, schema ทุกตาราง, Storage bucket และ RLS policy

> **การใช้งาน**: ทุก table ถูกอ่านโดย Vue SPA ผ่าน anon key โดยตรง — ต้องเปิด RLS **ทุกตาราง** ก่อน go live

---

## Table of Contents

- [1. Overview](#1-overview)
- [2. ERD Diagram](#2-erd-diagram)
- [3. Naming Convention](#3-naming-convention)
- [4. SQL Schema](#4-sql-schema)
- [5. Supabase Storage Buckets](#5-supabase-storage-buckets)
- [6. RLS Policy Strategy](#6-rls-policy-strategy)
- [7. Seed / Initial Data](#7-seed--initial-data)
- [8. Indexing & Performance](#8-indexing--performance)

---

## 1. Overview

- **Engine**: PostgreSQL 15+ (managed by Supabase)
- **Migration Tool**: Supabase SQL Editor หรือ `supabase/001_schema.sql` — **ไม่ใช้ Laravel migrations**
- **Client**: `@supabase/supabase-js` (anon key + RLS) บน browser
- **Schema**: ใช้ schema `public` — `auth`, `storage` เป็นของ Supabase ห้ามแตะ
- **Bilingual**: ทุก text field ที่แสดงต่อผู้ใช้มี column `*_th` + `*_en` คู่กัน

### 1.1 วิธี Apply SQL

```bash
# รันผ่าน Supabase CLI
supabase db push

# หรือ copy-paste ใน Dashboard → SQL Editor
```

ไฟล์ SQL อยู่ที่ `supabase/` ตามลำดับ:
1. `001_schema.sql` — Tables + indexes
2. `002_rls.sql` — RLS policies
3. `003_storage.sql` — Storage buckets

---

## 2. ERD Diagram

```mermaid
erDiagram
    profiles ||--o{ social_links : has
    skill_categories ||--o{ skills : contains
    projects ||--o{ testimonials : "may link to"
    packages ||--o{ package_features : has

    profiles {
        bigint id PK
        string name_th
        string name_en
        string email
        string avatar_path
        text headline_th
        text headline_en
        text bio_th
        text bio_en
        text freelance_tagline_th
        text freelance_tagline_en
        text freelance_bio_th
        text freelance_bio_en
        integer years_experience
        string resume_path
        timestamps
    }

    social_links {
        bigint id PK
        bigint profile_id FK
        string platform
        string url
        string icon
        integer sort_order
        boolean show_in_portfolio
        boolean show_in_freelance
    }

    skill_categories {
        bigint id PK
        string slug UK
        string name_th
        string name_en
        string icon
        integer sort_order
    }

    skills {
        bigint id PK
        bigint skill_category_id FK
        string name
        smallint level
        string icon_path
        integer sort_order
    }

    projects {
        bigint id PK
        string slug UK
        string title_th
        string title_en
        text description_th
        text description_en
        text role_th
        text role_en
        string type
        string thumbnail_path
        string cover_path
        string url
        string repo_url
        jsonb tech_stack
        jsonb gallery
        boolean is_featured
        boolean show_in_freelance
        integer sort_order
        date completed_at
        timestamps
    }

    certificates {
        bigint id PK
        string title_th
        string title_en
        string issuer
        string image_path
        string credential_url
        date issued_at
        date expires_at
        integer sort_order
        timestamps
    }

    packages {
        bigint id PK
        string slug UK
        string name_th
        string name_en
        text tagline_th
        text tagline_en
        text description_th
        text description_en
        decimal price
        string currency
        boolean is_recommended
        integer sort_order
        timestamps
    }

    package_features {
        bigint id PK
        bigint package_id FK
        string feature_th
        string feature_en
        boolean included
        integer sort_order
    }

    testimonials {
        bigint id PK
        bigint project_id FK
        string client_name
        string client_role_th
        string client_role_en
        string client_company
        string avatar_path
        text content_th
        text content_en
        smallint rating
        boolean is_published
        integer sort_order
        timestamps
    }

    process_steps {
        bigint id PK
        string title_th
        string title_en
        text description_th
        text description_en
        string icon
        integer step_number
        timestamps
    }

    contact_submissions {
        bigint id PK
        string mode
        string name
        string email
        string phone
        string subject
        text message
        jsonb metadata
        boolean is_read
        timestamp created_at
    }
```

---

## 3. Naming Convention

| Rule | ตัวอย่าง |
|------|---------|
| Table = plural snake_case | `projects`, `contact_submissions` |
| PK = `id` (bigint) | `projects.id` |
| FK = `<table_singular>_id` | `testimonials.project_id` |
| Bilingual = `<field>_th` + `<field>_en` | `title_th`, `title_en` |
| Boolean = `is_*` หรือ `show_*` | `is_featured`, `show_in_freelance` |
| Storage path = `<field>_path` | `thumbnail_path`, `avatar_path` |
| External URL = `<field>_url` | `repo_url`, `credential_url` |
| JSON list = `jsonb` | `tech_stack`, `gallery` |

---

## 4. SQL Schema

ไฟล์เต็มอยู่ที่ `supabase/001_schema.sql` — ด้านล่างคือ schema สำคัญ:

### 4.1 `profiles`

```sql
CREATE TABLE profiles (
    id BIGSERIAL PRIMARY KEY,
    name_th VARCHAR(120) NOT NULL,
    name_en VARCHAR(120) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(32),
    avatar_path VARCHAR(500),
    headline_th VARCHAR(255) NOT NULL DEFAULT '',
    headline_en VARCHAR(255) NOT NULL DEFAULT '',
    bio_th TEXT NOT NULL DEFAULT '',
    bio_en TEXT NOT NULL DEFAULT '',
    freelance_tagline_th VARCHAR(255),
    freelance_tagline_en VARCHAR(255),
    freelance_bio_th TEXT,
    freelance_bio_en TEXT,
    years_experience SMALLINT NOT NULL DEFAULT 0,
    resume_path VARCHAR(500),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE profiles IS 'ข้อมูลเจ้าของเว็บ — มี 1 record เท่านั้น (singleton)';
```

### 4.2 `projects`

```sql
CREATE TABLE projects (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(120) NOT NULL UNIQUE,
    title_th VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    description_th TEXT NOT NULL,
    description_en TEXT NOT NULL,
    role_th TEXT,
    role_en TEXT,
    type VARCHAR(50) NOT NULL DEFAULT 'web',
    thumbnail_path VARCHAR(500),
    cover_path VARCHAR(500),
    url VARCHAR(500),
    repo_url VARCHAR(500),
    tech_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
    gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    show_in_freelance BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    completed_at DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX projects_featured_idx ON projects(is_featured) WHERE is_featured = TRUE;
CREATE INDEX projects_freelance_idx ON projects(show_in_freelance) WHERE show_in_freelance = TRUE;
CREATE INDEX projects_tech_stack_gin ON projects USING GIN (tech_stack);
```

**gallery column format:**
```json
[
    { "path": "projects/gallery/1/abc.webp", "alt_th": "คำอธิบายรูปภาษาไทย", "alt_en": "Image description" }
]
```

### 4.3 `contact_submissions`

```sql
CREATE TABLE contact_submissions (
    id BIGSERIAL PRIMARY KEY,
    mode VARCHAR(20) NOT NULL CHECK (mode IN ('portfolio', 'freelance')),
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(32),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON COLUMN contact_submissions.metadata IS 'locale, package_slug, user_agent, referrer';
```

> ดู schema ครบทุกตารางใน `supabase/001_schema.sql`

---

## 5. Supabase Storage Buckets

### 5.1 Bucket Layout

| Bucket | Access | Purpose |
|--------|--------|---------|
| `devfolio-public` | Public | รูปแสดงบนเว็บ (thumbnail, avatar, certificate) |
| `devfolio-private` | Private | Resume PDF, เอกสารแนบ |

### 5.2 สร้าง Buckets (`supabase/003_storage.sql`)

```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('devfolio-public', 'devfolio-public', true)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

INSERT INTO storage.buckets (id, name, public)
VALUES ('devfolio-private', 'devfolio-private', false)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;
```

### 5.3 Storage Policies

```sql
-- ให้ public อ่านไฟล์ใน bucket public ได้
CREATE POLICY "Public read for public bucket"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'devfolio-public');
```

---

## 6. RLS Policy Strategy

### 6.1 หลักการ

Vue SPA ใช้ **anon key** ดึงข้อมูลโดยตรง → RLS ต้องเปิดทุก table และเขียน policy อนุญาต `SELECT` สำหรับ `anon`

- **Public tables** (profiles, projects, skills, …): anon อ่านได้ แต่ write ไม่ได้
- **contact_submissions**: anon เขียนได้ (insert-only) แต่อ่านไม่ได้
- ไม่มี `users` table (ไม่มี Laravel auth) — admin ใช้ Supabase Auth แทน

### 6.2 Enable RLS (รันใน SQL Editor)

```sql
ALTER TABLE profiles             ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links         ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories     ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills               ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects             ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates         ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages             ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_features     ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials         ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps        ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions  ENABLE ROW LEVEL SECURITY;
```

### 6.3 SELECT Policies (Public-Readable Tables)

```sql
CREATE POLICY "anon read profiles"          ON profiles          FOR SELECT TO anon USING (true);
CREATE POLICY "anon read social_links"      ON social_links      FOR SELECT TO anon USING (true);
CREATE POLICY "anon read skill_categories"  ON skill_categories  FOR SELECT TO anon USING (true);
CREATE POLICY "anon read skills"            ON skills            FOR SELECT TO anon USING (true);
CREATE POLICY "anon read projects"          ON projects          FOR SELECT TO anon USING (true);
CREATE POLICY "anon read certificates"      ON certificates      FOR SELECT TO anon USING (true);
CREATE POLICY "anon read packages"          ON packages          FOR SELECT TO anon USING (true);
CREATE POLICY "anon read package_features"  ON package_features  FOR SELECT TO anon USING (true);
CREATE POLICY "anon read process_steps"     ON process_steps     FOR SELECT TO anon USING (true);

-- testimonials: อ่านเฉพาะที่ published
CREATE POLICY "anon read published testimonials"
ON testimonials FOR SELECT TO anon USING (is_published = TRUE);
```

### 6.4 Contact Submissions — Insert Only

```sql
-- anon เขียนได้ (ผ่าน supabase.insert หรือ Edge Function)
CREATE POLICY "anon insert contact"
ON contact_submissions FOR INSERT TO anon WITH CHECK (true);

-- anon อ่านไม่ได้ (ไม่ต้องสร้าง SELECT policy)
```

### 6.5 Verify RLS

ทดสอบด้วย anon key:

```sql
-- ควรได้ data
SELECT * FROM projects;

-- ควร error: permission denied
INSERT INTO projects (slug, title_th, title_en, description_th, description_en)
VALUES ('test', 't', 't', 'd', 'd');

-- ควร error: permission denied (anon อ่าน contact_submissions ไม่ได้)
SELECT * FROM contact_submissions;
```

---

## 7. Seed / Initial Data

ดู [admin.md § 4](admin.md#4-seed-ข้อมูลแรก) สำหรับ seed SQL ที่ใช้บ่อย

---

## 8. Indexing & Performance

### 8.1 Query Patterns หลัก

| Query | Index |
|-------|-------|
| `projects WHERE is_featured=true` | partial index |
| `projects WHERE show_in_freelance=true` | partial index |
| `projects WHERE tech_stack @> '["Vue"]'` | GIN index |
| `testimonials WHERE is_published=true` | composite index |

### 8.2 Full-Text Search (Optional)

ถ้าต้องการ search projects ผ่าน Supabase:

```sql
ALTER TABLE projects
  ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    to_tsvector('simple',
      coalesce(title_th,'') || ' ' ||
      coalesce(title_en,'') || ' ' ||
      coalesce(description_th,'') || ' ' ||
      coalesce(description_en,''))
  ) STORED;

CREATE INDEX projects_search_idx ON projects USING GIN (search_vector);
```

Query ผ่าน Supabase JS:
```ts
const { data } = await supabase
    .from('projects')
    .select('…')
    .textSearch('search_vector', 'laravel');
```
