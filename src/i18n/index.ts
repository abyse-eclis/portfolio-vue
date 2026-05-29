import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { en } from './en';
import { th } from './th';
import type { Locale } from '@/types';

const messages = { en, th } as const;

export function useI18n() {
    const page = usePage();
    const locale = computed(() => (page.props.locale as Locale) ?? 'en');

    function t(key: string): string {
        const parts = key.split('.');
        let node: unknown = messages[locale.value] ?? messages.en;

        for (const part of parts) {
            if (node == null || typeof node !== 'object') return key;
            node = (node as Record<string, unknown>)[part];
        }

        return typeof node === 'string' ? node : key;
    }

    return { t, locale };
}
