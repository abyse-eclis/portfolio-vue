import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    variant: 'primary',
    size: 'md',
    disabled: false,
});
const tag = computed(() => props.as ?? (props.href ? 'a' : 'button'));
const variantClasses = computed(() => ({
    primary: 'bg-primary-500 hover:bg-primary-400 text-space-900 font-semibold shadow-lg hover:shadow-primary-500/30 hover:shadow-xl',
    secondary: 'bg-accent-500 hover:bg-accent-400 text-white font-semibold shadow-lg hover:shadow-accent-500/30 hover:shadow-xl',
    ghost: 'text-primary-400 hover:text-primary-300 hover:bg-white/5',
    outline: 'border border-primary-500/40 text-primary-400 hover:border-primary-400 hover:bg-primary-500/10',
}[props.variant]));
const sizeClasses = computed(() => ({
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
}[props.size]));
const __VLS_defaults = {
    variant: 'primary',
    size: 'md',
    disabled: false,
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
const __VLS_0 = (__VLS_ctx.tag);
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    href: (__VLS_ctx.href),
    ...{ class: ([
            'inline-flex items-center justify-center gap-2 font-medium rounded-xl',
            'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-space-900',
            __VLS_ctx.variantClasses,
            __VLS_ctx.sizeClasses,
            __VLS_ctx.disabled && 'opacity-50 pointer-events-none cursor-not-allowed',
        ]) },
    disabled: (__VLS_ctx.tag === 'button' ? __VLS_ctx.disabled : undefined),
}));
const __VLS_2 = __VLS_1({
    href: (__VLS_ctx.href),
    ...{ class: ([
            'inline-flex items-center justify-center gap-2 font-medium rounded-xl',
            'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-space-900',
            __VLS_ctx.variantClasses,
            __VLS_ctx.sizeClasses,
            __VLS_ctx.disabled && 'opacity-50 pointer-events-none cursor-not-allowed',
        ]) },
    disabled: (__VLS_ctx.tag === 'button' ? __VLS_ctx.disabled : undefined),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
(__VLS_ctx.$attrs);
var __VLS_5;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:ring-primary-400']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:ring-offset-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:ring-offset-space-900']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
var __VLS_7 = {};
// @ts-ignore
[tag, tag, href, variantClasses, sizeClasses, disabled, disabled, $attrs,];
var __VLS_3;
// @ts-ignore
var __VLS_8 = __VLS_7;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=Button.vue.js.map