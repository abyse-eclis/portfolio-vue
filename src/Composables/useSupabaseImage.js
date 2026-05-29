const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const publicBucket = import.meta.env.VITE_SUPABASE_PUBLIC_BUCKET ?? 'devfolio-public';
export function useSupabaseImage() {
    function getPublicUrl(path) {
        if (!path || !supabaseUrl)
            return null;
        return `${supabaseUrl}/storage/v1/object/public/${publicBucket}/${path}`;
    }
    function getImageUrl(path, fallback = '') {
        return getPublicUrl(path) ?? fallback;
    }
    return { getPublicUrl, getImageUrl };
}
//# sourceMappingURL=useSupabaseImage.js.map