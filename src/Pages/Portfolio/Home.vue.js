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
import { useProjects } from '@/Composables/useProjects';
import { useCertificates } from '@/Composables/useCertificates';
const route = useRoute();
const filters = computed(() => ({
    tech: route.query.tech ?? null,
    type: route.query.type ?? null,
}));
const { portfolio: profile } = useProfile();
const { skills } = useSkills();
const { projects } = useProjects(filters);
const { certificates } = useCertificates();
const { applySeo } = useSeo();
watchEffect(() => applySeo(profile.value?.name ?? undefined, profile.value?.bio ?? undefined));
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
const __VLS_0 = PortfolioLayout || PortfolioLayout;
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
        projectsCount: (__VLS_ctx.projects.length),
    }));
    const __VLS_14 = __VLS_13({
        profile: (__VLS_ctx.profile),
        projectsCount: (__VLS_ctx.projects.length),
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
}
if (__VLS_ctx.skills.length) {
    const __VLS_17 = SkillGrid;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
        skills: (__VLS_ctx.skills),
    }));
    const __VLS_19 = __VLS_18({
        skills: (__VLS_ctx.skills),
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
}
const __VLS_22 = ProjectGrid;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
    projects: (__VLS_ctx.projects),
    currentTech: (__VLS_ctx.filters.tech),
}));
const __VLS_24 = __VLS_23({
    projects: (__VLS_ctx.projects),
    currentTech: (__VLS_ctx.filters.tech),
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
if (__VLS_ctx.certificates.length) {
    const __VLS_27 = CertificateGrid;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
        certificates: (__VLS_ctx.certificates),
    }));
    const __VLS_29 = __VLS_28({
        certificates: (__VLS_ctx.certificates),
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
}
const __VLS_32 = ContactSection;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({}));
const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
// @ts-ignore
[profile, profile, profile, projects, projects, skills, skills, filters, certificates, certificates,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=Home.vue.js.map