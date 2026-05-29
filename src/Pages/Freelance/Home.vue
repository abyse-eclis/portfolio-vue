<template>
    <FreelanceLayout>
        <Head>
            <title>{{ buildTitle(profile.tagline ?? profile.name ?? undefined) }}</title>
            <meta name="description" :content="buildDescription(profile.bio ?? undefined)" />
        </Head>

        <Hero :profile="profile" />
        <About :profile="profile" :projects-count="selectedProjects.length" />
        <PackageGrid :packages="packages" @select="onPackageSelect" />
        <SelectedProjects :projects="selectedProjects" />
        <ProcessTimeline :steps="processSteps" />
        <TestimonialCarousel v-if="testimonials.length" :testimonials="testimonials" />
        <ContactSection :selected-package="selectedPackage" />
    </FreelanceLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import FreelanceLayout from '@/Layouts/FreelanceLayout.vue';
import Hero from '@/Components/Freelance/Hero.vue';
import About from '@/Components/Freelance/About.vue';
import PackageGrid from '@/Components/Freelance/PackageGrid.vue';
import SelectedProjects from '@/Components/Freelance/SelectedProjects.vue';
import ProcessTimeline from '@/Components/Freelance/ProcessTimeline.vue';
import TestimonialCarousel from '@/Components/Freelance/TestimonialCarousel.vue';
import ContactSection from '@/Components/Freelance/ContactSection.vue';
import { useSeo } from '@/Composables/useSeo';
import type { FreelanceHomeProps } from '@/types/pages';

defineProps<FreelanceHomeProps>();
const { buildTitle, buildDescription } = useSeo();
const selectedPackage = ref<string | null>(null);

function onPackageSelect(slug: string) {
    selectedPackage.value = slug;
}
</script>
