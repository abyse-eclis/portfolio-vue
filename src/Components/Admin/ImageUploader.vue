<template>
    <div class="space-y-2">
        <div
            class="relative flex items-center gap-4 rounded-xl border border-white/10 bg-space-800/50 p-3"
        >
            <div
                class="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-space-700 flex items-center justify-center"
            >
                <img v-if="previewUrl" :src="previewUrl" alt="" class="h-full w-full object-cover" />
                <Icon v-else name="layers" :size="24" class="text-slate-600" />
            </div>

            <div class="min-w-0 flex-1 space-y-1.5">
                <label
                    class="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-primary-500/15 px-3 py-1.5 text-sm font-medium text-primary-300 hover:bg-primary-500/25"
                >
                    <Icon name="arrow-up" :size="14" />
                    {{ uploading ? 'กำลังอัปโหลด…' : 'เลือกรูป' }}
                    <input
                        type="file"
                        accept="image/*"
                        class="hidden"
                        :disabled="uploading"
                        @change="onPick"
                    />
                </label>
                <p v-if="modelValue" class="truncate text-xs text-slate-400" :title="modelValue">
                    {{ modelValue }}
                </p>
                <p v-if="error" class="text-xs text-rose-400">{{ error }}</p>
                <button
                    v-if="modelValue && !uploading"
                    type="button"
                    class="text-xs text-slate-400 hover:text-rose-400"
                    @click="clear"
                >
                    ลบรูป
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Icon from '@/Components/Shared/Icon.vue';
import { useImageUpload, type Orientation } from '@/Composables/useImageUpload';
import { useSupabaseImage } from '@/Composables/useSupabaseImage';

const props = withDefaults(
    defineProps<{
        modelValue: string | null;
        folder?: string;
    }>(),
    { folder: 'uploads' },
);

const emit = defineEmits<{
    'update:modelValue': [value: string | null];
    meta: [meta: { orientation: Orientation; width: number; height: number }];
}>();

const { uploadFile, removeFile } = useImageUpload();
const { getPublicUrl } = useSupabaseImage();

const uploading = ref(false);
const error = ref<string | null>(null);

const previewUrl = computed(() => getPublicUrl(props.modelValue));

async function onPick(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

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
</script>
