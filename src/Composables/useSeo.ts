import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import type { Locale } from '@/types';

const SITE_NAME = 'DevFolio';
const DEFAULT_DESCRIPTION_EN = 'Full-stack developer & designer crafting digital experiences.';
const DEFAULT_DESCRIPTION_TH = 'นักพัฒนา Full-stack & ดีไซเนอร์ ผู้สร้างประสบการณ์ดิจิทัล';

export function useSeo() {
    const page = usePage();
    const locale = computed(() => (page.props.locale as Locale) ?? 'en');

    function buildTitle(pageTitle?: string): string {
        return pageTitle ? `${pageTitle} | ${SITE_NAME}` : SITE_NAME;
    }

    function buildDescription(description?: string): string {
        if (description) return description;
        return locale.value === 'th' ? DEFAULT_DESCRIPTION_TH : DEFAULT_DESCRIPTION_EN;
    }

    return { buildTitle, buildDescription, siteName: SITE_NAME };
}
