import { tField } from '@/lib/translate';
import type { Locale } from '@/types';
import type {
    ProjectCardData,
    ProjectDetailData,
    TestimonialData,
} from '@/types/pages';

type Row = Record<string, any>;
type ToUrl = (path: string | null | undefined) => string | null;

/**
 * Shape a raw `projects` row into the resolved card contract the components
 * expect. Mirrors PortfolioController::transformProject().
 */
export function mapProjectCard(p: Row, locale: Locale, toUrl: ToUrl): ProjectCardData {
    return {
        id: p.id,
        slug: p.slug,
        title: tField(p, 'title', locale),
        description: tField(p, 'description', locale),
        role: tField(p, 'role', locale),
        type: p.type,
        thumbnail_url: toUrl(p.thumbnail_path),
        cover_url: toUrl(p.cover_path),
        url: p.url ?? null,
        repo_url: p.repo_url ?? null,
        tech_stack: p.tech_stack ?? [],
        is_featured: p.is_featured,
        completed_at: p.completed_at ?? null,
    };
}

export function mapProjectDetail(p: Row, locale: Locale, toUrl: ToUrl): ProjectDetailData {
    const gallery = Array.isArray(p.gallery) ? p.gallery : [];
    return {
        ...mapProjectCard(p, locale, toUrl),
        gallery: gallery.map((g: Row) => ({
            url: toUrl(g.path),
            alt: (locale === 'th' ? g.alt_th : g.alt_en) ?? g.alt_en ?? '',
        })),
    };
}

export function mapTestimonial(t: Row, locale: Locale, toUrl: ToUrl): TestimonialData {
    const project = t.project ?? null;
    return {
        id: t.id,
        client_name: t.client_name,
        client_role: tField(t, 'client_role', locale),
        client_company: t.client_company ?? null,
        content: tField(t, 'content', locale),
        rating: t.rating,
        avatar_url: toUrl(t.avatar_path),
        project: project
            ? { id: project.id, slug: project.slug, title: tField(project, 'title', locale) }
            : null,
    };
}

// Column lists kept in one place so every query selects both translation
// columns (resolved client-side via tField).
export const PROJECT_CARD_COLUMNS =
    'id, slug, title_th, title_en, description_th, description_en, role_th, role_en, ' +
    'type, thumbnail_path, cover_path, url, repo_url, tech_stack, is_featured, ' +
    'show_in_freelance, sort_order, completed_at';

export const PROJECT_DETAIL_COLUMNS = `${PROJECT_CARD_COLUMNS}, gallery`;
