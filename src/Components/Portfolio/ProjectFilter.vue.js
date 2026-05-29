import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from '@/i18n';
const props = defineProps();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const options = computed(() => [
    { value: null, label: t('filter.all') },
    ...props.techs.map((tech) => ({ value: tech, label: tech })),
]);
function isActive(value) {
    return (value ?? null) === (props.currentTech ?? null);
}
function select(tech) {
    const query = { ...route.query };
    if (tech)
        query.tech = tech;
    else
        delete query.tech;
    router.push({ query });
}
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-wrap gap-2 mb-8" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
for (const [opt] of __VLS_vFor((__VLS_ctx.options))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.select(opt.value);
                // @ts-ignore
                [options, select,];
            } },
        key: (opt.value ?? 'all'),
        type: "button",
        ...{ class: ([
                'px-3 py-1.5 rounded-full text-sm border transition-colors',
                __VLS_ctx.isActive(opt.value)
                    ? 'bg-primary-500 text-space-900 border-primary-500 font-medium'
                    : 'bg-white/5 text-slate-300 border-white/5 hover:border-primary-500/40 hover:text-white',
            ]) },
    });
    /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    (opt.label);
    // @ts-ignore
    [isActive,];
}
if (__VLS_ctx.currentTech) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.currentTech))
                    return;
                __VLS_ctx.select(null);
                // @ts-ignore
                [select, currentTech,];
            } },
        type: "button",
        ...{ class: "px-3 py-1.5 rounded-full text-sm border border-white/10 text-slate-400 hover:text-white" },
    });
    /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-white']} */ ;
    (__VLS_ctx.t('filter.clear'));
}
// @ts-ignore
[t,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=ProjectFilter.vue.js.map