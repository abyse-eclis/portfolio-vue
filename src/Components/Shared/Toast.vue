<template>
    <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-2"
    >
        <div
            v-if="visible"
            role="status"
            aria-live="polite"
            :class="[
                'fixed bottom-6 right-6 z-50 max-w-sm px-4 py-3 rounded-xl backdrop-blur-md border shadow-2xl',
                kind === 'success'
                    ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-100'
                    : 'bg-red-500/15 border-red-400/40 text-red-100',
            ]"
        >
            <div class="flex items-start gap-3">
                <Icon :name="kind === 'success' ? 'check' : 'x'" :size="18" class="mt-0.5 shrink-0" />
                <p class="text-sm flex-1">{{ message }}</p>
                <button
                    type="button"
                    @click="visible = false"
                    class="ml-2 -mr-1 -mt-1 p-1 text-current/70 hover:text-current"
                    aria-label="Close"
                >
                    <Icon name="x" :size="14" />
                </button>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import Icon from './Icon.vue';
import type { SharedProps } from '@/types';

const page = usePage();
const visible = ref(false);
const message = ref('');
const kind = ref<'success' | 'error'>('success');

const flash = computed(() => page.props.flash as SharedProps['flash'] | undefined);

watch(
    () => flash.value,
    (f) => {
        if (!f) return;
        if (f.success) {
            kind.value = 'success';
            message.value = f.success;
            visible.value = true;
            setTimeout(() => { visible.value = false; }, 5000);
        } else if (f.error) {
            kind.value = 'error';
            message.value = f.error;
            visible.value = true;
            setTimeout(() => { visible.value = false; }, 5000);
        }
    },
    { immediate: true, deep: true },
);
</script>
