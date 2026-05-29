import type { Locale } from '@/types';

/**
 * Resolve a translatable column pair (`<base>_th` / `<base>_en`) to a single
 * string for the active locale — mirrors the Laravel `HasTranslations::t()`
 * trait: prefer the active locale, fall back to English, then null.
 */
export function tField(
    row: Record<string, unknown> | null | undefined,
    base: string,
    locale: Locale,
): string | null {
    if (!row) return null;

    const localized = row[`${base}_${locale}`];
    if (typeof localized === 'string' && localized !== '') return localized;

    const fallback = row[`${base}_en`];
    if (typeof fallback === 'string' && fallback !== '') return fallback;

    return null;
}
