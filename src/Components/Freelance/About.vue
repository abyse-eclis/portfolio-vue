<template>
    <section id="about" class="py-20 md:py-28 bg-space-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading :eyebrow="t('about.title')">
                {{ profile.name }}
            </SectionHeading>

            <div class="grid lg:grid-cols-3 gap-6">
                <div
                    v-for="stat in stats"
                    :key="stat.label"
                    class="p-6 rounded-2xl bg-space-800/40 border border-white/5 text-center"
                >
                    <div class="font-display text-4xl text-accent-300 font-bold">{{ stat.value }}</div>
                    <div class="text-sm text-slate-400 mt-2">{{ stat.label }}</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SectionHeading from '@/Components/Shared/SectionHeading.vue';
import { useI18n } from '@/i18n';
import type { ProfileFreelance } from '@/types/pages';

const props = defineProps<{
    profile: ProfileFreelance;
    projectsCount?: number;
}>();

const { t } = useI18n();

const stats = computed(() => [
    { label: t('about.yearsExperience'), value: `${props.profile.years_experience ?? 0}+` },
    { label: t('about.projectsDelivered'), value: `${props.projectsCount ?? 0}+` },
    { label: t('about.clientsHelped'), value: '—' },
]);
</script>
