<template>
    <section id="projects" ref="root" class="py-20 md:py-28 bg-space-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading :eyebrow="t('sections.projects.eyebrow')">
                {{ t('sections.projects.title') }}
            </SectionHeading>

            <ProjectFilter v-if="techs.length" :techs="techs" :current-tech="currentTech" />

            <div v-if="projects.length" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="project in projects" :key="project.id" data-anim="project">
                    <ProjectCard :project="project" />
                </div>
            </div>

            <div v-else class="text-center py-16 text-slate-400">
                {{ t('common.loading') }}
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import SectionHeading from '@/Components/Shared/SectionHeading.vue';
import ProjectCard from './ProjectCard.vue';
import ProjectFilter from './ProjectFilter.vue';
import { useI18n } from '@/i18n';
import { useGsapAnim } from '@/Composables/useGsapAnim';
import type { ProjectCardData } from '@/types/pages';

const props = defineProps<{
    projects: ProjectCardData[];
    currentTech: string | null;
}>();

const { t } = useI18n();
const root = ref<HTMLElement | null>(null);
const { fadeUp } = useGsapAnim();

const techs = computed(() => {
    const all = new Set<string>();
    props.projects.forEach((p) => p.tech_stack.forEach((tech) => all.add(tech)));
    return Array.from(all).sort();
});

onMounted(() => {
    fadeUp(root.value, { selector: '[data-anim="project"]', stagger: 0.07 });
});

watch(() => props.projects, () => {
    if (!root.value) return;
    fadeUp(root.value, { selector: '[data-anim="project"]', stagger: 0.05, duration: 0.5 });
});
</script>
