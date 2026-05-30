-- 005_profile_name_i18n.sql
-- Split the single `profiles.name` column into a translatable
-- `name_th` / `name_en` pair, matching every other localized field
-- (headline, bio, ...). Safe to re-run.

-- ---------------------------------------------------------------------------
-- 1. Add the new translatable columns.
-- ---------------------------------------------------------------------------
alter table profiles add column if not exists name_th varchar(120);
alter table profiles add column if not exists name_en varchar(120);

-- ---------------------------------------------------------------------------
-- 2. Backfill from the legacy single-language column where it still exists.
-- ---------------------------------------------------------------------------
do $$
begin
    if exists (
        select 1 from information_schema.columns
        where table_name = 'profiles' and column_name = 'name'
    ) then
        update profiles set name_th = coalesce(name_th, name) where name is not null;
        update profiles set name_en = coalesce(name_en, name) where name is not null;
    end if;
end $$;

-- ---------------------------------------------------------------------------
-- 3. Both names are required going forward (mirrors headline_th / headline_en).
-- ---------------------------------------------------------------------------
alter table profiles alter column name_th set not null;
alter table profiles alter column name_en set not null;

-- ---------------------------------------------------------------------------
-- 4. Drop the legacy single-language column.
-- ---------------------------------------------------------------------------
alter table profiles drop column if exists name;
