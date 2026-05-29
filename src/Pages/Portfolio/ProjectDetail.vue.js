import { computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import PortfolioLayout from '@/Layouts/PortfolioLayout.vue';
import Button from '@/Components/Shared/Button.vue';
import Icon from '@/Components/Shared/Icon.vue';
import LazyImage from '@/Components/Shared/LazyImage.vue';
import { useI18n } from '@/i18n';
import { useSeo } from '@/Composables/useSeo';
import { useProject } from '@/Composables/useProject';
const route = useRoute();
const slug = computed(() => route.params.slug);
const { project, testimonials } = useProject(slug);
const { t } = useI18n();
const { applySeo } = useSeo();
watchEffect(() => applySeo(project.value?.title ?? undefined, project.value?.description ?? undefined));
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
const __VLS_0 = PortfolioLayout || PortfolioLayout;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
if (__VLS_ctx.project) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
        ...{ class: "py-24 md:py-32" },
    });
    /** @type {__VLS_StyleScopedClasses['py-24']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:py-32']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" },
    });
    /** @type {__VLS_StyleScopedClasses['max-w-5xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:px-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:px-8']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        href: "/",
        ...{ class: "inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-primary-300 mb-8 transition-colors" },
    });
    /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-primary-300']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    const __VLS_7 = Icon;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        name: "arrow-left",
        size: (14),
    }));
    const __VLS_9 = __VLS_8({
        name: "arrow-left",
        size: (14),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    (__VLS_ctx.t('button.backToProjects'));
    __VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
        ...{ class: "space-y-4 mb-10" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-10']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-primary-300 text-sm font-semibold uppercase tracking-wider" },
    });
    /** @type {__VLS_StyleScopedClasses['text-primary-300']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
    /** @type {__VLS_StyleScopedClasses['tracking-wider']} */ ;
    (__VLS_ctx.project.type);
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "font-display font-bold text-3xl md:text-5xl text-white" },
    });
    /** @type {__VLS_StyleScopedClasses['font-display']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:text-5xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
    (__VLS_ctx.project.title);
    if (__VLS_ctx.project.description) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-slate-300 text-lg" },
        });
        /** @type {__VLS_StyleScopedClasses['text-slate-300']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
        (__VLS_ctx.project.description);
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-wrap gap-2 pt-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['pt-2']} */ ;
    for (const [tech] of __VLS_vFor((__VLS_ctx.project.tech_stack))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            key: (tech),
            ...{ class: "px-2.5 py-1 rounded-md text-xs bg-white/5 text-slate-200 border border-white/5" },
        });
        /** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-white/5']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-slate-200']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-white/5']} */ ;
        (tech);
        // @ts-ignore
        [project, project, project, project, project, project, t,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-wrap gap-3 pt-4" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['pt-4']} */ ;
    if (__VLS_ctx.project.url) {
        const __VLS_12 = Button || Button;
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
            href: (__VLS_ctx.project.url),
            variant: "primary",
            size: "md",
        }));
        const __VLS_14 = __VLS_13({
            href: (__VLS_ctx.project.url),
            variant: "primary",
            size: "md",
        }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        const { default: __VLS_17 } = __VLS_15.slots;
        (__VLS_ctx.t('button.liveDemo'));
        const __VLS_18 = Icon;
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
            name: "external-link",
            size: (14),
        }));
        const __VLS_20 = __VLS_19({
            name: "external-link",
            size: (14),
        }, ...__VLS_functionalComponentArgsRest(__VLS_19));
        // @ts-ignore
        [project, project, t,];
        var __VLS_15;
    }
    if (__VLS_ctx.project.repo_url) {
        const __VLS_23 = Button || Button;
        // @ts-ignore
        const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
            href: (__VLS_ctx.project.repo_url),
            variant: "outline",
            size: "md",
        }));
        const __VLS_25 = __VLS_24({
            href: (__VLS_ctx.project.repo_url),
            variant: "outline",
            size: "md",
        }, ...__VLS_functionalComponentArgsRest(__VLS_24));
        const { default: __VLS_28 } = __VLS_26.slots;
        (__VLS_ctx.t('button.viewRepo'));
        const __VLS_29 = Icon;
        // @ts-ignore
        const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
            name: "github",
            size: (14),
        }));
        const __VLS_31 = __VLS_30({
            name: "github",
            size: (14),
        }, ...__VLS_functionalComponentArgsRest(__VLS_30));
        // @ts-ignore
        [project, project, t,];
        var __VLS_26;
    }
    if (__VLS_ctx.project.cover_url) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.figure, __VLS_intrinsics.figure)({
            ...{ class: "mb-12 rounded-2xl overflow-hidden border border-white/5" },
        });
        /** @type {__VLS_StyleScopedClasses['mb-12']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
        /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-white/5']} */ ;
        const __VLS_34 = LazyImage;
        // @ts-ignore
        const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
            src: (__VLS_ctx.project.cover_url),
            alt: (__VLS_ctx.project.title ?? ''),
            containerClass: "aspect-[16/9]",
            eager: true,
        }));
        const __VLS_36 = __VLS_35({
            src: (__VLS_ctx.project.cover_url),
            alt: (__VLS_ctx.project.title ?? ''),
            containerClass: "aspect-[16/9]",
            eager: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    }
    if (__VLS_ctx.project.gallery.length) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
            ...{ class: "grid sm:grid-cols-2 gap-4 mb-12" },
        });
        /** @type {__VLS_StyleScopedClasses['grid']} */ ;
        /** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-12']} */ ;
        for (const [img, idx] of __VLS_vFor((__VLS_ctx.project.gallery))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.figure, __VLS_intrinsics.figure)({
                key: (idx),
                ...{ class: "rounded-xl overflow-hidden border border-white/5" },
            });
            /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
            /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
            /** @type {__VLS_StyleScopedClasses['border']} */ ;
            /** @type {__VLS_StyleScopedClasses['border-white/5']} */ ;
            if (img.url) {
                const __VLS_39 = LazyImage;
                // @ts-ignore
                const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
                    src: (img.url),
                    alt: (img.alt),
                    containerClass: "aspect-[4/3]",
                }));
                const __VLS_41 = __VLS_40({
                    src: (img.url),
                    alt: (img.alt),
                    containerClass: "aspect-[4/3]",
                }, ...__VLS_functionalComponentArgsRest(__VLS_40));
            }
            // @ts-ignore
            [project, project, project, project, project,];
        }
    }
    if (__VLS_ctx.testimonials.length) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
            ...{ class: "space-y-5 pt-8 border-t border-white/5" },
        });
        /** @type {__VLS_StyleScopedClasses['space-y-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['pt-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-t']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-white/5']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
            ...{ class: "font-display text-2xl text-white" },
        });
        /** @type {__VLS_StyleScopedClasses['font-display']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
        (__VLS_ctx.t('sections.testimonials.title'));
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "grid md:grid-cols-2 gap-5" },
        });
        /** @type {__VLS_StyleScopedClasses['grid']} */ ;
        /** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-5']} */ ;
        for (const [t] of __VLS_vFor((__VLS_ctx.testimonials))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.blockquote, __VLS_intrinsics.blockquote)({
                key: (t.id),
                ...{ class: "p-5 rounded-xl bg-space-800/40 border border-white/5" },
            });
            /** @type {__VLS_StyleScopedClasses['p-5']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
            /** @type {__VLS_StyleScopedClasses['bg-space-800/40']} */ ;
            /** @type {__VLS_StyleScopedClasses['border']} */ ;
            /** @type {__VLS_StyleScopedClasses['border-white/5']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                ...{ class: "text-slate-300 italic" },
            });
            /** @type {__VLS_StyleScopedClasses['text-slate-300']} */ ;
            /** @type {__VLS_StyleScopedClasses['italic']} */ ;
            (t.content);
            __VLS_asFunctionalElement1(__VLS_intrinsics.footer, __VLS_intrinsics.footer)({
                ...{ class: "mt-3 text-sm text-slate-400" },
            });
            /** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
            (t.client_name);
            if (t.client_role) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
                (t.client_role);
            }
            // @ts-ignore
            [t, testimonials, testimonials,];
        }
    }
}
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=ProjectDetail.vue.js.map