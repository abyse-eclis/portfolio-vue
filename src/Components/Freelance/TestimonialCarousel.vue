<template>
    <section id="testimonials" class="py-20 md:py-28 bg-space-950/40">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading :eyebrow="t('sections.testimonials.eyebrow')">
                {{ t('sections.testimonials.title') }}
            </SectionHeading>

            <div
                ref="trackContainer"
                class="relative overflow-hidden"
            >
                <div
                    ref="track"
                    class="flex snap-x snap-mandatory overflow-x-auto scroll-smooth gap-5 pb-3"
                    style="scroll-behavior: smooth;"
                >
                    <article
                        v-for="t in testimonials"
                        :key="t.id"
                        class="snap-center shrink-0 w-[88%] sm:w-[60%] lg:w-[45%] p-6 md:p-7 rounded-2xl bg-space-800/50 border border-white/5"
                    >
                        <div class="flex gap-1 mb-3" :aria-label="`Rating ${t.rating} of 5`">
                            <Icon
                                v-for="n in 5"
                                :key="n"
                                name="star"
                                :size="16"
                                :class="n <= t.rating ? 'text-yellow-400' : 'text-slate-700'"
                                :filled="n <= t.rating"
                            />
                        </div>
                        <p class="text-slate-200 italic leading-relaxed mb-4">"{{ t.content }}"</p>
                        <footer class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-space-700 overflow-hidden flex items-center justify-center text-sm text-primary-300 font-medium">
                                <img v-if="t.avatar_url" :src="t.avatar_url" :alt="t.client_name" class="w-full h-full object-cover" loading="lazy" />
                                <span v-else>{{ t.client_name?.[0] }}</span>
                            </div>
                            <div class="text-sm">
                                <div class="text-white font-medium">{{ t.client_name }}</div>
                                <div class="text-slate-400 text-xs">
                                    <span v-if="t.client_role">{{ t.client_role }}</span>
                                    <span v-if="t.client_company"> · {{ t.client_company }}</span>
                                </div>
                            </div>
                        </footer>
                    </article>
                </div>

                <div v-if="testimonials.length > 1" class="flex justify-center gap-2 mt-5">
                    <button
                        type="button"
                        @click="scrollBy(-1)"
                        class="w-10 h-10 rounded-full border border-white/10 text-slate-300 hover:bg-white/5 transition-colors flex items-center justify-center"
                        aria-label="Previous"
                    >
                        <Icon name="arrow-left" :size="16" />
                    </button>
                    <button
                        type="button"
                        @click="scrollBy(1)"
                        class="w-10 h-10 rounded-full border border-white/10 text-slate-300 hover:bg-white/5 transition-colors flex items-center justify-center"
                        aria-label="Next"
                    >
                        <Icon name="arrow-right" :size="16" />
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SectionHeading from '@/Components/Shared/SectionHeading.vue';
import Icon from '@/Components/Shared/Icon.vue';
import { useI18n } from '@/i18n';
import type { TestimonialData } from '@/types/pages';

defineProps<{ testimonials: TestimonialData[] }>();
const { t } = useI18n();
const track = ref<HTMLDivElement | null>(null);

function scrollBy(dir: 1 | -1) {
    if (!track.value) return;
    const card = track.value.firstElementChild as HTMLElement | null;
    const distance = (card?.offsetWidth ?? track.value.clientWidth) * 0.9 * dir;
    track.value.scrollBy({ left: distance, behavior: 'smooth' });
}
</script>
