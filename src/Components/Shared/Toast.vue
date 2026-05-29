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
import { ref, watch } from 'vue';
import Icon from './Icon.vue';
import { useFlash } from '@/Composables/useFlash';

const { flash, clear } = useFlash();
const visible = ref(false);
const message = ref('');
const kind = ref<'success' | 'error'>('success');

watch(
    () => [flash.success, flash.error] as const,
    ([success, error]) => {
        if (success) {
            kind.value = 'success';
            message.value = success;
        } else if (error) {
            kind.value = 'error';
            message.value = error;
        } else {
            return;
        }
        visible.value = true;
        // Consume so it doesn't re-fire when another Toast instance mounts.
        clear();
        setTimeout(() => { visible.value = false; }, 5000);
    },
    { immediate: true },
);
</script>
