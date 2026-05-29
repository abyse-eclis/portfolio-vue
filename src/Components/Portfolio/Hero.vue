<template>
    <section
        id="hero"
        class="relative min-h-[88vh] flex items-center overflow-hidden"
    >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 md:py-32">
            <div class="grid lg:grid-cols-12 gap-12 items-center">
                <div class="lg:col-span-7 space-y-6">
                    <span
                        class="inline-flex items-center gap-2 px-3 py-1 rounded-full
                               border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 text-xs font-medium"
                    >
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {{ t('hero.availableForWork') }}
                    </span>

                    <p class="text-primary-300 font-medium">{{ t('hero.portfolioGreeting') }}</p>

                    <h1 class="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                        {{ profile.name }}
                    </h1>

                    <p class="text-2xl md:text-3xl font-display text-slate-300 leading-snug">
                        {{ profile.headline }}
                    </p>

                    <p v-if="profile.bio" class="text-slate-400 text-lg max-w-2xl leading-relaxed">
                        {{ profile.bio }}
                    </p>

                    <div class="flex flex-wrap gap-3 pt-2">
                        <Button href="#contact" variant="primary" size="lg">
                            {{ t('button.contactMe') }}
                        </Button>
                        <Button v-if="profile.resume_url" :href="profile.resume_url" variant="outline" size="lg">
                            {{ t('button.downloadResume') }}
                        </Button>
                    </div>
                </div>

                <div class="lg:col-span-5 flex justify-center lg:justify-end">
                    <div class="relative">
                        <div
                            class="absolute -inset-4 rounded-full bg-gradient-to-tr from-primary-500/30 via-accent-500/20 to-transparent blur-2xl"
                            aria-hidden="true"
                        />
                        <div class="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/10">
                            <LazyImage
                                v-if="profile.avatar_url"
                                :src="profile.avatar_url"
                                :alt="profile.name ?? ''"
                                container-class="w-full h-full"
                                eager
                            />
                            <div
                                v-else
                                class="w-full h-full bg-gradient-to-br from-space-700 to-space-800
                                       flex items-center justify-center text-5xl font-display text-primary-300/60"
                            >
                                {{ initials }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { gsap } from 'gsap';
import Button from '@/Components/Shared/Button.vue';
import LazyImage from '@/Components/Shared/LazyImage.vue';
import { useI18n } from '@/i18n';
import { useReducedMotion } from '@/Composables/useReducedMotion';
import type { ProfilePortfolio } from '@/types/pages';

const props = defineProps<{ profile: ProfilePortfolio }>();
const { t } = useI18n();
const { prefersReducedMotion } = useReducedMotion();

onMounted(() => {
    if (prefersReducedMotion.value) return;
    gsap.from('#hero h1', { opacity: 0, y: 24, duration: 0.8, ease: 'power3.out' });
    gsap.from('#hero p, #hero a, #hero button, #hero span', {
        opacity: 0,
        y: 18,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.06,
        delay: 0.25,
    });
});

const initials = computed(() =>
    (props.profile.name ?? '')
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0]?.toUpperCase())
        .join(''),
);
</script>
