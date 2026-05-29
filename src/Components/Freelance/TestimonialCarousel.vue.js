import { ref } from 'vue';
import SectionHeading from '@/Components/Shared/SectionHeading.vue';
import Icon from '@/Components/Shared/Icon.vue';
import { useI18n } from '@/i18n';
const __VLS_props = defineProps();
const { t } = useI18n();
const track = ref(null);
function scrollBy(dir) {
    if (!track.value)
        return;
    const card = track.value.firstElementChild;
    const distance = (card?.offsetWidth ?? track.value.clientWidth) * 0.9 * dir;
    track.value.scrollBy({ left: distance, behavior: 'smooth' });
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
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "testimonials",
    ...{ class: "py-20 md:py-28 bg-space-950/40" },
});
/** @type {__VLS_StyleScopedClasses['py-20']} */ ;
/** @type {__VLS_StyleScopedClasses['md:py-28']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-space-950/40']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" },
});
/** @type {__VLS_StyleScopedClasses['max-w-5xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:px-8']} */ ;
const __VLS_0 = SectionHeading || SectionHeading;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    eyebrow: (__VLS_ctx.t('sections.testimonials.eyebrow')),
}));
const __VLS_2 = __VLS_1({
    eyebrow: (__VLS_ctx.t('sections.testimonials.eyebrow')),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
(__VLS_ctx.t('sections.testimonials.title'));
// @ts-ignore
[t, t,];
var __VLS_3;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ref: "trackContainer",
    ...{ class: "relative overflow-hidden" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ref: "track",
    ...{ class: "flex snap-x snap-mandatory overflow-x-auto scroll-smooth gap-5 pb-3" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['snap-x']} */ ;
/** @type {__VLS_StyleScopedClasses['snap-mandatory']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-smooth']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-5']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-3']} */ ;
for (const [t] of __VLS_vFor((__VLS_ctx.testimonials))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
        key: (t.id),
        ...{ class: "snap-center shrink-0 w-[88%] sm:w-[60%] lg:w-[45%] p-6 md:p-7 rounded-2xl bg-space-800/50 border border-white/5" },
    });
    /** @type {__VLS_StyleScopedClasses['snap-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-[88%]']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:w-[60%]']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:w-[45%]']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:p-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-space-800/50']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-white/5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex gap-1 mb-3" },
        'aria-label': (`Rating ${t.rating} of 5`),
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
    for (const [n] of __VLS_vFor((5))) {
        const __VLS_6 = Icon;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
            key: (n),
            name: "star",
            size: (16),
            ...{ class: (n <= t.rating ? 'text-yellow-400' : 'text-slate-700') },
            filled: (n <= t.rating),
        }));
        const __VLS_8 = __VLS_7({
            key: (n),
            name: "star",
            size: (16),
            ...{ class: (n <= t.rating ? 'text-yellow-400' : 'text-slate-700') },
            filled: (n <= t.rating),
        }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        // @ts-ignore
        [testimonials,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-slate-200 italic leading-relaxed mb-4" },
    });
    /** @type {__VLS_StyleScopedClasses['text-slate-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['italic']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    (t.content);
    __VLS_asFunctionalElement1(__VLS_intrinsics.footer, __VLS_intrinsics.footer)({
        ...{ class: "flex items-center gap-3" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-10 h-10 rounded-full bg-space-700 overflow-hidden flex items-center justify-center text-sm text-primary-300 font-medium" },
    });
    /** @type {__VLS_StyleScopedClasses['w-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-space-700']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-300']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    if (t.avatar_url) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
            src: (t.avatar_url),
            alt: (t.client_name),
            ...{ class: "w-full h-full object-cover" },
            loading: "lazy",
        });
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (t.client_name?.[0]);
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-white font-medium" },
    });
    /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    (t.client_name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-slate-400 text-xs" },
    });
    /** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    if (t.client_role) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (t.client_role);
    }
    if (t.client_company) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (t.client_company);
    }
    // @ts-ignore
    [];
}
if (__VLS_ctx.testimonials.length > 1) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex justify-center gap-2 mt-5" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.testimonials.length > 1))
                    return;
                __VLS_ctx.scrollBy(-1);
                // @ts-ignore
                [testimonials, scrollBy,];
            } },
        type: "button",
        ...{ class: "w-10 h-10 rounded-full border border-white/10 text-slate-300 hover:bg-white/5 transition-colors flex items-center justify-center" },
        'aria-label': "Previous",
    });
    /** @type {__VLS_StyleScopedClasses['w-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-300']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-white/5']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    const __VLS_11 = Icon;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
        name: "arrow-left",
        size: (16),
    }));
    const __VLS_13 = __VLS_12({
        name: "arrow-left",
        size: (16),
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.testimonials.length > 1))
                    return;
                __VLS_ctx.scrollBy(1);
                // @ts-ignore
                [scrollBy,];
            } },
        type: "button",
        ...{ class: "w-10 h-10 rounded-full border border-white/10 text-slate-300 hover:bg-white/5 transition-colors flex items-center justify-center" },
        'aria-label': "Next",
    });
    /** @type {__VLS_StyleScopedClasses['w-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-300']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-white/5']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    const __VLS_16 = Icon;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
        name: "arrow-right",
        size: (16),
    }));
    const __VLS_18 = __VLS_17({
        name: "arrow-right",
        size: (16),
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=TestimonialCarousel.vue.js.map