-- 008_skill_proficiency.sql
-- Replace the numeric skill `level` (0–100) with a 4-tier proficiency label.
-- Tiers: basic / intermediate / advanced / expert (rendered as
-- พื้นฐาน / ปานกลาง / ดี / เชี่ยวชาญ in the UI).
-- Safe to re-run.

-- 1. Add the new column (nullable first so we can backfill).
alter table skills
    add column if not exists proficiency varchar(20);

-- 2. Backfill from the old numeric level, if that column still exists.
do $$
begin
    if exists (
        select 1 from information_schema.columns
        where table_name = 'skills' and column_name = 'level'
    ) then
        update skills set proficiency = case
            when level >= 86 then 'expert'
            when level >= 66 then 'advanced'
            when level >= 41 then 'intermediate'
            else 'basic'
        end
        where proficiency is null;
    end if;
end $$;

-- 3. Default any remaining rows, then lock the column down.
update skills set proficiency = 'intermediate' where proficiency is null;

alter table skills
    alter column proficiency set default 'intermediate',
    alter column proficiency set not null;

alter table skills
    drop constraint if exists skills_proficiency_check;
alter table skills
    add constraint skills_proficiency_check
    check (proficiency in ('basic', 'intermediate', 'advanced', 'expert'));

-- 4. Drop the obsolete numeric column.
alter table skills drop column if exists level;
