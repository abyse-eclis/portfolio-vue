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
        return () => h('section', { class: 'min-h-[80vh] flex items-center justify-center py-24' }, [
            h('div', { class: 'max-w-xl text-center px-4' }, [
                h('div', {
                    class: 'w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-300 mx-auto flex items-center justify-center mb-6',
                }, h(Icon, { name: 'check', size: 36 })),
                h('h1', { class: 'font-display text-3xl md:text-4xl text-white font-bold mb-3' }, t('contact.thankYouTitle')),
                h('p', { class: 'text-slate-300 text-lg mb-8' }, t('contact.thankYouBody')),
                h(Button, { href: '/', variant: 'outline', size: 'lg' }, () => t('contact.backHome')),
            ]),
        ]);
    },
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
if (__VLS_ctx.mode === 'portfolio') {
    const __VLS_0 = PortfolioLayout || PortfolioLayout;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5;
    const { default: __VLS_6 } = __VLS_3.slots;
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.ThankYouContent} */
    ThankYouContent;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({}));
    const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
    // @ts-ignore
    [mode,];
    var __VLS_3;
}
else {
    const __VLS_12 = FreelanceLayout || FreelanceLayout;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({}));
    const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
    var __VLS_17;
    const { default: __VLS_18 } = __VLS_15.slots;
    let __VLS_19;
    /** @ts-ignore @type { | typeof __VLS_components.ThankYouContent} */
    ThankYouContent;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({}));
    const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
    // @ts-ignore
    [];
    var __VLS_15;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=ThankYou.vue.js.map