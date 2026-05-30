import { computed, onMounted, ref, watch } from 'vue';
import { supabase } from '@/lib/supabase';
import { locale } from '@/Composables/useLocale';
import { useSupabaseImage } from '@/Composables/useSupabaseImage';
import { tField } from '@/lib/translate';
import type { ProfilePortfolio, ProfileFreelance } from '@/types/pages';

const COLUMNS =
    'id, name_th, name_en, avatar_path, resume_path, years_experience, ' +
    'headline_th, headline_en, about_heading_th, about_heading_en, bio_th, bio_en, ' +
    'freelance_tagline_th, freelance_tagline_en, freelance_bio_th, freelance_bio_en';

/**
 * The single site profile, exposed in both the portfolio and freelance
 * shapes (a page picks the one it needs). Mirrors the `transformProfile`
 * logic in PortfolioController / FreelanceController.
 */
export function useProfile() {
    const { getPublicUrl } = useSupabaseImage();
    const raw = ref<Record<string, any> | null>(null);
    const loading = ref(true);
    const error = ref<string | null>(null);

    async function load() {
        loading.value = true;
        error.value = null;
        const { data, error: e } = await supabase
            .from('profiles')
            .select(COLUMNS)
            .order('id')
            .limit(1)
            .maybeSingle();
        if (e) error.value = e.message;
        raw.value = data ?? null;
        loading.value = false;
    }

    onMounted(load);
    watch(locale, load);

    const portfolio = computed<ProfilePortfolio | null>(() => {
        const p = raw.value;
        if (!p) return null;
        return {
            name: tField(p, 'name', locale.value),
            headline: tField(p, 'headline', locale.value),
            about_heading: tField(p, 'about_heading', locale.value),
            bio: tField(p, 'bio', locale.value),
            avatar_url: getPublicUrl(p.avatar_path),
            years_experience: p.years_experience ?? null,
            resume_url: getPublicUrl(p.resume_path),
        };
    });

    const freelance = computed<ProfileFreelance | null>(() => {
        const p = raw.value;
        if (!p) return null;
        return {
            name: tField(p, 'name', locale.value),
            tagline: tField(p, 'freelance_tagline', locale.value),
            bio: tField(p, 'freelance_bio', locale.value),
            years_experience: p.years_experience ?? null,
            avatar_url: getPublicUrl(p.avatar_path),
        };
    });

    return { portfolio, freelance, loading, error };
}
