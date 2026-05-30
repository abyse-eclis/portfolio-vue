import { createRouter, createWebHistory } from 'vue-router';
import { initAuth, session } from '@/Composables/useAuth';
// Pages are lazy-loaded so the dev server boots even while individual pages
// are still being migrated off Inertia. Mirrors the old Laravel routes:
//   routes/portfolio.php + routes/freelance.php
const routes = [
    { path: '/', name: 'portfolio.home', component: () => import('@/Pages/Portfolio/Home.vue') },
    { path: '/projects/:slug', name: 'portfolio.project', component: () => import('@/Pages/Portfolio/ProjectDetail.vue') },
    { path: '/freelance', name: 'freelance.home', component: () => import('@/Pages/Freelance/Home.vue') },
    { path: '/contact/thank-you', name: 'contact.thankYou', component: () => import('@/Pages/Contact/ThankYou.vue') },
    // --- Admin (gated by Supabase Auth — see beforeEach guard below) ---------
    { path: '/admin/login', name: 'admin.login', component: () => import('@/Pages/Admin/Login.vue') },
    { path: '/admin', name: 'admin.dashboard', component: () => import('@/Pages/Admin/Dashboard.vue'), meta: { requiresAuth: true } },
    { path: '/admin/profile', name: 'admin.profile', component: () => import('@/Pages/Admin/Profile.vue'), meta: { requiresAuth: true } },
    { path: '/admin/projects', name: 'admin.projects', component: () => import('@/Pages/Admin/Projects.vue'), meta: { requiresAuth: true } },
    { path: '/admin/certificates', name: 'admin.certificates', component: () => import('@/Pages/Admin/Certificates.vue'), meta: { requiresAuth: true } },
    { path: '/admin/skills', name: 'admin.skills', component: () => import('@/Pages/Admin/Skills.vue'), meta: { requiresAuth: true } },
    { path: '/admin/packages', name: 'admin.packages', component: () => import('@/Pages/Admin/Packages.vue'), meta: { requiresAuth: true } },
    { path: '/admin/process-steps', name: 'admin.processSteps', component: () => import('@/Pages/Admin/ProcessSteps.vue'), meta: { requiresAuth: true } },
    { path: '/admin/testimonials', name: 'admin.testimonials', component: () => import('@/Pages/Admin/Testimonials.vue'), meta: { requiresAuth: true } },
    { path: '/admin/social-links', name: 'admin.socialLinks', component: () => import('@/Pages/Admin/SocialLinks.vue'), meta: { requiresAuth: true } },
    { path: '/admin/contacts', name: 'admin.contacts', component: () => import('@/Pages/Admin/ContactSubmissions.vue'), meta: { requiresAuth: true } },
];
export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => ({ top: 0 }),
});
// Auth guard: resolve the session once, then block protected routes for guests
// and bounce logged-in users away from the login page.
router.beforeEach(async (to) => {
    await initAuth();
    if (to.meta.requiresAuth && !session.value) {
        return { name: 'admin.login', query: { redirect: to.fullPath } };
    }
    if (to.name === 'admin.login' && session.value) {
        return { name: 'admin.dashboard' };
    }
    return true;
});
//# sourceMappingURL=router.js.map