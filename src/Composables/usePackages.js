import { onMounted, ref, watch } from 'vue';
import { supabase } from '@/lib/supabase';
import { locale } from '@/Composables/useLocale';
import { tField } from '@/lib/translate';
const COLUMNS = 'id, slug, name_th, name_en, tagline_th, tagline_en, description_th, description_en, ' +
    'price, currency, is_recommended, sort_order, ' +
    'package_features ( id, feature_th, feature_en, included, sort_order )';
/** Freelance packages with their features. Mirrors FreelanceController::index. */
export function usePackages() {
    const packages = ref([]);
    const loading = ref(true);
    const error = ref(null);
    async function load() {
        loading.value = true;
        error.value = null;
        const { data, error: e } = await supabase
            .from('packages')
            .select(COLUMNS)
            .order('is_recommended', { ascending: false })
            .order('sort_order');
        if (e)
            error.value = e.message;
        const loc = locale.value;
        packages.value = (data ?? []).map((pkg) => ({
            id: pkg.id,
            slug: pkg.slug,
            name: tField(pkg, 'name', loc),
            tagline: tField(pkg, 'tagline', loc),
            description: tField(pkg, 'description', loc),
            price: Number(pkg.price),
            currency: pkg.currency,
            is_recommended: pkg.is_recommended,
            features: [...(pkg.package_features ?? [])]
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((f) => ({
                id: f.id,
                feature: tField(f, 'feature', loc),
                included: f.included,
            })),
        }));
        loading.value = false;
    }
    onMounted(load);
    watch(locale, load);
    return { packages, loading, error };
}
//# sourceMappingURL=usePackages.js.map