<template>
    <div class="p-6 md:p-7 rounded-2xl bg-space-800/40 border border-white/5 hover:border-primary-500/30 transition-colors">
        <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-lg bg-primary-500/15 flex items-center justify-center">
                <Icon :name="block.category.icon ?? 'code-bracket'" :size="20" class="text-primary-300" />
            </div>
            <h3 class="font-display text-xl text-white">{{ block.category.name }}</h3>
        </div>

        <div class="space-y-4">
            <SkillBar v-for="item in block.items" :key="item.id" :skill="item" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Icon from '@/Components/Shared/Icon.vue';
import SkillBar from './SkillBar.vue';
import type { SkillCategoryBlock as SkillCategoryBlockType } from '@/types/pages';

defineProps<{ block: SkillCategoryBlockType }>();
</script>
