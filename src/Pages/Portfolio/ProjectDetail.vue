<template>
    <PortfolioLayout>
        <Head>
            <title>{{ buildTitle(project.title ?? undefined) }}</title>
            <meta name="description" :content="buildDescription(project.description ?? undefined)" />
        </Head>

        <article class="py-24 md:py-32">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <a
                    href="/"
                    class="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-primary-300 mb-8 transition-colors"
                >
                    <Icon name="arrow-left" :size="14" />
                    {{ t('button.backToProjects') }}
                </a>

                <header class="space-y-4 mb-10">
                    <p class="text-primary-300 text-sm font-semibold uppercase tracking-wider">{{ project.type }}</p>
                    <h1 class="font-display font-bold text-3xl md:text-5xl text-white">{{ project.title }}</h1>
                    <p v-if="project.description" class="text-slate-300 text-lg">{{ project.description }}</p>
                    <div class="flex flex-wrap gap-2 pt-2">
                        <span v-for="tech in project.tech_stack" :key="tech"
                              class="px-2.5 py-1 rounded-md text-xs bg-white/5 text-slate-200 border border-white/5">
                            {{ tech }}
                        </span>
                    </div>
                    <div class="flex flex-wrap gap-3 pt-4">
                        <Button v-if="project.url" :href="project.url" variant="primary" size="md">
                            {{ t('button.liveDemo') }}
                            <Icon name="external-link" :size="14" />
                        </Button>
                        <Button v-if="project.repo_url" :href="project.repo_url" variant="outline" size="md">
                            {{ t('button.viewRepo') }}
                            <Icon name="github" :size="14" />
                        </Button>
                    </div>
                </header>

                <figure v-if="project.cover_url" class="mb-12 rounded-2xl overflow-hidden border border-white/5">
                    <LazyImage
                        :src="project.cover_url"
                        :alt="project.title ?? ''"
                        container-class="aspect-[16/9]"
                        eager
                    />
                </figure>

                <section v-if="project.gallery.length" class="grid sm:grid-cols-2 gap-4 mb-12">
                    <figure
                        v-for="(img, idx) in project.gallery"
                        :key="idx"
                        class="rounded-xl overflow-hidden border border-white/5"
                    >
                        <LazyImage
                            v-if="img.url"
                            :src="img.url"
                            :alt="img.alt"
                            container-class="aspect-[4/3]"
                        />
                    </figure>
                </section>

                <section v-if="testimonials.length" class="space-y-5 pt-8 border-t border-white/5">
                    <h2 class="font-display text-2xl text-white">
                        {{ t('sections.testimonials.title') }}
                    </h2>
                    <div class="grid md:grid-cols-2 gap-5">
                        <blockquote
                            v-for="t in testimonials"
                            :key="t.id"
                            class="p-5 rounded-xl bg-space-800/40 border border-white/5"
                        >
                            <p class="text-slate-300 italic">"{{ t.content }}"</p>
                            <footer class="mt-3 text-sm text-slate-400">
                                — {{ t.client_name }}<span v-if="t.client_role"> · {{ t.client_role }}</span>
                            </footer>
                        </blockquote>
                    </div>
                </section>
            </div>
        </article>
    </PortfolioLayout>
</template>

<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import PortfolioLayout from '@/Layouts/PortfolioLayout.vue';
import Button from '@/Components/Shared/Button.vue';
import Icon from '@/Components/Shared/Icon.vue';
import LazyImage from '@/Components/Shared/LazyImage.vue';
import { useI18n } from '@/i18n';
import { useSeo } from '@/Composables/useSeo';
import type { PortfolioProjectDetailProps } from '@/types/pages';

defineProps<PortfolioProjectDetailProps>();
const { t } = useI18n();
const { buildTitle, buildDescription } = useSeo();
</script>
