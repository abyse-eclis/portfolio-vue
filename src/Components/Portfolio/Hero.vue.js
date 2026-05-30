import { computed, onMounted } from 'vue';
import { gsap } from 'gsap';
import Button from '@/Components/Shared/Button.vue';
import LazyImage from '@/Components/Shared/LazyImage.vue';
import { useI18n } from '@/i18n';
import { useReducedMotion } from '@/Composables/useReducedMotion';
const props = defineProps();
const { t } = useI18n();
const { prefersReducedMotion } = useReducedMotion();
onMounted(() => {
    if (prefersReducedMotion.value)
        return;
    gsap.from('#hero h1', { opacity: 0, y: 24, duration: 0.8, ease: 'power3.out' });
    gsap.from('#hero p, #hero a, #hero button, #hero span', {
        opacity: 0,
        y: 18,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.06,
        delay: 0.25,
    });
});
const initials = computed(() => (props.profile.name ?? '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join(''));
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
    id: "hero",
    ...{ class: "relative min-h-[88vh] flex items-center overflow-hidden" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[88vh]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 md:py-32" },
});
/** @type {__VLS_StyleScopedClasses['max-w-7xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:px-8']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['py-24']} */ ;
/** @type {__VLS_StyleScopedClasses['md:py-32']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid lg:grid-cols-12 gap-12 items-center" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-12']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-12']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "lg:col-span-7 space-y-6" },
});
/** @type {__VLS_StyleScopedClasses['lg:col-span-7']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-primary-300 font-medium" },
});
/** @type {__VLS_StyleScopedClasses['text-primary-300']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
(__VLS_ctx.t('hero.portfolioGreeting'));
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight" },
});
/** @type {__VLS_StyleScopedClasses['font-display']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:text-5xl']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:text-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-tight']} */ ;
(__VLS_ctx.profile.name);
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-2xl md:text-3xl font-display text-slate-300 leading-snug" },
});
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-display']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-300']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-snug']} */ ;
(__VLS_ctx.profile.headline);
if (__VLS_ctx.profile.bio) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-slate-400 text-lg max-w-2xl leading-relaxed" },
    });
    /** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-w-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
    (__VLS_ctx.profile.bio);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-wrap gap-3 pt-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-2']} */ ;
const __VLS_0 = Button || Button;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    href: "#contact",
    variant: "primary",
    size: "lg",
}));
const __VLS_2 = __VLS_1({
    href: "#contact",
    variant: "primary",
    size: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
(__VLS_ctx.t('button.contactMe'));
// @ts-ignore
[t, t, profile, profile, profile, profile,];
var __VLS_3;
if (__VLS_ctx.profile.resume_url) {
    const __VLS_6 = Button || Button;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        href: (__VLS_ctx.profile.resume_url),
        variant: "outline",
        size: "lg",
    }));
    const __VLS_8 = __VLS_7({
        href: (__VLS_ctx.profile.resume_url),
        variant: "outline",
        size: "lg",
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    const { default: __VLS_11 } = __VLS_9.slots;
    (__VLS_ctx.t('button.downloadResume'));
    // @ts-ignore
    [t, profile, profile,];
    var __VLS_9;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "lg:col-span-5 flex justify-center lg:justify-end" },
});
/** @type {__VLS_StyleScopedClasses['lg:col-span-5']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:justify-end']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "absolute -inset-4 rounded-full bg-gradient-to-tr from-primary-500/30 via-accent-500/20 to-transparent blur-2xl" },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['-inset-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-tr']} */ ;
/** @type {__VLS_StyleScopedClasses['from-primary-500/30']} */ ;
/** @type {__VLS_StyleScopedClasses['via-accent-500/20']} */ ;
/** @type {__VLS_StyleScopedClasses['to-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['blur-2xl']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/10" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-64']} */ ;
/** @type {__VLS_StyleScopedClasses['h-64']} */ ;
/** @type {__VLS_StyleScopedClasses['md:w-80']} */ ;
/** @type {__VLS_StyleScopedClasses['md:h-80']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['border-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
if (__VLS_ctx.profile.avatar_url) {
    const __VLS_12 = LazyImage;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        src: (__VLS_ctx.profile.avatar_url),
        alt: (__VLS_ctx.profile.name ?? ''),
        containerClass: "w-full h-full",
        eager: true,
    }));
    const __VLS_14 = __VLS_13({
        src: (__VLS_ctx.profile.avatar_url),
        alt: (__VLS_ctx.profile.name ?? ''),
        containerClass: "w-full h-full",
        eager: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u0068\u002d\u0066\u0075\u006c\u006c\u0020\u0062\u0067\u002d\u0067\u0072\u0061\u0064\u0069\u0065\u006e\u0074\u002d\u0074\u006f\u002d\u0062\u0072\u0020\u0066\u0072\u006f\u006d\u002d\u0073\u0070\u0061\u0063\u0065\u002d\u0037\u0030\u0030\u0020\u0074\u006f\u002d\u0073\u0070\u0061\u0063\u0065\u002d\u0038\u0030\u0030\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u006c\u0065\u0078\u0020\u0069\u0074\u0065\u006d\u0073\u002d\u0063\u0065\u006e\u0074\u0065\u0072\u0020\u006a\u0075\u0073\u0074\u0069\u0066\u0079\u002d\u0063\u0065\u006e\u0074\u0065\u0072\u0020\u0074\u0065\u0078\u0074\u002d\u0035\u0078\u006c\u0020\u0066\u006f\u006e\u0074\u002d\u0064\u0069\u0073\u0070\u006c\u0061\u0079\u0020\u0074\u0065\u0078\u0074\u002d\u0070\u0072\u0069\u006d\u0061\u0072\u0079\u002d\u0033\u0030\u0030\u002f\u0036\u0030" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-gradient-to-br']} */ ;
    /** @type {__VLS_StyleScopedClasses['from-space-700']} */ ;
    /** @type {__VLS_StyleScopedClasses['to-space-800
    ']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-5xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-display']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-300/60']} */ ;
    (__VLS_ctx.initials);
}
// @ts-ignore
[profile, profile, profile, initials,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=Hero.vue.js.map