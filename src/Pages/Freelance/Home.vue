<template>
    <FreelanceLayout>
        <template v-if="profile">
            <Hero :profile="profile" />
            <About :profile="profile" :projects-count="selectedProjects.length" />
        </template>
        <PackageGrid v-if="packages.length" :packages="packages" @select="onPackageSelect" />
        <SelectedProjects v-if="selectedProjects.length" :projects="selectedProjects" />
        <ProcessTimeline v-if="processSteps.length" :steps="processSteps" />
        <TestimonialCarousel v-if="testimonials.length" :testimonials="testimonials" />
        <ContactSection :selected-package="selectedPackage" />
    </FreelanceLayout>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import FreelanceLayout from '@/Layouts/FreelanceLayout.vue';
import Hero from '@/Components/Freelance/Hero.vue';
import About from '@/Components/Freelance/About.vue';
import PackageGrid from '@/Components/Freelance/PackageGrid.vue';
import SelectedProjects from '@/Components/Freelance/SelectedProjects.vue';
import ProcessTimeline from '@/Components/Freelance/ProcessTimeline.vue';
import TestimonialCarousel from '@/Components/Freelance/TestimonialCarousel.vue';
import ContactSection from '@/Components/Freelance/ContactSection.vue';
import { useSeo } from '@/Composables/useSeo';
import { useProfile } from '@/Composables/useProfile';
import { usePackages } from '@/Composables/usePackages';
import { useFreelanceProjects } from '@/Composables/useFreelanceProjects';
import { useTestimonials } from '@/Composables/useTestimonials';
import { useProcessSteps } from '@/Composables/useProcessSteps';

const { freelance: profile } = useProfile();
const { packages } = usePackages();
const { selectedProjects } = useFreelanceProjects();
const { testimonials } = useTestimonials();
const { processSteps } = useProcessSteps();

const selectedPackage = ref<string | null>(null);
function onPackageSelect(slug: string) {
    selectedPackage.value = slug;
}

const { applySeo } = useSeo();
watchEffect(() =>
    applySeo(
        profile.value?.tagline ?? profile.value?.name ?? undefined,
        profile.value?.bio ?? undefined,
    ),
);
</script>
