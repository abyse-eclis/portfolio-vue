import { computed } from 'vue';
import Icon from '@/Components/Shared/Icon.vue';
import ImageUploader from '@/Components/Admin/ImageUploader.vue';
const props = defineProps();
const emit = defineEmits();
const items = computed(() => props.modelValue ?? []);
function commit(next) {
    emit('update:modelValue', next);
}
function add() {
    commit([...items.value, { path: null, alt_th: '', alt_en: '' }]);
}
function removeAt(i) {
    commit(items.value.filter((_, idx) => idx !== i));
}
function update(i, key, value) {
    commit(items.value.map((it, idx) => (idx === i ? { ...it, [key]: value } : it)));
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-3" },
});
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
for (const [item, i] of __VLS_vFor((__VLS_ctx.items))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (i),
        ...{ class: "rounded-xl border border-white/10 bg-space-800/40 p-3" },
    });
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-space-800/40']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-start gap-3" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-start']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 space-y-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    const __VLS_0 = ImageUploader;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ 'onUpdate:modelValue': {} },
        modelValue: (item.path),
        folder: "projects/gallery",
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onUpdate:modelValue': {} },
        modelValue: (item.path),
        folder: "projects/gallery",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = ({ 'update:modelValue': {} },
        { 'onUpdate:modelValue': ((v) => __VLS_ctx.update(i, 'path', v)) });
    var __VLS_3;
    var __VLS_4;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-1 gap-2 sm:grid-cols-2" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onInput: (...[$event]) => {
                __VLS_ctx.update(i, 'alt_th', $event.target.value);
                // @ts-ignore
                [items, update, update,];
            } },
        value: (item.alt_th),
        placeholder: "คำอธิบายรูป (TH)",
        ...{ class: "admin-input" },
    });
    /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onInput: (...[$event]) => {
                __VLS_ctx.update(i, 'alt_en', $event.target.value);
                // @ts-ignore
                [update,];
            } },
        value: (item.alt_en),
        placeholder: "Image alt (EN)",
        ...{ class: "admin-input" },
    });
    /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.removeAt(i);
                // @ts-ignore
                [removeAt,];
            } },
        type: "button",
        ...{ class: "rounded-lg p-2 text-slate-400 hover:bg-rose-500/10 hover:text-rose-400" },
        title: "ลบรูปนี้",
    });
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-rose-500/10']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-rose-400']} */ ;
    const __VLS_7 = Icon;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        name: "x",
        size: (16),
    }));
    const __VLS_9 = __VLS_8({
        name: "x",
        size: (16),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.add) },
    type: "button",
    ...{ class: "inline-flex items-center gap-1.5 rounded-lg border border-dashed border-white/15 px-3 py-2 text-sm text-slate-300 hover:border-primary-500/40 hover:text-primary-300" },
});
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-dashed']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/15']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-300']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border-primary-500/40']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary-300']} */ ;
const __VLS_12 = Icon;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    name: "arrow-down",
    size: (14),
}));
const __VLS_14 = __VLS_13({
    name: "arrow-down",
    size: (14),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
// @ts-ignore
[add,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
//# sourceMappingURL=GalleryEditor.vue.js.map