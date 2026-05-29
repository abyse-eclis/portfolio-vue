import { en } from './en';
import { th } from './th';
import { locale } from '@/Composables/useLocale';

const messages = { en, th } as const;

export function useI18n() {
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
