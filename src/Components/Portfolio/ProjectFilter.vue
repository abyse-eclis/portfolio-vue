<template>
    <div class="flex flex-wrap gap-2 mb-8">
        <button
            v-for="opt in options"
            :key="opt.value ?? 'all'"
            type="button"
            @click="select(opt.value)"
            :class="[
                'px-3 py-1.5 rounded-full text-sm border transition-colors',
                isActive(opt.value)
                    ? 'bg-primary-500 text-space-900 border-primary-500 font-medium'
                    : 'bg-white/5 text-slate-300 border-white/5 hover:border-primary-500/40 hover:text-white',
            ]"
        >
            {{ opt.label }}
        </button>

        <button
            v-if="currentTech"
            type="button"
            @click="select(null)"
            class="px-3 py-1.5 rounded-full text-sm border border-white/10 text-slate-400 hover:text-white"
        >
            {{ t('filter.clear') }}
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from '@/i18n';

const props = defineProps<{
    techs: string[];
    currentTech: string | null;
}>();

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const options = computed(() => [
    { value: null as string | null, label: t('filter.all') },
    ...props.techs.map((tech) => ({ value: tech, label: tech })),
]);

function isActive(value: string | null) {
    return (value ?? null) === (props.currentTech ?? null);
}

function select(tech: string | null) {
    const query = { ...route.query };
    if (tech) query.tech = tech;
    else delete query.tech;
    router.push({ query });
}
</script>
