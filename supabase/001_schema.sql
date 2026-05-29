-- 001_schema.sql
-- Postgres/Supabase translation of the original Laravel migrations
-- (d:\Projects\portfolio · database/migrations/2026_04_27_*).
-- Tables are created in FK dependency order. Safe to re-run.

-- ---------------------------------------------------------------------------
-- profiles  (single row — the site owner)
-- ---------------------------------------------------------------------------
create table if not exists profiles (
    id                    bigint generated always as identity primary key,
    name                  varchar(120) not null,
    email                 varchar(255),
    phone                 varchar(32),
    avatar_path           varchar(500),

    -- Portfolio mode
    headline_th           varchar(255) not null,
    headline_en           varchar(255) not null,
    bio_th                text not null,
    bio_en                text not null,

    -- Freelance mode
    freelance_tagline_th  varchar(255),
    freelance_tagline_en  varchar(255),
    freelance_bio_th      text,
    freelance_bio_en      text,

    years_experience      smallint not null default 0,
    resume_path           varchar(500),

    created_at            timestamptz default now(),
    updated_at            timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- skill_categories
-- ---------------------------------------------------------------------------
create table if not exists skill_categories (
    id          bigint generated always as identity primary key,
    slug        varchar(80) not null unique,
    name_th     varchar(120) not null,
    name_en     varchar(120) not null,
    icon        varchar(50),
    sort_order  integer not null default 0,
    created_at  timestamptz default now(),
    updated_at  timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- skills
-- ---------------------------------------------------------------------------
create table if not exists skills (
    id                 bigint generated always as identity primary key,
    skill_category_id  bigint not null references skill_categories (id) on delete cascade,
    name               varchar(80) not null,
    level              smallint not null default 80,
    icon_path          varchar(500),
    sort_order         integer not null default 0,
    created_at         timestamptz default now(),
    updated_at         timestamptz default now()
);
create index if not exists skills_category_sort_idx on skills (skill_category_id, sort_order);

-- ---------------------------------------------------------------------------
-- social_links
-- ---------------------------------------------------------------------------
create table if not exists social_links (
    id                 bigint generated always as identity primary key,
    profile_id         bigint not null references profiles (id) on delete cascade,
    platform           varchar(50) not null,
    url                varchar(500) not null,
    icon               varchar(50) not null,
    sort_order         integer not null default 0,
    show_in_portfolio  boolean not null default true,
    show_in_freelance  boolean not null default true,
    created_at         timestamptz default now(),
    updated_at         timestamptz default now()
);
create index if not exists social_links_profile_sort_idx on social_links (profile_id, sort_order);

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table if not exists projects (
    id                 bigint generated always as identity primary key,
    slug               varchar(120) not null unique,
    title_th           varchar(255) not null,
    title_en           varchar(255) not null,
    description_th     text not null,
    description_en     text not null,
    role_th            text,
    role_en            text,
    type               varchar(50) not null default 'web',
    thumbnail_path     varchar(500),
    cover_path         varchar(500),
    url                varchar(500),
    repo_url           varchar(500),
    tech_stack         jsonb not null default '[]'::jsonb,
    gallery            jsonb not null default '[]'::jsonb,
    is_featured        boolean not null default false,
    show_in_freelance  boolean not null default false,
    sort_order         integer not null default 0,
    completed_at       date,
    created_at         timestamptz default now(),
    updated_at         timestamptz default now()
);
create index if not exists projects_type_idx       on projects (type);
create index if not exists projects_featured_idx   on projects (is_featured) where is_featured = true;
create index if not exists projects_freelance_idx  on projects (show_in_freelance) where show_in_freelance = true;
create index if not exists projects_tech_stack_gin on projects using gin (tech_stack);

-- ---------------------------------------------------------------------------
-- certificates
-- ---------------------------------------------------------------------------
create table if not exists certificates (
    id              bigint generated always as identity primary key,
    title_th        varchar(255) not null,
    title_en        varchar(255) not null,
    issuer          varchar(180) not null,
    image_path      varchar(500),
    credential_url  varchar(500),
    issued_at       date not null,
    expires_at      date,
    sort_order      integer not null default 0,
    created_at      timestamptz default now(),
    updated_at      timestamptz default now()
);
create index if not exists certificates_issued_at_idx on certificates (issued_at);

-- ---------------------------------------------------------------------------
-- packages
-- ---------------------------------------------------------------------------
create table if not exists packages (
    id              bigint generated always as identity primary key,
    slug            varchar(80) not null unique,
    name_th         varchar(120) not null,
    name_en         varchar(120) not null,
    tagline_th      varchar(255),
    tagline_en      varchar(255),
    description_th  text,
    description_en  text,
    price           numeric(12,2) not null default 0,
    currency        varchar(8) not null default 'THB',
    is_recommended  boolean not null default false,
    sort_order      integer not null default 0,
    created_at      timestamptz default now(),
    updated_at      timestamptz default now()
);
create index if not exists packages_recommended_idx on packages (is_recommended) where is_recommended = true;

-- ---------------------------------------------------------------------------
-- package_features
-- ---------------------------------------------------------------------------
create table if not exists package_features (
    id          bigint generated always as identity primary key,
    package_id  bigint not null references packages (id) on delete cascade,
    feature_th  varchar(255) not null,
    feature_en  varchar(255) not null,
    included    boolean not null default true,
    sort_order  integer not null default 0,
    created_at  timestamptz default now(),
    updated_at  timestamptz default now()
);
create index if not exists package_features_package_sort_idx on package_features (package_id, sort_order);

-- ---------------------------------------------------------------------------
-- process_steps
-- ---------------------------------------------------------------------------
create table if not exists process_steps (
    id              bigint generated always as identity primary key,
    title_th        varchar(180) not null,
    title_en        varchar(180) not null,
    description_th  text not null,
    description_en  text not null,
    icon            varchar(50),
    step_number     smallint not null unique,
    created_at      timestamptz default now(),
    updated_at      timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- testimonials
-- ---------------------------------------------------------------------------
create table if not exists testimonials (
    id               bigint generated always as identity primary key,
    project_id       bigint references projects (id) on delete set null,
    client_name      varchar(120) not null,
    client_role_th   varchar(180),
    client_role_en   varchar(180),
    client_company   varchar(180),
    avatar_path      varchar(500),
    content_th       text not null,
    content_en       text not null,
    rating           smallint not null default 5,
    is_published     boolean not null default true,
    sort_order       integer not null default 0,
    created_at       timestamptz default now(),
    updated_at       timestamptz default now()
);
create index if not exists testimonials_published_sort_idx on testimonials (is_published, sort_order);

-- ---------------------------------------------------------------------------
-- contact_submissions  (public INSERT target — never publicly readable)
-- ---------------------------------------------------------------------------
create table if not exists contact_submissions (
    id          bigint generated always as identity primary key,
    mode        varchar(20) not null,   -- 'portfolio' | 'freelance'
    name        varchar(120) not null,
    email       varchar(255) not null,
    phone       varchar(32),
    subject     varchar(255),
    message     text not null,
    metadata    jsonb not null default '{}'::jsonb,
    is_read     boolean not null default false,
    created_at  timestamptz not null default now()
);
create index if not exists contact_submissions_mode_created_idx on contact_submissions (mode, created_at);
create index if not exists contact_submissions_unread_idx on contact_submissions (is_read) where is_read = false;
