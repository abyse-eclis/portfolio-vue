import { describe, it, expect } from 'vitest';
import { mapProjectCard, mapProjectDetail, mapTestimonial } from './mappers';

const toUrl = (p: string | null | undefined) => (p ? `https://cdn.test/${p}` : null);

describe('mapProjectCard', () => {
    const row = {
        id: 1,
        slug: 'demo',
        title_th: 'เดโม',
        title_en: 'Demo',
        description_th: 'รายละเอียด',
        description_en: 'Desc',
        role_en: 'Lead',
        type: 'web',
        thumbnail_path: 'thumb.png',
        cover_path: null,
        url: 'https://demo.test',
        repo_url: null,
        tech_stack: ['vue', 'ts'],
        is_featured: true,
        completed_at: '2025-01-01',
    };

    it('resolves translatable fields for the locale', () => {
        const card = mapProjectCard(row, 'th', toUrl);
        expect(card.title).toBe('เดโม');
        expect(card.description).toBe('รายละเอียด');
        expect(card.role).toBe('Lead'); // role_th absent -> EN fallback
    });

    it('builds public URLs and preserves passthrough fields', () => {
        const card = mapProjectCard(row, 'en', toUrl);
        expect(card.thumbnail_url).toBe('https://cdn.test/thumb.png');
        expect(card.cover_url).toBeNull();
        expect(card.tech_stack).toEqual(['vue', 'ts']);
        expect(card.is_featured).toBe(true);
    });

    it('defaults tech_stack to an empty array when missing', () => {
        const card = mapProjectCard({ ...row, tech_stack: undefined }, 'en', toUrl);
        expect(card.tech_stack).toEqual([]);
    });
});

describe('mapProjectDetail', () => {
    it('maps the gallery with locale-aware alt text', () => {
        const detail = mapProjectDetail(
            {
                id: 1,
                slug: 'demo',
                title_en: 'Demo',
                description_en: 'Desc',
                type: 'web',
                gallery: [{ path: 'g1.png', alt_th: 'รูป', alt_en: 'image' }],
            },
            'th',
            toUrl,
        );
        expect(detail.gallery).toHaveLength(1);
        expect(detail.gallery[0].url).toBe('https://cdn.test/g1.png');
        expect(detail.gallery[0].alt).toBe('รูป');
    });

    it('tolerates a non-array gallery', () => {
        const detail = mapProjectDetail(
            { id: 1, slug: 'x', title_en: 'X', description_en: 'd', type: 'web', gallery: null },
            'en',
            toUrl,
        );
        expect(detail.gallery).toEqual([]);
    });
});

describe('mapTestimonial', () => {
    it('maps client + nested project', () => {
        const t = mapTestimonial(
            {
                id: 5,
                client_name: 'Jane',
                client_role_en: 'CEO',
                client_company: 'Acme',
                content_en: 'Great work',
                rating: 5,
                avatar_path: 'a.png',
                project: { id: 2, slug: 'p', title_en: 'Proj' },
            },
            'en',
            toUrl,
        );
        expect(t.client_name).toBe('Jane');
        expect(t.client_role).toBe('CEO');
        expect(t.avatar_url).toBe('https://cdn.test/a.png');
        expect(t.project?.title).toBe('Proj');
    });

    it('handles a missing project', () => {
        const t = mapTestimonial(
            { id: 6, client_name: 'Bob', content_en: 'ok', rating: 4 },
            'en',
            toUrl,
        );
        expect(t.project).toBeNull();
    });
});
