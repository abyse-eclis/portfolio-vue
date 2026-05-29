import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import type { SiteMode } from '@/types';

export function useSiteMode() {
    const page = usePage();
    const siteMode = computed(() => (page.props.siteMode as SiteMode) ?? 'portfolio');
    const isPortfolio = computed(() => siteMode.value === 'portfolio');
    const isFreelance = computed(() => siteMode.value === 'freelance');

    return { siteMode, isPortfolio, isFreelance };
}
