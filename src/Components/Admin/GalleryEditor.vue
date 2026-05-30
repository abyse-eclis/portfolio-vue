<template>
    <div class="space-y-3">
        <div
            v-for="(item, i) in items"
            :key="i"
            class="rounded-xl border border-white/10 bg-space-800/40 p-3"
        >
            <div class="flex items-start gap-3">
                <div class="flex-1 space-y-2">
                    <ImageUploader
                        :model-value="item.path"
                        folder="projects/gallery"
                        @update:model-value="(v) => update(i, 'path', v)"
                    />
                    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <input
                            :value="item.alt_th"
                            placeholder="คำอธิบายรูป (TH)"
                            class="admin-input"
                            @input="update(i, 'alt_th', ($event.target as HTMLInputElement).value)"
                        />
                        <input
                            :value="item.alt_en"
                            placeholder="Image alt (EN)"
                            class="admin-input"
                            @input="update(i, 'alt_en', ($event.target as HTMLInputElement).value)"
                        />
                    </div>
                </div>
                <button
                    type="button"
                    class="rounded-lg p-2 text-slate-400 hover:bg-rose-500/10 hover:text-rose-400"
                    title="ลบรูปนี้"
                    @click="removeAt(i)"
                >
                    <Icon name="x" :size="16" />
                </button>
            </div>
        </div>

        <button
            type="button"
            class="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-white/15 px-3 py-2 text-sm text-slate-300 hover:border-primary-500/40 hover:text-primary-300"
            @click="add"
        >
            <Icon name="arrow-down" :size="14" /> เพิ่มรูปในแกลเลอรี
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Icon from '@/Components/Shared/Icon.vue';
import ImageUploader from '@/Components/Admin/ImageUploader.vue';

interface GalleryItem {
    path: string | null;
    alt_th: string;
    alt_en: string;
}

const props = defineProps<{ modelValue: GalleryItem[] | null | undefined }>();
const emit = defineEmits<{ 'update:modelValue': [value: GalleryItem[]] }>();

const items = computed<GalleryItem[]>(() => props.modelValue ?? []);

function commit(next: GalleryItem[]) {
    emit('update:modelValue', next);
}

function add() {
    commit([...items.value, { path: null, alt_th: '', alt_en: '' }]);
}

function removeAt(i: number) {
    commit(items.value.filter((_, idx) => idx !== i));
}

function update(i: number, key: keyof GalleryItem, value: string | null) {
    commit(items.value.map((it, idx) => (idx === i ? { ...it, [key]: value } : it)));
}
</script>
