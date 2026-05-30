import { locale } from '@/Composables/useLocale';

const SITE_NAME = 'DevFolio';
const DEFAULT_DESCRIPTION_EN = 'Full-stack developer & designer crafting digital experiences.';
const DEFAULT_DESCRIPTION_TH = 'นักพัฒนา Full-stack & ดีไซเนอร์ ผู้สร้างประสบการณ์ดิจิทัล';

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
    let el = document.head.querySelector<HTMLMetaElement>(selector);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

function setMetaDescription(content: string) {
    upsertMeta('meta[name="description"]', 'name', 'description', content);
}

export function useSeo() {
    function buildTitle(pageTitle?: string): string {
        return pageTitle ? `${pageTitle} | ${SITE_NAME}` : SITE_NAME;
    }

    function buildDescription(description?: string): string {
        if (description) return description;
        return locale.value === 'th' ? DEFAULT_DESCRIPTION_TH : DEFAULT_DESCRIPTION_EN;
    }

    // Replaces Inertia's <Head> — write document.title / meta tags directly.
    // Call inside a watchEffect so it re-runs as data/locale load. Keeps the
    // <html lang> and Open Graph / Twitter tags in sync for SEO + social share.
    function applySeo(pageTitle?: string, description?: string) {
        const title = buildTitle(pageTitle);
        const desc = buildDescription(description);

        document.title = title;
        document.documentElement.lang = locale.value;
        setMetaDescription(desc);

        upsertMeta('meta[property="og:title"]', 'property', 'og:title', title);
        upsertMeta('meta[property="og:description"]', 'property', 'og:description', desc);
        upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
        upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', desc);

        if (typeof location !== 'undefined') {
            upsertMeta('meta[property="og:url"]', 'property', 'og:url', location.href);
        }
    }

    return { buildTitle, buildDescription, applySeo, siteName: SITE_NAME };
}
