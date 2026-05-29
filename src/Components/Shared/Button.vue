<template>
    <component
        :is="tag"
        :href="href"
        :class="[
            'inline-flex items-center justify-center gap-2 font-medium rounded-xl',
            'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-space-900',
            variantClasses,
            sizeClasses,
            disabled && 'opacity-50 pointer-events-none cursor-not-allowed',
        ]"
        :disabled="tag === 'button' ? disabled : undefined"
        v-bind="$attrs"
    >
        <slot />
    </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const props = withDefaults(defineProps<{
    variant?: Variant;
    size?: Size;
    href?: string;
    disabled?: boolean;
    as?: string;
}>(), {
    variant: 'primary',
    size: 'md',
    disabled: false,
});

const tag = computed(() => props.as ?? (props.href ? 'a' : 'button'));

const variantClasses = computed(() => ({
    primary: 'bg-primary-500 hover:bg-primary-400 text-space-900 font-semibold shadow-lg hover:shadow-primary-500/30 hover:shadow-xl',
    secondary: 'bg-accent-500 hover:bg-accent-400 text-white font-semibold shadow-lg hover:shadow-accent-500/30 hover:shadow-xl',
    ghost: 'text-primary-400 hover:text-primary-300 hover:bg-white/5',
    outline: 'border border-primary-500/40 text-primary-400 hover:border-primary-400 hover:bg-primary-500/10',
}[props.variant]));

const sizeClasses = computed(() => ({
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
}[props.size]));
</script>
