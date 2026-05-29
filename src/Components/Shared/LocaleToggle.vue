<template>
    <button
        @click="toggle"
        class="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg
               text-slate-400 hover:text-primary-400 hover:bg-white/5
               transition-all duration-200 focus-visible:outline-none focus-visible:ring-2
               focus-visible:ring-primary-400"
        :aria-label="`Switch to ${locale === 'en' ? 'Thai' : 'English'}`"
    >
        <span class="opacity-50">{{ locale === 'en' ? 'TH' : 'EN' }}</span>
        <span class="text-slate-200">|</span>
        <span class="text-primary-400">{{ locale === 'en' ? 'EN' : 'TH' }}</span>
    </button>
</template>

<script setup lang="ts">
import { useLocale } from '@/Composables/useLocale';
import type { Locale } from '@/types';

const { locale, switchLocale } = useLocale();

function toggle() {
    switchLocale(locale.value === 'en' ? 'th' as Locale : 'en' as Locale);
}
</script>
