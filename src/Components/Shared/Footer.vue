<template>
    <footer class="border-t border-white/5 bg-space-900/60 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            <!-- Top row -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

                <!-- Brand -->
                <div>
                    <a :href="homeUrl" class="font-display font-bold text-xl text-white tracking-tight">
                        Dev<span class="text-primary-400">Folio</span>
                    </a>
                    <p class="mt-3 text-sm text-slate-500 leading-relaxed max-w-xs">
                        {{ isPortfolio
                            ? (sharedProfile?.headline ?? (locale === 'th'
                                ? 'นักพัฒนา Full-stack ที่หลงรักการสร้างประสบการณ์ดิจิทัล'
                                : 'Full-stack developer crafting digital experiences.'))
                            : (locale === 'th'
                                ? 'พร้อมช่วยให้ธุรกิจของคุณเติบโตด้วยเทคโนโลยีที่ใช่'
                                : 'Ready to help your business grow with the right technology.')
                        }}
                    </p>
                </div>

                <!-- Nav -->
                <div>
                    <p class="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                        {{ t('footer.nav') }}
                    </p>
                    <ul class="space-y-2">
                        <li v-for="link in navLinks" :key="link.key">
                            <a
                                :href="link.href"
                                class="text-sm text-slate-400 hover:text-primary-400 transition-colors"
                            >
                                {{ link.label }}
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Social -->
                <div>
                    <p class="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                        {{ t('footer.connect') }}
                    </p>
                    <div class="flex flex-wrap gap-3">
                        <a
                            v-for="link in socialLinks"
                            :key="link.platform"
                            :href="link.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            :aria-label="link.platform"
                            class="p-2 rounded-lg text-slate-400 hover:text-primary-400
                                   hover:bg-white/5 transition-all"
                        >
                            <Icon :name="platformIcon(link.platform)" :size="18" />
                        </a>
                    </div>
                </div>
            </div>

            <!-- Bottom row -->
            <div class="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p class="text-xs text-slate-600">
                    © {{ currentYear }} DevFolio. {{ t('footer.allRights') }}
                </p>
                <p class="text-xs text-slate-600">
                    {{ t('footer.builtWith') }}
                    <span class="text-slate-500">Laravel · Vue · Inertia · Tailwind</span>
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useSiteMode } from '@/Composables/useSiteMode';
import { useI18n } from '@/i18n';
import Icon from './Icon.vue';
import type { SharedProps } from '@/types';

const { isPortfolio } = useSiteMode();
const { t, locale } = useI18n();
const page = usePage<SharedProps>();

const homeUrl = computed(() => isPortfolio.value ? '/' : '/freelance');
const sharedProfile = computed(() => page.props.shared?.profile);
const socialLinks    = computed(() => page.props.shared?.socialLinks ?? []);
const currentYear    = new Date().getFullYear();

type IconName = 'github' | 'linkedin' | 'twitter' | 'facebook' | 'instagram' | 'youtube' | 'mail' | 'globe';
const iconMap: Record<string, IconName> = {
    github: 'github', linkedin: 'linkedin', twitter: 'twitter',
    x: 'twitter', facebook: 'facebook', instagram: 'instagram',
    youtube: 'youtube', email: 'mail', website: 'globe',
};

function platformIcon(platform: string): IconName {
    return iconMap[platform.toLowerCase()] ?? 'globe';
}

const portfolioLinks = computed(() => [
    { key: 'about',        href: '#about',        label: t('nav.about') },
    { key: 'skills',       href: '#skills',       label: t('nav.skills') },
    { key: 'projects',     href: '#projects',     label: t('nav.projects') },
    { key: 'contact',      href: '#contact',      label: t('nav.contact') },
]);

const freelanceLinks = computed(() => [
    { key: 'packages',     href: '#packages',     label: t('nav.packages') },
    { key: 'projects',     href: '#projects',     label: t('nav.projects') },
    { key: 'process',      href: '#process',      label: t('nav.process') },
    { key: 'contact',      href: '#contact',      label: t('nav.contact') },
]);

const navLinks = computed(() => isPortfolio.value ? portfolioLinks.value : freelanceLinks.value);
</script>
