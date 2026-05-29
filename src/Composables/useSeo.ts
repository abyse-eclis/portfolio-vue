import { locale } from '@/Composables/useLocale';

const SITE_NAME = 'DevFolio';
const DEFAULT_DESCRIPTION_EN = 'Full-stack developer & designer crafting digital experiences.';
const DEFAULT_DESCRIPTION_TH = 'นักพัฒนา Full-stack & ดีไซเนอร์ ผู้สร้างประสบการณ์ดิจิทัล';

function setMetaDescription(content: string) {
    let el = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', 'description');
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

export function useSeo() {
    function buildTitle(pageTitle?: string): string {
        return pageTitle ? `${pageTitle} | ${SITE_NAME}` : SITE_NAME;
    }

    function buildDescription(description?: string): string {
        if (description) return description;
        return locale.value === 'th' ? DEFAULT_DESCRIPTION_TH : DEFAULT_DESCRIPTION_EN;
    }

    // Replaces Inertia's <Head> — write document.title / meta description
    // directly. Call inside a watchEffect so it re-runs as data/locale load.
    function applySeo(pageTitle?: string, description?: string) {
        document.title = buildTitle(pageTitle);
        setMetaDescription(buildDescription(description));
    }

    return { buildTitle, buildDescription, applySeo, siteName: SITE_NAME };
}
