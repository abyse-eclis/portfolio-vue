import type { Locale } from '@/types';
import type { SkillProficiency } from '@/types/pages';

interface TierMeta {
    label: Record<Locale, string>;
    /** Tailwind classes for the proficiency badge. */
    badge: string;
}

/** The 4 proficiency tiers, in ascending order. Mirrors 008_skill_proficiency.sql. */
const TIERS: Record<SkillProficiency, TierMeta> = {
    basic:        { label: { th: 'พื้นฐาน',   en: 'Basic' },        badge: 'bg-slate-500/15 text-slate-300 ring-slate-400/20' },
    intermediate: { label: { th: 'ปานกลาง',   en: 'Intermediate' }, badge: 'bg-sky-500/15 text-sky-300 ring-sky-400/20' },
    advanced:     { label: { th: 'ดี',        en: 'Advanced' },     badge: 'bg-violet-500/15 text-violet-300 ring-violet-400/20' },
    expert:       { label: { th: 'เชี่ยวชาญ', en: 'Expert' },        badge: 'bg-amber-500/15 text-amber-300 ring-amber-400/20' },
};

export function skillProficiencyLabel(p: SkillProficiency, locale: Locale): string {
    return (TIERS[p] ?? TIERS.basic).label[locale];
}

export function skillProficiencyBadge(p: SkillProficiency): string {
    return (TIERS[p] ?? TIERS.basic).badge;
}
