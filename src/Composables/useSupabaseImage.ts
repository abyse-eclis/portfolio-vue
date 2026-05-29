const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string ?? '';
const publicBucket = import.meta.env.VITE_SUPABASE_PUBLIC_BUCKET as string ?? 'devfolio-public';

export function useSupabaseImage() {
    function getPublicUrl(path: string | null | undefined): string | null {
        if (!path || !supabaseUrl) return null;
        return `${supabaseUrl}/storage/v1/object/public/${publicBucket}/${path}`;
    }

    function getImageUrl(path: string | null | undefined, fallback = ''): string {
        return getPublicUrl(path) ?? fallback;
    }

    return { getPublicUrl, getImageUrl };
}
