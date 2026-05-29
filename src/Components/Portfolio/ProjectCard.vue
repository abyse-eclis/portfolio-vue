<template>
    <article
        class="group relative rounded-2xl overflow-hidden bg-space-800/40 border border-white/5
               hover:border-primary-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-900/30"
    >
        <a :href="`/projects/${project.slug}`" class="block">
            <div class="aspect-[16/10] relative overflow-hidden bg-space-700">
                <LazyImage
                    v-if="project.thumbnail_url"
                    :src="project.thumbnail_url"
                    :alt="project.title ?? ''"
                    container-class="w-full h-full"
                    img-class="group-hover:scale-105 transition-transform duration-500"
                />
                <div v-else class="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
                    {{ project.title }}
                </div>

                <div
                    v-if="project.is_featured"
                    class="absolute top-3 left-3 px-2 py-1 rounded-md bg-primary-500/90 text-space-900 text-[10px] font-bold uppercase tracking-wider"
                >
                    {{ t('common.featured') }}
                </div>
            </div>

            <div class="p-5">
                <h3 class="font-display text-lg text-white mb-2 group-hover:text-primary-300 transition-colors">
                    {{ project.title }}
                </h3>
                <p class="text-slate-400 text-sm line-clamp-2 mb-4">
                    {{ project.description }}
                </p>

                <div class="flex flex-wrap gap-1.5">
                    <span
                        v-for="tech in project.tech_stack.slice(0, 4)"
                        :key="tech"
                        class="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/5 text-slate-300 border border-white/5"
                    >
                        {{ tech }}
                    </span>
                    <span v-if="project.tech_stack.length > 4" class="text-[11px] text-slate-500 px-1">
                        +{{ project.tech_stack.length - 4 }}
                    </span>
                </div>
            </div>
        </a>
    </article>
</template>

<script setup lang="ts">
import LazyImage from '@/Components/Shared/LazyImage.vue';
import { useI18n } from '@/i18n';
import type { ProjectCardData } from '@/types/pages';

defineProps<{ project: ProjectCardData }>();
const { t } = useI18n();
</script>
