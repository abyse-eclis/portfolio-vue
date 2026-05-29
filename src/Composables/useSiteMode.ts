import { computed } from 'vue';
import { useRoute } from 'vue-router';
import type { SiteMode } from '@/types';

export function useSiteMode() {
    const route = useRoute();
    const siteMode = computed<SiteMode>(() =>
        route.path.startsWith('/freelance') ? 'freelance' : 'portfolio',
    );
    const isPortfolio = computed(() => siteMode.value === 'portfolio');
    const isFreelance = computed(() => siteMode.value === 'freelance');

    return { siteMode, isPortfolio, isFreelance };
}
