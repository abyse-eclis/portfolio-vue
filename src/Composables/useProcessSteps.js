import { onMounted, ref, watch } from 'vue';
import { supabase } from '@/lib/supabase';
import { locale } from '@/Composables/useLocale';
import { tField } from '@/lib/translate';
const COLUMNS = 'id, title_th, title_en, description_th, description_en, icon, step_number';
/** Freelance process steps, ordered by step_number. Mirrors FreelanceController::index. */
export function useProcessSteps() {
    const processSteps = ref([]);
    const loading = ref(true);
    const error = ref(null);
    async function load() {
        loading.value = true;
        error.value = null;
        const { data, error: e } = await supabase
            .from('process_steps')
            .select(COLUMNS)
            .order('step_number');
        if (e)
            error.value = e.message;
        const loc = locale.value;
        processSteps.value = (data ?? []).map((s) => ({
            id: s.id,
            step_number: s.step_number,
            title: tField(s, 'title', loc),
            description: tField(s, 'description', loc),
            icon: s.icon ?? null,
        }));
        loading.value = false;
    }
    onMounted(load);
    watch(locale, load);
    return { processSteps, loading, error };
}
//# sourceMappingURL=useProcessSteps.js.map