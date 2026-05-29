<template>
    <div :class="['relative overflow-hidden', containerClass]">
        <img
            ref="imgEl"
            :alt="alt"
            :class="[
                'transition-opacity duration-500 w-full h-full object-cover',
                isLoaded ? 'opacity-100' : 'opacity-0',
                imgClass,
            ]"
        />
        <div
            v-if="!isLoaded"
            :class="['absolute inset-0 bg-space-700 animate-pulse', placeholderClass]"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = withDefaults(defineProps<{
    src: string;
    alt: string;
    containerClass?: string;
    imgClass?: string;
    placeholderClass?: string;
    eager?: boolean;
}>(), {
    eager: false,
});

const imgEl = ref<HTMLImageElement | null>(null);
const isLoaded = ref(false);

function load() {
    if (!imgEl.value || !props.src) return;
    imgEl.value.onload = () => { isLoaded.value = true; };
    imgEl.value.src = props.src;
}

onMounted(() => {
    if (!imgEl.value) return;

    if (props.eager) {
        load();
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            load();
            observer.disconnect();
        }
    }, { rootMargin: '200px' });

    observer.observe(imgEl.value);
});

watch(() => props.src, () => {
    isLoaded.value = false;
    load();
});
</script>
