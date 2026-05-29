import { onMounted, ref, watch } from 'vue';
import { supabase } from '@/lib/supabase';
import { locale } from '@/Composables/useLocale';
import { useSupabaseImage } from '@/Composables/useSupabaseImage';
import { mapTestimonial } from '@/lib/mappers';
import type { TestimonialData } from '@/types/pages';

const COLUMNS =
    'id, client_name, client_role_th, client_role_en, client_company, ' +
    'content_th, content_en, rating, avatar_path, is_published, sort_order, ' +
    'project:projects ( id, slug, title_th, title_en )';

/**
 * Published testimonials with their related project, capped at 8. Mirrors
 * FreelanceController::index.
 */
export function useTestimonials() {
    const { getPublicUrl } = useSupabaseImage();
    const testimonials = ref<TestimonialData[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);

    async function load() {
        loading.value = true;
        error.value = null;

        const { data, error: e } = await supabase
            .from('testimonials')
            .select(COLUMNS)
            .eq('is_published', true)
            .order('sort_order')
            .limit(8);

        if (e) error.value = e.message;
        testimonials.value = (data ?? []).map((t) => mapTestimonial(t, locale.value, getPublicUrl));
        loading.value = false;
    }

    onMounted(load);
    watch(locale, load);

    return { testimonials, loading, error };
}
