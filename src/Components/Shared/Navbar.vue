<template>
    <header
        :class="[
            'fixed top-0 inset-x-0 z-50 transition-all duration-300',
            scrolled
                ? 'bg-space-900/90 backdrop-blur-md border-b border-white/5 shadow-xl shadow-black/20'
                : 'bg-transparent',
        ]"
    >
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">

                <!-- Logo -->
                <a :href="homeUrl" class="font-display font-bold text-xl text-white tracking-tight">
                    Dev<span class="text-primary-400">Folio</span>
                </a>

                <!-- Desktop nav links -->
                <div class="hidden md:flex items-center gap-1">
                    <a
                        v-for="link in navLinks"
                        :key="link.key"
                        :href="link.href"
                        class="px-3 py-2 text-sm text-slate-400 hover:text-white rounded-lg
                               hover:bg-white/5 transition-all duration-150"
                    >
                        {{ link.label }}
                    </a>
                </div>

                <!-- Right actions -->
                <div class="flex items-center gap-2">
                    <LocaleToggle />

                    <!-- Mobile menu toggle -->
                    <button
                        @click="menuOpen = !menuOpen"
                        class="md:hidden p-2 -mr-1 text-slate-400 hover:text-white
                               rounded-lg hover:bg-white/5 transition-all"
                        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
                        :aria-expanded="menuOpen"
                    >
                        <Icon :name="menuOpen ? 'x' : 'menu'" :size="20" />
                    </button>
                </div>
            </div>

            <!-- Mobile menu -->
            <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
            >
                <div
                    v-if="menuOpen"
                    class="md:hidden py-3 border-t border-white/5 space-y-1"
                >
                    <a
                        v-for="link in navLinks"
                        :key="link.key"
                        :href="link.href"
                        class="block px-3 py-2.5 text-sm text-slate-400 hover:text-white
                               rounded-lg hover:bg-white/5 transition-all"
                        @click="menuOpen = false"
                    >
                        {{ link.label }}
                    </a>
                </div>
            </Transition>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useSiteMode } from '@/Composables/useSiteMode';
import { useI18n } from '@/i18n';
import Icon from './Icon.vue';
import LocaleToggle from './LocaleToggle.vue';

const { isPortfolio } = useSiteMode();
const { t } = useI18n();

const homeUrl = computed(() => isPortfolio.value ? '/' : '/freelance');

const scrolled = ref(false);
const menuOpen = ref(false);

function onScroll() {
    scrolled.value = window.scrollY > 20;
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', onScroll));

const portfolioLinks = computed(() => [
    { key: 'about',        href: '#about',        label: t('nav.about') },
    { key: 'skills',       href: '#skills',       label: t('nav.skills') },
    { key: 'projects',     href: '#projects',     label: t('nav.projects') },
    { key: 'certificates', href: '#certificates', label: t('nav.certificates') },
    { key: 'contact',      href: '#contact',      label: t('nav.contact') },
]);

const freelanceLinks = computed(() => [
    { key: 'about',        href: '#about',        label: t('nav.about') },
    { key: 'packages',     href: '#packages',     label: t('nav.packages') },
    { key: 'projects',     href: '#projects',     label: t('nav.projects') },
    { key: 'process',      href: '#process',      label: t('nav.process') },
    { key: 'testimonials', href: '#testimonials', label: t('nav.testimonials') },
    { key: 'contact',      href: '#contact',      label: t('nav.contact') },
]);

const navLinks = computed(() => isPortfolio.value ? portfolioLinks.value : freelanceLinks.value);
</script>
