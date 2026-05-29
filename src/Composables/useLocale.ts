import { computed } from 'vue';
import { usePage, router } from '@inertiajs/vue3';
import type { Locale } from '@/types';

export function useLocale() {
    const page = usePage();
    const locale = computed(() => (page.props.locale as Locale) ?? 'en');

    function switchLocale(newLocale: Locale) {
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
        document.cookie = `locale=${newLocale};path=/;expires=${expires.toUTCString()};SameSite=Lax`;
        router.reload();
    }

    return { locale, switchLocale };
}
