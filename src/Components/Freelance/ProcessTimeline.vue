<template>
    <section id="process" class="py-20 md:py-28 bg-space-900">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading :eyebrow="t('sections.process.eyebrow')">
                {{ t('sections.process.title') }}
            </SectionHeading>

            <ol class="relative space-y-10 ml-4 md:ml-6 pl-8 border-l-2 border-accent-500/30">
                <li v-for="step in steps" :key="step.id" class="relative">
                    <div
                        class="absolute -left-[2.4rem] md:-left-[2.7rem] top-0 w-10 h-10 rounded-full bg-accent-500 text-white font-bold flex items-center justify-center shadow-lg shadow-accent-500/30"
                    >
                        {{ step.step_number }}
                    </div>
                    <h3 class="font-display text-xl text-white mb-2">{{ step.title }}</h3>
                    <p class="text-slate-300 leading-relaxed">{{ step.description }}</p>
                </li>
            </ol>
        </div>
    </section>
</template>

<script setup lang="ts">
import SectionHeading from '@/Components/Shared/SectionHeading.vue';
import { useI18n } from '@/i18n';
import type { ProcessStepData } from '@/types/pages';

defineProps<{ steps: ProcessStepData[] }>();
const { t } = useI18n();
</script>
