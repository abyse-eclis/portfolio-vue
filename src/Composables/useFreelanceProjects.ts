import { onMounted, ref, watch } from 'vue';
import { supabase } from '@/lib/supabase';
import { locale } from '@/Composables/useLocale';
import { useSupabaseImage } from '@/Composables/useSupabaseImage';
import { mapProjectCard, PROJECT_CARD_COLUMNS } from '@/lib/mappers';
import type { ProjectCardData } from '@/types/pages';

/**
 * Projects flagged for the freelance page (show_in_freelance), capped at 8.
 * Mirrors FreelanceController::index.
 */
export function useFreelanceProjects() {
    const { getPublicUrl } = useSupabaseImage();
    const selectedProjects = ref<ProjectCardData[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);

    async function load() {
        loading.value = true;
        error.value = null;

        const { data, error: e } = await supabase
            .from('projects')
            .select(PROJECT_CARD_COLUMNS)
            .eq('show_in_freelance', true)
            .order('sort_order')
            .order('completed_at', { ascending: false, nullsFirst: false })
            .limit(8);

        if (e) error.value = e.message;
        selectedProjects.value = (data ?? []).map((p) => mapProjectCard(p, locale.value, getPublicUrl));
        loading.value = false;
    }

    onMounted(load);
    watch(locale, load);

    return { selectedProjects, loading, error };
}
