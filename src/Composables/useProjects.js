import { onMounted, ref, watch } from 'vue';
import { supabase } from '@/lib/supabase';
import { locale } from '@/Composables/useLocale';
import { useSupabaseImage } from '@/Composables/useSupabaseImage';
import { mapProjectCard, PROJECT_CARD_COLUMNS } from '@/lib/mappers';
/**
 * Portfolio project list with optional tech/type filtering. Mirrors
 * PortfolioController::index ordering (featured → sort_order → completed_at)
 * and the 24-item cap. Refetches when the filters or the locale change.
 */
export function useProjects(filters) {
    const { getPublicUrl } = useSupabaseImage();
    const projects = ref([]);
    const loading = ref(true);
    const error = ref(null);
    async function load() {
        loading.value = true;
        error.value = null;
        let query = supabase.from('projects').select(PROJECT_CARD_COLUMNS);
        if (filters.value.tech)
            query = query.contains('tech_stack', [filters.value.tech]);
        if (filters.value.type)
            query = query.eq('type', filters.value.type);
        const { data, error: e } = await query
            .order('is_featured', { ascending: false })
            .order('sort_order', { ascending: true })
            .order('completed_at', { ascending: false, nullsFirst: false })
            .limit(24);
        if (e)
            error.value = e.message;
        projects.value = (data ?? []).map((p) => mapProjectCard(p, locale.value, getPublicUrl));
        loading.value = false;
    }
    onMounted(load);
    watch([locale, () => filters.value.tech, () => filters.value.type], load);
    return { projects, loading, error };
}
//# sourceMappingURL=useProjects.js.map