<template>
    <div>
        <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2.5">
                <img
                    v-if="skill.icon_url"
                    :src="skill.icon_url"
                    :alt="skill.name"
                    class="w-5 h-5 object-contain"
                    loading="lazy"
                />
                <span class="text-sm font-medium text-slate-200">{{ skill.name }}</span>
            </div>
            <span class="text-xs text-slate-500">{{ skill.level }}%</span>
        </div>
        <div class="h-2 rounded-full bg-space-800 overflow-hidden" :aria-label="`${skill.name} level ${skill.level}%`">
            <div
                ref="barEl"
                class="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-1000 ease-out"
                :style="{ width: animatedWidth }"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { SkillItem } from '@/types/pages';
import { useReducedMotion } from '@/Composables/useReducedMotion';

const props = defineProps<{ skill: SkillItem }>();
const barEl = ref<HTMLDivElement | null>(null);
const animatedWidth = ref('0%');
const { prefersReducedMotion } = useReducedMotion();

onMounted(() => {
    const final = `${Math.min(Math.max(props.skill.level, 0), 100)}%`;
    if (prefersReducedMotion.value) {
        animatedWidth.value = final;
        return;
    }
    if (!barEl.value) return;
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            requestAnimationFrame(() => { animatedWidth.value = final; });
            observer.disconnect();
        }
    }, { threshold: 0.2 });
    observer.observe(barEl.value);
});
</script>
