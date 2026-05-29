<template>
    <PortfolioLayout v-if="mode === 'portfolio'">
        <ThankYouContent />
    </PortfolioLayout>
    <FreelanceLayout v-else>
        <ThankYouContent />
    </FreelanceLayout>
</template>

<script setup lang="ts">
import { h, defineComponent } from 'vue';
import PortfolioLayout from '@/Layouts/PortfolioLayout.vue';
import FreelanceLayout from '@/Layouts/FreelanceLayout.vue';
import Button from '@/Components/Shared/Button.vue';
import Icon from '@/Components/Shared/Icon.vue';
import { useI18n } from '@/i18n';
import { useSiteMode } from '@/Composables/useSiteMode';

// Mode is derived from the route (the thank-you page lives at /contact/...,
// so it resolves to portfolio — matching the old ResolveSiteMode behaviour).
const { siteMode: mode } = useSiteMode();
const { t } = useI18n();

const ThankYouContent = defineComponent({
    setup() {
        return () =>
            h('section', { class: 'min-h-[80vh] flex items-center justify-center py-24' }, [
                h('div', { class: 'max-w-xl text-center px-4' }, [
                    h(
                        'div',
                        {
                            class:
                                'w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-300 mx-auto flex items-center justify-center mb-6',
                        },
                        h(Icon, { name: 'check', size: 36 }),
                    ),
                    h(
                        'h1',
                        { class: 'font-display text-3xl md:text-4xl text-white font-bold mb-3' },
                        t('contact.thankYouTitle'),
                    ),
                    h('p', { class: 'text-slate-300 text-lg mb-8' }, t('contact.thankYouBody')),
                    h(Button, { href: '/', variant: 'outline', size: 'lg' }, () => t('contact.backHome')),
                ]),
            ]);
    },
});
</script>
