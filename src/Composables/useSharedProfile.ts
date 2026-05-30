import { computed, ref, watch } from 'vue';
import { supabase } from '@/lib/supabase';
import { locale } from '@/Composables/useLocale';
import { useSiteMode } from '@/Composables/useSiteMode';
import { useSupabaseImage } from '@/Composables/useSupabaseImage';
import { tField } from '@/lib/translate';
import type { SharedProfile, SocialLink } from '@/types';

// The "shared" block that Inertia injected on every request: the profile
// (name / headline / avatar) plus social links. Fetched once and cached at
// module scope, then refetched when the locale changes.
const rawProfile = ref<Record<string, unknown> | null>(null);
const rawSocials = ref<Record<string, unknown>[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
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
        } else {
            rawSocials.value = socials ?? [];
        }
    }

    loading.value = false;
}

function ensureInitialized() {
    if (initialized) return;
    initialized = true;
    load();
    watch(locale, load);
}

export function useSharedProfile() {
    const { getPublicUrl } = useSupabaseImage();
    const { siteMode } = useSiteMode();

    ensureInitialized();

    const profile = computed<SharedProfile | null>(() => {
        const p = rawProfile.value;
        if (!p) return null;
        return {
            name: tField(p, 'name', locale.value),
            headline: tField(p, 'headline', locale.value),
            avatar_url: getPublicUrl(p.avatar_path as string | null),
        };
    });

    const socialLinks = computed<SocialLink[]>(() => {
        const flag = siteMode.value === 'freelance' ? 'show_in_freelance' : 'show_in_portfolio';
        return rawSocials.value
            .filter((s) => s[flag])
            .map((s) => ({
                id: s.id as number,
                platform: s.platform as string,
                url: s.url as string,
                icon: (s.icon as string | null) ?? (s.platform as string),
                sort_order: s.sort_order as number,
            }));
    });

    return { profile, socialLinks, loading, error };
}
