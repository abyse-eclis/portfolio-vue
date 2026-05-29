import { ref } from 'vue';
import type { Locale } from '@/types';

const LOCALE_COOKIE = 'locale';

function readCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
}

function initialLocale(): Locale {
    const stored = readCookie(LOCALE_COOKIE);
    return stored === 'th' || stored === 'en' ? stored : 'en';
}

// Module-level singleton: every component/composable shares one reactive
// locale. Data composables watch this ref and refetch when it changes
// (replaces Inertia's full-page router.reload on locale switch).
const locale = ref<Locale>(initialLocale());

export function useLocale() {
    function switchLocale(newLocale: Locale) {
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
        document.cookie = `${LOCALE_COOKIE}=${newLocale};path=/;expires=${expires.toUTCString()};SameSite=Lax`;
        locale.value = newLocale;
    }

    return { locale, switchLocale };
}

export { locale };
