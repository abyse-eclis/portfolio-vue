import { ref, watch } from 'vue';
import Icon from './Icon.vue';
import { useFlash } from '@/Composables/useFlash';
const { flash, clear } = useFlash();
const visible = ref(false);
const message = ref('');
const kind = ref('success');
watch(() => [flash.success, flash.error], ([success, error]) => {
    if (success) {
        kind.value = 'success';
        message.value = success;
    }
    else if (error) {
        kind.value = 'error';
        message.value = error;
    }
    else {
        return;
    }
    visible.value = true;
    // Consume so it doesn't re-fire when another Toast instance mounts.
    clear();
    setTimeout(() => { visible.value = false; }, 5000);
}, { immediate: true });
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    enterActiveClass: "transition duration-200 ease-out",
    enterFromClass: "opacity-0 translate-y-2",
    enterToClass: "opacity-100 translate-y-0",
    leaveActiveClass: "transition duration-150 ease-in",
    leaveFromClass: "opacity-100 translate-y-0",
    leaveToClass: "opacity-0 translate-y-2",
}));
const __VLS_2 = __VLS_1({
    enterActiveClass: "transition duration-200 ease-out",
    enterFromClass: "opacity-0 translate-y-2",
    enterToClass: "opacity-100 translate-y-0",
    leaveActiveClass: "transition duration-150 ease-in",
    leaveFromClass: "opacity-100 translate-y-0",
    leaveToClass: "opacity-0 translate-y-2",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
if (__VLS_ctx.visible) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        role: "status",
        'aria-live': "polite",
        ...{ class: ([
                'fixed bottom-6 right-6 z-50 max-w-sm px-4 py-3 rounded-xl backdrop-blur-md border shadow-2xl',
                __VLS_ctx.kind === 'success'
                    ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-100'
                    : 'bg-red-500/15 border-red-400/40 text-red-100',
            ]) },
    });
    /** @type {__VLS_StyleScopedClasses['fixed']} */ ;
    /** @type {__VLS_StyleScopedClasses['bottom-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['right-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-w-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-2xl']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-start gap-3" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-start']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    const __VLS_6 = Icon;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        name: (__VLS_ctx.kind === 'success' ? 'check' : 'x'),
        size: (18),
        ...{ class: "mt-0.5 shrink-0" },
    }));
    const __VLS_8 = __VLS_7({
        name: (__VLS_ctx.kind === 'success' ? 'check' : 'x'),
        size: (18),
        ...{ class: "mt-0.5 shrink-0" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    /** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-sm flex-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    (__VLS_ctx.message);
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.visible))
                    return;
                __VLS_ctx.visible = false;
                // @ts-ignore
                [visible, visible, kind, kind, message,];
            } },
        type: "button",
        ...{ class: "ml-2 -mr-1 -mt-1 p-1 text-current/70 hover:text-current" },
        'aria-label': "Close",
    });
    /** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['-mr-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['-mt-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-current/70']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-current']} */ ;
    const __VLS_11 = Icon;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
        name: "x",
        size: (14),
    }));
    const __VLS_13 = __VLS_12({
        name: "x",
        size: (14),
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
}
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=Toast.vue.js.map