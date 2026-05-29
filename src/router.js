import { createRouter, createWebHistory } from 'vue-router';
// Pages are lazy-loaded so the dev server boots even while individual pages
// are still being migrated off Inertia. Mirrors the old Laravel routes:
//   routes/portfolio.php + routes/freelance.php
const routes = [
    { path: '/', name: 'portfolio.home', component: () => import('@/Pages/Portfolio/Home.vue') },
    { path: '/projects/:slug', name: 'portfolio.project', component: () => import('@/Pages/Portfolio/ProjectDetail.vue') },
    { path: '/freelance', name: 'freelance.home', component: () => import('@/Pages/Freelance/Home.vue') },
    { path: '/contact/thank-you', name: 'contact.thankYou', component: () => import('@/Pages/Contact/ThankYou.vue') },
];
export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => ({ top: 0 }),
});
//# sourceMappingURL=router.js.map