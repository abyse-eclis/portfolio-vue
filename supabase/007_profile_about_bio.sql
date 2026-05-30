-- 007_profile_about_bio.sql
-- Give the portfolio About section its own bio, separate from the Hero
-- `bio` (previously both rendered the same `bio` value).
-- Optional fields: the UI falls back to the Hero `bio` when these are empty.
-- Safe to re-run.

alter table profiles add column if not exists about_bio_th text;
alter table profiles add column if not exists about_bio_en text;
