import SectionHeading from '@/Components/Shared/SectionHeading.vue';
import PackageCard from './PackageCard.vue';
import { useI18n } from '@/i18n';
const emit = defineEmits();
const __VLS_props = defineProps();
const { t } = useI18n();
function onSelect(slug) {
    emit('select', slug);
    const el = document.getElementById('contact');
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.classList.add('ring-2', 'ring-accent-400/60', 'rounded-xl');
        setTimeout(() => el.classList.remove('ring-2', 'ring-accent-400/60', 'rounded-xl'), 1600);
    }
}
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "packages",
    ...{ class: "py-20 md:py-28 bg-space-950/40" },
});
/** @type {__VLS_StyleScopedClasses['py-20']} */ ;
/** @type {__VLS_StyleScopedClasses['md:py-28']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-space-950/40']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
});
/** @type {__VLS_StyleScopedClasses['max-w-7xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:px-8']} */ ;
const __VLS_0 = SectionHeading || SectionHeading;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    eyebrow: (__VLS_ctx.t('sections.packages.eyebrow')),
}));
const __VLS_2 = __VLS_1({
    eyebrow: (__VLS_ctx.t('sections.packages.eyebrow')),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
(__VLS_ctx.t('sections.packages.title'));
// @ts-ignore
[t, t,];
var __VLS_3;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-7']} */ ;
/** @type {__VLS_StyleScopedClasses['items-stretch']} */ ;
for (const [pkg] of __VLS_vFor((__VLS_ctx.packages))) {
    const __VLS_6 = PackageCard;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        ...{ 'onSelect': {} },
        key: (pkg.id),
        pkg: (pkg),
    }));
    const __VLS_8 = __VLS_7({
        ...{ 'onSelect': {} },
        key: (pkg.id),
        pkg: (pkg),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    let __VLS_11;
    const __VLS_12 = ({ select: {} },
        { onSelect: (__VLS_ctx.onSelect) });
    var __VLS_9;
    var __VLS_10;
    // @ts-ignore
    [packages, onSelect,];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
//# sourceMappingURL=PackageGrid.vue.js.map