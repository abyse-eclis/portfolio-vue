<template>
    <section id="hero" class="relative min-h-[90vh] flex items-center overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 md:py-32">
            <div class="max-w-3xl space-y-6">
                <span
                    class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 text-xs font-medium"
                >
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {{ t('hero.availableForWork') }}
                </span>

                <p class="text-accent-300 font-medium">{{ t('hero.freelanceGreeting') }}</p>

                <h1 class="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                    {{ profile.tagline ?? profile.name }}
                </h1>

                <p v-if="profile.bio" class="text-slate-300 text-lg leading-relaxed max-w-2xl">
                    {{ profile.bio }}
                </p>

                <div class="flex flex-wrap gap-3 pt-2">
                    <Button href="#packages" variant="primary" size="lg">
                        {{ t('button.hireMe') }}
                        <Icon name="arrow-right" :size="16" />
                    </Button>
                    <Button href="#projects" variant="outline" size="lg">
                        {{ t('button.viewAll') }}
                    </Button>
                </div>

                <div class="flex flex-wrap gap-6 pt-6 text-sm text-slate-400">
                    <div class="flex items-center gap-2">
                        <Icon name="check" :size="16" class="text-emerald-400" />
                        <span>Free consultation</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon name="check" :size="16" class="text-emerald-400" />
                        <span>Fast turnaround</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon name="check" :size="16" class="text-emerald-400" />
                        <span>Modern stack</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import Button from '@/Components/Shared/Button.vue';
import Icon from '@/Components/Shared/Icon.vue';
import { useI18n } from '@/i18n';
import type { ProfileFreelance } from '@/types/pages';

defineProps<{ profile: ProfileFreelance }>();
const { t } = useI18n();
</script>
