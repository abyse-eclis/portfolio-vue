import { en } from './en';
import { th } from './th';
import { locale } from '@/Composables/useLocale';
const messages = { en, th };
export function useI18n() {
    function t(key) {
        const parts = key.split('.');
        let node = messages[locale.value] ?? messages.en;
        for (const part of parts) {
            if (node == null || typeof node !== 'object')
                return key;
            node = node[part];
        }
        return typeof node === 'string' ? node : key;
    }
    return { t, locale };
}
//# sourceMappingURL=index.js.map