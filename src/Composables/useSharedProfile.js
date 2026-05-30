import { computed, ref, watch } from 'vue';
import { supabase } from '@/lib/supabase';
import { locale } from '@/Composables/useLocale';
import { useSiteMode } from '@/Composables/useSiteMode';
import { useSupabaseImage } from '@/Composables/useSupabaseImage';
import { tField } from '@/lib/translate';
// The "shared" block that Inertia injected on every request: the profile
// (name / headline / avatar) plus social links. Fetched once and cached at
// module scope, then refetched when the locale changes.
const rawProfile = ref(null);
const rawSocials = ref([]);
const loading = ref(false);
const error = ref(null);
let initialized = false;
async function load() {
    loading.value = true;
    error.value = null;
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, name_th, name_en, headline_th, headline_en, avatar_path')
        .order('id')
        .limit(1)
        .maybeSingle();
    if (profileError) {
        error.value = profileError.message;
        loading.value = false;
        return;
    }
    rawProfile.value = profile ?? null;
    if (profile) {
        const { data: socials, error: socialsError } = await supabase
            .from('social_links')
            .select('id, platform, url, icon, sort_order, show_in_portfolio, show_in_freelance')
            .eq('profile_id', profile.id)
            .order('sort_order');
        if (socialsError) {
            error.value = socialsError.message;
        }
        else {
            rawSocials.value = socials ?? [];
        }
    }
    loading.value = false;
}
function ensureInitialized() {
    if (initialized)
        return;
    initialized = true;
    load();
    watch(locale, load);
}
export function useSharedProfile() {
    const { getPublicUrl } = useSupabaseImage();
    const { siteMode } = useSiteMode();
    ensureInitialized();
    const profile = computed(() => {
        const p = rawProfile.value;
        if (!p)
            return null;
        return {
            name: tField(p, 'name', locale.value),
            headline: tField(p, 'headline', locale.value),
            avatar_url: getPublicUrl(p.avatar_path),
        };
    });
    const socialLinks = computed(() => {
        const flag = siteMode.value === 'freelance' ? 'show_in_freelance' : 'show_in_portfolio';
        return rawSocials.value
            .filter((s) => s[flag])
            .map((s) => ({
            id: s.id,
            platform: s.platform,
            url: s.url,
            icon: s.icon ?? s.platform,
            sort_order: s.sort_order,
        }));
    });
    return { profile, socialLinks, loading, error };
}
//# sourceMappingURL=useSharedProfile.js.map