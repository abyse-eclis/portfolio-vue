import { computed, onMounted, ref, watch } from 'vue';
import { supabase } from '@/lib/supabase';
import { locale } from '@/Composables/useLocale';
import { useSupabaseImage } from '@/Composables/useSupabaseImage';
import { tField } from '@/lib/translate';
const COLUMNS = 'id, name, avatar_path, resume_path, years_experience, ' +
    'headline_th, headline_en, bio_th, bio_en, ' +
    'freelance_tagline_th, freelance_tagline_en, freelance_bio_th, freelance_bio_en';
/**
 * The single site profile, exposed in both the portfolio and freelance
 * shapes (a page picks the one it needs). Mirrors the `transformProfile`
 * logic in PortfolioController / FreelanceController.
 */
export function useProfile() {
    const { getPublicUrl } = useSupabaseImage();
    const raw = ref(null);
    const loading = ref(true);
    const error = ref(null);
    async function load() {
        loading.value = true;
        error.value = null;
        const { data, error: e } = await supabase
            .from('profiles')
            .select(COLUMNS)
            .order('id')
            .limit(1)
            .maybeSingle();
        if (e)
            error.value = e.message;
        raw.value = data ?? null;
        loading.value = false;
    }
    onMounted(load);
    watch(locale, load);
    const portfolio = computed(() => {
        const p = raw.value;
        if (!p)
            return null;
        return {
            name: p.name ?? null,
            headline: tField(p, 'headline', locale.value),
            bio: tField(p, 'bio', locale.value),
            avatar_url: getPublicUrl(p.avatar_path),
            years_experience: p.years_experience ?? null,
            resume_url: getPublicUrl(p.resume_path),
        };
    });
    const freelance = computed(() => {
        const p = raw.value;
        if (!p)
            return null;
        return {
            name: p.name ?? null,
            tagline: tField(p, 'freelance_tagline', locale.value),
            bio: tField(p, 'freelance_bio', locale.value),
            years_experience: p.years_experience ?? null,
            avatar_url: getPublicUrl(p.avatar_path),
        };
    });
    return { portfolio, freelance, loading, error };
}
//# sourceMappingURL=useProfile.js.map