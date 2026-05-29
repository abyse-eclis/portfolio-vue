import { ref, onMounted, watch } from 'vue';
const props = withDefaults(defineProps(), {
    eager: false,
});
const imgEl = ref(null);
const isLoaded = ref(false);
function load() {
    if (!imgEl.value || !props.src)
        return;
    imgEl.value.onload = () => { isLoaded.value = true; };
    imgEl.value.src = props.src;
}
onMounted(() => {
    if (!imgEl.value)
        return;
    if (props.eager) {
        load();
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            load();
            observer.disconnect();
        }
    }, { rootMargin: '200px' });
    observer.observe(imgEl.value);
});
watch(() => props.src, () => {
    isLoaded.value = false;
    load();
});
const __VLS_defaults = {
    eager: false,
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (['relative overflow-hidden', __VLS_ctx.containerClass]) },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.img)({
    ref: "imgEl",
    alt: (__VLS_ctx.alt),
    ...{ class: ([
            'transition-opacity duration-500 w-full h-full object-cover',
            __VLS_ctx.isLoaded ? 'opacity-100' : 'opacity-0',
            __VLS_ctx.imgClass,
        ]) },
});
/** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
if (!__VLS_ctx.isLoaded) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: (['absolute inset-0 bg-space-700 animate-pulse', __VLS_ctx.placeholderClass]) },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-space-700']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
}
// @ts-ignore
[containerClass, alt, isLoaded, isLoaded, imgClass, placeholderClass,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=LazyImage.vue.js.map