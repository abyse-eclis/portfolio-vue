<template>
    <article
        :class="[
            'relative flex flex-col p-6 md:p-7 rounded-2xl border transition-all duration-300',
            pkg.is_recommended
                ? 'bg-gradient-to-b from-accent-500/10 to-space-800/60 border-accent-400/60 shadow-2xl shadow-accent-500/20 ring-1 ring-accent-400/40'
                : 'bg-space-800/40 border-white/5 hover:border-primary-500/40',
        ]"
    >
        <div
            v-if="pkg.is_recommended"
            class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent-500 text-white text-xs font-bold uppercase tracking-wider"
        >
            {{ t('common.recommended') }}
        </div>

        <header class="mb-5">
            <h3 class="font-display text-2xl text-white">{{ pkg.name }}</h3>
            <p v-if="pkg.tagline" class="text-sm text-slate-400 mt-1">{{ pkg.tagline }}</p>
        </header>

        <div class="mb-5">
            <p class="text-xs text-slate-500 uppercase tracking-wide">{{ t('common.startingAt') }}</p>
            <p class="font-display text-3xl text-white mt-1">{{ formattedPrice }}</p>
            <p class="text-xs text-slate-500">{{ t('common.perProject') }}</p>
        </div>

        <p v-if="pkg.description" class="text-sm text-slate-300 mb-5 leading-relaxed">{{ pkg.description }}</p>

        <ul class="space-y-2.5 mb-7 flex-1">
            <li
                v-for="f in pkg.features"
                :key="f.id"
                class="flex items-start gap-2.5 text-sm"
                :class="f.included ? 'text-slate-200' : 'text-slate-500 line-through'"
            >
                <Icon
                    :name="f.included ? 'check' : 'minus'"
                    :size="16"
                    :class="f.included ? 'text-emerald-400 mt-0.5 shrink-0' : 'text-slate-600 mt-0.5 shrink-0'"
                />
                <span>{{ f.feature }}</span>
            </li>
        </ul>

        <Button
            type="button"
            :variant="pkg.is_recommended ? 'secondary' : 'primary'"
            size="md"
            class="w-full"
            @click="select"
        >
            {{ t('button.selectPackage') }}
        </Button>
    </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Button from '@/Components/Shared/Button.vue';
import Icon from '@/Components/Shared/Icon.vue';
import { useI18n } from '@/i18n';
import { useFormatPrice } from '@/Composables/useFormatPrice';
import type { PackageData } from '@/types/pages';

const props = defineProps<{ pkg: PackageData }>();
const emit = defineEmits<{ (e: 'select', slug: string): void }>();

const { t } = useI18n();
const { format } = useFormatPrice();

const formattedPrice = computed(() => format(props.pkg.price, props.pkg.currency || 'THB'));

function select() {
    emit('select', props.pkg.slug);
}
</script>
