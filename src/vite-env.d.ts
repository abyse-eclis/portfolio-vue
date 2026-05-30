/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
    /** "true" routes contact submissions through the submit-contact Edge Function. */
    readonly VITE_USE_CONTACT_FN?: string;
    /** Canonical site URL used by the sitemap generator (optional). */
    readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
