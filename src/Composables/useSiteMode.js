import { computed } from 'vue';
import { useRoute } from 'vue-router';
export function useSiteMode() {
    const route = useRoute();
    const siteMode = computed(() => route.path.startsWith('/freelance') ? 'freelance' : 'portfolio');
    const isPortfolio = computed(() => siteMode.value === 'portfolio');
    const isFreelance = computed(() => siteMode.value === 'freelance');
    return { siteMode, isPortfolio, isFreelance };
}
//# sourceMappingURL=useSiteMode.js.map