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
const selectedPackage = ref(null);
function onPackageSelect(slug) {
    selectedPackage.value = slug;
}
const { applySeo } = useSeo();
watchEffect(() => applySeo(profile.value?.tagline ?? profile.value?.name ?? undefined, profile.value?.bio ?? undefined));
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
const __VLS_0 = FreelanceLayout || FreelanceLayout;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
if (__VLS_ctx.profile) {
    const __VLS_7 = Hero;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        profile: (__VLS_ctx.profile),
    }));
    const __VLS_9 = __VLS_8({
        profile: (__VLS_ctx.profile),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const __VLS_12 = About;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        profile: (__VLS_ctx.profile),
        projectsCount: (__VLS_ctx.selectedProjects.length),
    }));
    const __VLS_14 = __VLS_13({
        profile: (__VLS_ctx.profile),
        projectsCount: (__VLS_ctx.selectedProjects.length),
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
}
if (__VLS_ctx.packages.length) {
    const __VLS_17 = PackageGrid;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
        ...{ 'onSelect': {} },
        packages: (__VLS_ctx.packages),
    }));
    const __VLS_19 = __VLS_18({
        ...{ 'onSelect': {} },
        packages: (__VLS_ctx.packages),
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    let __VLS_22;
    const __VLS_23 = ({ select: {} },
        { onSelect: (__VLS_ctx.onPackageSelect) });
    var __VLS_20;
    var __VLS_21;
}
if (__VLS_ctx.selectedProjects.length) {
    const __VLS_24 = SelectedProjects;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
        projects: (__VLS_ctx.selectedProjects),
    }));
    const __VLS_26 = __VLS_25({
        projects: (__VLS_ctx.selectedProjects),
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
}
if (__VLS_ctx.processSteps.length) {
    const __VLS_29 = ProcessTimeline;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
        steps: (__VLS_ctx.processSteps),
    }));
    const __VLS_31 = __VLS_30({
        steps: (__VLS_ctx.processSteps),
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
}
if (__VLS_ctx.testimonials.length) {
    const __VLS_34 = TestimonialCarousel;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
        testimonials: (__VLS_ctx.testimonials),
    }));
    const __VLS_36 = __VLS_35({
        testimonials: (__VLS_ctx.testimonials),
    }, ...__VLS_functionalComponentArgsRest(__VLS_35));
}
const __VLS_39 = ContactSection;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
    selectedPackage: (__VLS_ctx.selectedPackage),
}));
const __VLS_41 = __VLS_40({
    selectedPackage: (__VLS_ctx.selectedPackage),
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
// @ts-ignore
[profile, profile, profile, selectedProjects, selectedProjects, selectedProjects, packages, packages, onPackageSelect, processSteps, processSteps, testimonials, testimonials, selectedPackage,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=Home.vue.js.map