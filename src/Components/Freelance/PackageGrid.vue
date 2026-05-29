<template>
    <section id="packages" class="py-20 md:py-28 bg-space-950/40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading :eyebrow="t('sections.packages.eyebrow')">
                {{ t('sections.packages.title') }}
            </SectionHeading>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
                <PackageCard
                    v-for="pkg in packages"
                    :key="pkg.id"
                    :pkg="pkg"
                    @select="onSelect"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import SectionHeading from '@/Components/Shared/SectionHeading.vue';
import PackageCard from './PackageCard.vue';
import { useI18n } from '@/i18n';
import type { PackageData } from '@/types/pages';

const emit = defineEmits<{ (e: 'select', slug: string): void }>();

defineProps<{ packages: PackageData[] }>();
const { t } = useI18n();

function onSelect(slug: string) {
    emit('select', slug);
    const el = document.getElementById('contact');
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.classList.add('ring-2', 'ring-accent-400/60', 'rounded-xl');
        setTimeout(() => el.classList.remove('ring-2', 'ring-accent-400/60', 'rounded-xl'), 1600);
    }
}
</script>
