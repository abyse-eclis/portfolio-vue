<template>
    <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-2.5 min-w-0">
            <img
                v-if="skill.icon_url"
                :src="skill.icon_url"
                :alt="skill.name"
                class="w-5 h-5 object-contain shrink-0"
                loading="lazy"
            />
            <span class="text-sm font-medium text-slate-200 truncate">{{ skill.name }}</span>
        </div>
        <span
            class="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset"
            :class="badgeClass"
        >
            {{ label }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { SkillItem } from '@/types/pages';
import { locale } from '@/Composables/useLocale';
import { skillProficiencyLabel, skillProficiencyBadge } from '@/lib/skillLevel';

const props = defineProps<{ skill: SkillItem }>();

const label = computed(() => skillProficiencyLabel(props.skill.proficiency, locale.value));
const badgeClass = computed(() => skillProficiencyBadge(props.skill.proficiency));
</script>
