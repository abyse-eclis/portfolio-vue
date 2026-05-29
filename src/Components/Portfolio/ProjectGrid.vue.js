import { computed, onMounted, ref, watch } from 'vue';
import SectionHeading from '@/Components/Shared/SectionHeading.vue';
import ProjectCard from './ProjectCard.vue';
import ProjectFilter from './ProjectFilter.vue';
import { useI18n } from '@/i18n';
import { useGsapAnim } from '@/Composables/useGsapAnim';
const props = defineProps();
const { t } = useI18n();
const root = ref(null);
const { fadeUp } = useGsapAnim();
const techs = computed(() => {
    const all = new Set();
    props.projects.forEach((p) => p.tech_stack.forEach((tech) => all.add(tech)));
    return Array.from(all).sort();
});
onMounted(() => {
    fadeUp(root.value, { selector: '[data-anim="project"]', stagger: 0.07 });
});
watch(() => props.projects, () => {
    if (!root.value)
        return;
    fadeUp(root.value, { selector: '[data-anim="project"]', stagger: 0.05, duration: 0.5 });
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
    id: "projects",
    ref: "root",
    ...{ class: "py-20 md:py-28 bg-space-900" },
});
/** @type {__VLS_StyleScopedClasses['py-20']} */ ;
/** @type {__VLS_StyleScopedClasses['md:py-28']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-space-900']} */ ;
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
    eyebrow: (__VLS_ctx.t('sections.projects.eyebrow')),
}));
const __VLS_2 = __VLS_1({
    eyebrow: (__VLS_ctx.t('sections.projects.eyebrow')),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
(__VLS_ctx.t('sections.projects.title'));
// @ts-ignore
[t, t,];
var __VLS_3;
if (__VLS_ctx.techs.length) {
    const __VLS_6 = ProjectFilter;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        techs: (__VLS_ctx.techs),
        currentTech: (__VLS_ctx.currentTech),
    }));
    const __VLS_8 = __VLS_7({
        techs: (__VLS_ctx.techs),
        currentTech: (__VLS_ctx.currentTech),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
}
if (__VLS_ctx.projects.length) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
    for (const [project] of __VLS_vFor((__VLS_ctx.projects))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (project.id),
            'data-anim': "project",
        });
        const __VLS_11 = ProjectCard;
        // @ts-ignore
        const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
            project: (project),
        }));
        const __VLS_13 = __VLS_12({
            project: (project),
        }, ...__VLS_functionalComponentArgsRest(__VLS_12));
        // @ts-ignore
        [techs, techs, currentTech, projects, projects,];
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-center py-16 text-slate-400" },
    });
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-16']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
    (__VLS_ctx.t('common.loading'));
}
// @ts-ignore
[t,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=ProjectGrid.vue.js.map