<template>
    <div class="fixed inset-0 -z-10 overflow-hidden bg-space-900" aria-hidden="true">
        <div class="absolute inset-0 bg-gradient-to-b from-space-900 via-space-950 to-space-900" />
        <div
            class="absolute -top-32 left-1/3 w-[60vw] h-[60vw] rounded-full opacity-20 blur-3xl"
            :style="{ background: 'radial-gradient(circle, rgba(124,58,237,.45), transparent 60%)' }"
        />
        <div
            class="absolute -bottom-40 right-1/4 w-[55vw] h-[55vw] rounded-full opacity-15 blur-3xl"
            :style="{ background: 'radial-gradient(circle, rgba(244,114,182,.4), transparent 60%)' }"
        />
        <StarField :star-count="900" :speed="0.0003" color="#c4b5fd" />
    </div>
</template>

<script setup lang="ts">
import StarField from './StarField.vue';
</script>
