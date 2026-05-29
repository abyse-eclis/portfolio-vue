<template>
    <section id="projects" class="py-20 md:py-28 bg-space-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading :eyebrow="t('sections.projects.eyebrow')">
                {{ t('sections.projects.title') }}
            </SectionHeading>

            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import SectionHeading from '@/Components/Shared/SectionHeading.vue';
import ProjectCard from '@/Components/Portfolio/ProjectCard.vue';
import { useI18n } from '@/i18n';
import type { ProjectCardData } from '@/types/pages';

defineProps<{ projects: ProjectCardData[] }>();
const { t } = useI18n();
</script>
