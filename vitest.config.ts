import { defineConfig } from 'vitest/config';
import path from 'path';

// Unit tests run against the source modules directly. happy-dom gives the
// browser globals (document.cookie, Intl) that the locale/format composables
// rely on without needing a real browser.
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    test: {
        environment: 'happy-dom',
        include: ['src/**/*.{test,spec}.ts'],
        globals: true,
    },
});
