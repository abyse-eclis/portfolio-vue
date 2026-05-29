import { onMounted, ref } from 'vue';
import SectionHeading from '@/Components/Shared/SectionHeading.vue';
import SkillCategoryBlock from './SkillCategoryBlock.vue';
import { useI18n } from '@/i18n';
import { useGsapAnim } from '@/Composables/useGsapAnim';
const __VLS_props = defineProps();
const { t } = useI18n();
const root = ref(null);
const { fadeUp } = useGsapAnim();
onMounted(() => {
    fadeUp(root.value, { selector: '[data-anim="card"]', stagger: 0.08, y: 28 });
});
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "skills",
    ref: "root",
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
    eyebrow: (__VLS_ctx.t('sections.skills.eyebrow')),
}));
const __VLS_2 = __VLS_1({
    eyebrow: (__VLS_ctx.t('sections.skills.eyebrow')),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
(__VLS_ctx.t('sections.skills.title'));
// @ts-ignore
[t, t,];
var __VLS_3;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid md:grid-cols-2 lg:grid-cols-3 gap-6" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
for (const [block] of __VLS_vFor((__VLS_ctx.skills))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (block.id),
        'data-anim': "card",
    });
    const __VLS_6 = SkillCategoryBlock;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        block: (block),
    }));
    const __VLS_8 = __VLS_7({
        block: (block),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    // @ts-ignore
    [skills,];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=SkillGrid.vue.js.map