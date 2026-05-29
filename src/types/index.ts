export type SiteMode = 'portfolio' | 'freelance';
export type Locale = 'en' | 'th';

export interface SocialLink {
    id: number;
    platform: string;
    url: string;
    icon: string;
    sort_order: number;
}

export interface SharedProfile {
    name: string | null;
    headline: string | null;
    avatar_url: string | null;
}

export interface SharedBlock {
    profile: SharedProfile | null;
    socialLinks: SocialLink[];
}

export interface SharedProps extends Record<string, unknown> {
    locale: Locale;
    siteMode: SiteMode;
    shared: SharedBlock;
    flash: { success?: string; error?: string };
    csrf_token: string;
    errors: Record<string, string>;
}
