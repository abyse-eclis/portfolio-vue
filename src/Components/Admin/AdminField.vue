<template>
    <div class="space-y-1.5" :class="wide ? 'sm:col-span-2' : ''">
        <label class="block text-sm font-medium text-slate-300">
            {{ label }}<span v-if="required" class="text-rose-400"> *</span>
        </label>
        <slot />
    </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; required?: boolean; wide?: boolean }>();
</script>
