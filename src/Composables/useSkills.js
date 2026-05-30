import { onMounted, ref, watch } from 'vue';
import { supabase } from '@/lib/supabase';
import { locale } from '@/Composables/useLocale';
import { useSupabaseImage } from '@/Composables/useSupabaseImage';
import { tField } from '@/lib/translate';
const COLUMNS = 'id, slug, name_th, name_en, icon, sort_order, ' +
    'skills ( id, name, proficiency, icon_path, sort_order )';
/** Skill categories with their skills. Mirrors PortfolioController::index. */
export function useSkills() {
    const { getPublicUrl } = useSupabaseImage();
    const skills = ref([]);
    const loading = ref(true);
    const error = ref(null);
    async function load() {
        loading.value = true;
        error.value = null;
        const { data, error: e } = await supabase
            .from('skill_categories')
            .select(COLUMNS)
            .order('sort_order');
        if (e)
            error.value = e.message;
        const loc = locale.value;
        skills.value = (data ?? []).map((c) => ({
            id: c.id,
            category: {
                id: c.id,
                slug: c.slug,
                name: tField(c, 'name', loc),
                icon: c.icon ?? null,
            },
            items: [...(c.skills ?? [])]
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((s) => ({
                id: s.id,
                name: s.name,
                proficiency: s.proficiency,
                icon_url: getPublicUrl(s.icon_path),
            })),
        }));
        loading.value = false;
    }
    onMounted(load);
    watch(locale, load);
    return { skills, loading, error };
}
//# sourceMappingURL=useSkills.js.map