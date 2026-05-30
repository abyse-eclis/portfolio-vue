import { onMounted, ref, watch } from 'vue';
import { supabase } from '@/lib/supabase';
import { locale } from '@/Composables/useLocale';
import { useSupabaseImage } from '@/Composables/useSupabaseImage';
import { tField } from '@/lib/translate';
const COLUMNS = 'id, title_th, title_en, issuer, image_path, credential_url, issued_at, orientation, sort_order';
/** Certificates, newest first. Mirrors PortfolioController::index. */
export function useCertificates() {
    const { getPublicUrl } = useSupabaseImage();
    const certificates = ref([]);
    const loading = ref(true);
    const error = ref(null);
    async function load() {
        loading.value = true;
        error.value = null;
        const { data, error: e } = await supabase
            .from('certificates')
            .select(COLUMNS)
            .order('issued_at', { ascending: false });
        if (e)
            error.value = e.message;
        const loc = locale.value;
        certificates.value = (data ?? []).map((c) => ({
            id: c.id,
            title: tField(c, 'title', loc),
            issuer: c.issuer,
            image_url: getPublicUrl(c.image_path),
            credential_url: c.credential_url ?? null,
            issued_at: c.issued_at ?? null,
            orientation: c.orientation === 'portrait' ? 'portrait' : 'landscape',
        }));
        loading.value = false;
    }
    onMounted(load);
    watch(locale, load);
    return { certificates, loading, error };
}
//# sourceMappingURL=useCertificates.js.map