import { computed, ref } from 'vue';
import Icon from '@/Components/Shared/Icon.vue';
import { useImageUpload } from '@/Composables/useImageUpload';
import { useSupabaseImage } from '@/Composables/useSupabaseImage';
const props = withDefaults(defineProps(), { folder: 'uploads' });
const emit = defineEmits();
const { uploadFile, removeFile } = useImageUpload();
const { getPublicUrl } = useSupabaseImage();
const uploading = ref(false);
const error = ref(null);
const previewUrl = computed(() => getPublicUrl(props.modelValue));
async function onPick(e) {
    const input = e.target;
    const file = input.files?.[0];
    if (!file)
        return;
    uploading.value = true;
    error.value = null;
    const result = await uploadFile(file, props.folder);
    uploading.value = false;
    input.value = '';
    if (result.error) {
        error.value = result.error;
        return;
    }
    emit('update:modelValue', result.path);
    emit('meta', {
        orientation: result.orientation,
        width: result.width,
        height: result.height,
    });
}
async function clear() {
    await removeFile(props.modelValue);
    emit('update:modelValue', null);
}
const __VLS_defaults = { folder: 'uploads' };
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
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative flex items-center gap-4 rounded-xl border border-white/10 bg-space-800/50 p-3" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-space-800/50']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-space-700 flex items-center justify-center" },
});
/** @type {__VLS_StyleScopedClasses['h-20']} */ ;
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-space-700']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
if (__VLS_ctx.previewUrl) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        src: (__VLS_ctx.previewUrl),
        alt: "",
        ...{ class: "h-full w-full object-cover" },
    });
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
}
else {
    const __VLS_0 = Icon;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        name: "layers",
        size: (24),
        ...{ class: "text-slate-600" },
    }));
    const __VLS_2 = __VLS_1({
        name: "layers",
        size: (24),
        ...{ class: "text-slate-600" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {__VLS_StyleScopedClasses['text-slate-600']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "min-w-0 flex-1 space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-primary-500/15 px-3 py-1.5 text-sm font-medium text-primary-300 hover:bg-primary-500/25" },
});
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary-500/15']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-300']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-primary-500/25']} */ ;
const __VLS_5 = Icon;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    name: "arrow-up",
    size: (14),
}));
const __VLS_7 = __VLS_6({
    name: "arrow-up",
    size: (14),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
(__VLS_ctx.uploading ? 'กำลังอัปโหลด…' : 'เลือกรูป');
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onChange: (__VLS_ctx.onPick) },
    type: "file",
    accept: "image/*",
    ...{ class: "hidden" },
    disabled: (__VLS_ctx.uploading),
});
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
if (__VLS_ctx.modelValue) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "truncate text-xs text-slate-400" },
        title: (__VLS_ctx.modelValue),
    });
    /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
    (__VLS_ctx.modelValue);
}
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-xs text-rose-400" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-rose-400']} */ ;
    (__VLS_ctx.error);
}
if (__VLS_ctx.modelValue && !__VLS_ctx.uploading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.clear) },
        type: "button",
        ...{ class: "text-xs text-slate-400 hover:text-rose-400" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-rose-400']} */ ;
}
// @ts-ignore
[previewUrl, previewUrl, uploading, uploading, uploading, onPick, modelValue, modelValue, modelValue, modelValue, error, error, clear,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=ImageUploader.vue.js.map