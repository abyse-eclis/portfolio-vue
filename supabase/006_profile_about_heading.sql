-- 006_profile_about_heading.sql
-- Give the portfolio About section its own heading, separate from the
-- Hero `headline` (previously both rendered the same `headline` value).
-- Optional fields: the UI falls back to `headline` when these are empty.
-- Safe to re-run.

alter table profiles add column if not exists about_heading_th varchar(255);
alter table profiles add column if not exists about_heading_en varchar(255);
