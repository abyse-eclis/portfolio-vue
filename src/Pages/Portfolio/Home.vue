<template>
    <PortfolioLayout>
        <Head>
            <title>{{ buildTitle(profile.name ?? undefined) }}</title>
            <meta name="description" :content="buildDescription(profile.bio ?? undefined)" />
        </Head>

        <Hero :profile="profile" />
        <About :profile="profile" :projects-count="projects.length" />
        <SkillGrid :skills="skills" />
        <ProjectGrid :projects="projects" :current-tech="filters.tech" />
        <CertificateGrid :certificates="certificates" />
        <ContactSection />
    </PortfolioLayout>
</template>

<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import PortfolioLayout from '@/Layouts/PortfolioLayout.vue';
import Hero from '@/Components/Portfolio/Hero.vue';
import About from '@/Components/Portfolio/About.vue';
import SkillGrid from '@/Components/Portfolio/SkillGrid.vue';
import ProjectGrid from '@/Components/Portfolio/ProjectGrid.vue';
import CertificateGrid from '@/Components/Portfolio/CertificateGrid.vue';
import ContactSection from '@/Components/Portfolio/ContactSection.vue';
import { useSeo } from '@/Composables/useSeo';
import type { PortfolioHomeProps } from '@/types/pages';

defineProps<PortfolioHomeProps>();
const { buildTitle, buildDescription } = useSeo();
</script>
