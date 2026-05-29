<template>
    <section id="about" class="py-20 md:py-28 bg-space-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading :eyebrow="t('about.title')" :centered="false">
                {{ profile.headline }}
            </SectionHeading>

            <div class="grid lg:grid-cols-12 gap-12 items-start">
                <div class="lg:col-span-7 space-y-5 text-slate-300 text-lg leading-relaxed">
                    <p v-if="profile.bio">{{ profile.bio }}</p>
                </div>

                <div class="lg:col-span-5 grid grid-cols-3 gap-4">
                    <div
                        v-for="stat in stats"
                        :key="stat.label"
                        class="text-center p-5 rounded-xl bg-space-800/60 border border-white/5"
                    >
                        <div class="font-display text-3xl md:text-4xl text-primary-300 font-bold">
                            {{ stat.value }}
                        </div>
                        <div class="text-xs text-slate-400 mt-1">{{ stat.label }}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SectionHeading from '@/Components/Shared/SectionHeading.vue';
import { useI18n } from '@/i18n';
import type { ProfilePortfolio } from '@/types/pages';

const props = defineProps<{
    profile: ProfilePortfolio;
    projectsCount?: number;
}>();

const { t } = useI18n();

const stats = computed(() => [
    { label: t('about.yearsExperience'), value: `${props.profile.years_experience ?? 0}+` },
    { label: t('about.projectsDelivered'), value: `${props.projectsCount ?? 0}+` },
    { label: t('about.clientsHelped'), value: '—' },
]);
</script>
