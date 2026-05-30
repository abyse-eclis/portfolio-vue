// Regenerate public/sitemap.xml with the static routes + every project detail
// page. Run: `npm run sitemap` (reads VITE_SUPABASE_* from .env). Falls back to
// just the static routes if Supabase env vars are missing or the fetch fails.
import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Minimal .env reader (avoids a dotenv dependency).
function loadEnv() {
    try {
        const raw = readFileSync(resolve(root, '.env'), 'utf8');
        for (const line of raw.split('\n')) {
            const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
            if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
        }
    } catch {
        /* no .env — rely on real env vars */
    }
}

const SITE_URL = (process.env.VITE_SITE_URL || 'https://devfolio.example.com').replace(/\/$/, '');

const staticRoutes = [
    { loc: '/', changefreq: 'weekly', priority: '1.0' },
    { loc: '/freelance', changefreq: 'weekly', priority: '0.9' },
];

function urlEntry({ loc, changefreq, priority, lastmod }) {
    return [
        '    <url>',
        `        <loc>${SITE_URL}${loc}</loc>`,
        lastmod ? `        <lastmod>${lastmod}</lastmod>` : null,
        changefreq ? `        <changefreq>${changefreq}</changefreq>` : null,
        priority ? `        <priority>${priority}</priority>` : null,
        '    </url>',
    ]
        .filter(Boolean)
        .join('\n');
}

async function fetchProjects() {
    loadEnv();
    const url = process.env.VITE_SUPABASE_URL;
    const key = process.env.VITE_SUPABASE_ANON_KEY;
    if (!url || !key) {
        console.warn('[sitemap] VITE_SUPABASE_* not set — emitting static routes only.');
        return [];
    }
    const supabase = createClient(url, key);
    const { data, error } = await supabase
        .from('projects')
        .select('slug, updated_at')
        .order('sort_order', { ascending: true });
    if (error) {
        console.warn(`[sitemap] Supabase fetch failed (${error.message}) — static routes only.`);
        return [];
    }
    return data ?? [];
}

const projects = await fetchProjects();

const entries = [
    ...staticRoutes.map(urlEntry),
    ...projects.map((p) =>
        urlEntry({
            loc: `/projects/${p.slug}`,
            changefreq: 'monthly',
            priority: '0.7',
            lastmod: p.updated_at ? new Date(p.updated_at).toISOString().slice(0, 10) : undefined,
        }),
    ),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;

writeFileSync(resolve(root, 'public/sitemap.xml'), xml, 'utf8');
console.log(`[sitemap] wrote public/sitemap.xml — ${entries.length} URLs (${projects.length} projects).`);
