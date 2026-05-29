<template>
    <div :class="['mb-12 md:mb-16', centered && 'text-center']">
        <p v-if="eyebrow" class="text-primary-400 text-xs font-semibold uppercase tracking-widest mb-3">
            {{ eyebrow }}
        </p>
        <h2 class="font-display font-bold text-3xl md:text-4xl text-white leading-tight">
            <slot />
        </h2>
        <p v-if="description" class="mt-4 text-slate-400 text-lg max-w-2xl" :class="centered && 'mx-auto'">
            {{ description }}
        </p>
        <div
            class="mt-5 h-0.5 w-14 rounded-full bg-primary-500"
            :class="centered && 'mx-auto'"
        />
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    eyebrow?: string;
    description?: string;
    centered?: boolean;
}>(), {
    centered: true,
});
</script>
