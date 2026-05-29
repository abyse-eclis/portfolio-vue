<template>
    <section id="skills" ref="root" class="py-20 md:py-28 bg-space-950/40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading :eyebrow="t('sections.skills.eyebrow')">
                {{ t('sections.skills.title') }}
            </SectionHeading>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="block in skills" :key="block.id" data-anim="card">
                    <SkillCategoryBlock :block="block" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SectionHeading from '@/Components/Shared/SectionHeading.vue';
import SkillCategoryBlock from './SkillCategoryBlock.vue';
import { useI18n } from '@/i18n';
import { useGsapAnim } from '@/Composables/useGsapAnim';
import type { SkillCategoryBlock as SkillCategoryBlockType } from '@/types/pages';

defineProps<{ skills: SkillCategoryBlockType[] }>();
const { t } = useI18n();
const root = ref<HTMLElement | null>(null);
const { fadeUp } = useGsapAnim();

onMounted(() => {
    fadeUp(root.value, { selector: '[data-anim="card"]', stagger: 0.08, y: 28 });
});
</script>
