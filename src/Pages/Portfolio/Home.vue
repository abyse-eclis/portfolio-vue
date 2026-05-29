<template>
    <PortfolioLayout>
        <template v-if="profile">
            <Hero :profile="profile" />
            <About :profile="profile" :projects-count="projects.length" />
        </template>
        <SkillGrid v-if="skills.length" :skills="skills" />
        <ProjectGrid :projects="projects" :current-tech="filters.tech" />
        <CertificateGrid v-if="certificates.length" :certificates="certificates" />
        <ContactSection />
    </PortfolioLayout>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import PortfolioLayout from '@/Layouts/PortfolioLayout.vue';
import Hero from '@/Components/Portfolio/Hero.vue';
import About from '@/Components/Portfolio/About.vue';
import SkillGrid from '@/Components/Portfolio/SkillGrid.vue';
import ProjectGrid from '@/Components/Portfolio/ProjectGrid.vue';
import CertificateGrid from '@/Components/Portfolio/CertificateGrid.vue';
import ContactSection from '@/Components/Portfolio/ContactSection.vue';
import { useSeo } from '@/Composables/useSeo';
import { useProfile } from '@/Composables/useProfile';
import { useSkills } from '@/Composables/useSkills';
import { useProjects, type ProjectFilters } from '@/Composables/useProjects';
import { useCertificates } from '@/Composables/useCertificates';

const route = useRoute();
const filters = computed<ProjectFilters>(() => ({
    tech: (route.query.tech as string) ?? null,
    type: (route.query.type as string) ?? null,
}));

const { portfolio: profile } = useProfile();
const { skills } = useSkills();
const { projects } = useProjects(filters);
const { certificates } = useCertificates();

const { applySeo } = useSeo();
watchEffect(() => applySeo(profile.value?.name ?? undefined, profile.value?.bio ?? undefined));
</script>
