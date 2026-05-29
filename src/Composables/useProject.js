import { onMounted, ref, watch } from 'vue';
import { supabase } from '@/lib/supabase';
import { locale } from '@/Composables/useLocale';
import { useSupabaseImage } from '@/Composables/useSupabaseImage';
import { mapProjectDetail, mapTestimonial, PROJECT_DETAIL_COLUMNS } from '@/lib/mappers';
const TESTIMONIAL_COLUMNS = 'id, client_name, client_role_th, client_role_en, client_company, ' +
    'content_th, content_en, rating, avatar_path, is_published, sort_order';
/**
 * A single project by slug plus its published testimonials. Mirrors
 * PortfolioController::show (firstOrFail → not-found handling via `error`).
 */
export function useProject(slug) {
    const { getPublicUrl } = useSupabaseImage();
    const project = ref(null);
    const testimonials = ref([]);
    const loading = ref(true);
    const error = ref(null);
    async function load() {
        loading.value = true;
        error.value = null;
        project.value = null;
        testimonials.value = [];
        const { data, error: e } = await supabase
            .from('projects')
            .select(PROJECT_DETAIL_COLUMNS)
            .eq('slug', slug.value)
            .maybeSingle();
        if (e) {
            error.value = e.message;
            loading.value = false;
            return;
        }
        if (!data) {
            error.value = 'not_found';
            loading.value = false;
            return;
        }
        project.value = mapProjectDetail(data, locale.value, getPublicUrl);
        const { data: rows, error: tErr } = await supabase
            .from('testimonials')
            .select(TESTIMONIAL_COLUMNS)
            .eq('project_id', data.id)
            .eq('is_published', true)
            .order('sort_order');
        if (tErr)
            error.value = tErr.message;
        testimonials.value = (rows ?? []).map((t) => mapTestimonial(t, locale.value, getPublicUrl));
        loading.value = false;
    }
    onMounted(load);
    watch([locale, slug], load);
    return { project, testimonials, loading, error };
}
//# sourceMappingURL=useProject.js.map