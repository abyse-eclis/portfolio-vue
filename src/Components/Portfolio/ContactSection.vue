<template>
    <section id="contact" class="py-20 md:py-28 bg-space-900">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading :eyebrow="t('sections.contact.eyebrow')" :description="t('contact.intro')">
                {{ t('sections.contact.title') }}
            </SectionHeading>

            <div class="grid lg:grid-cols-12 gap-8 items-start">
                <div class="lg:col-span-7 p-6 md:p-8 rounded-2xl bg-space-800/40 border border-white/5">
                    <ContactForm />
                </div>

                <aside class="lg:col-span-5 space-y-4 text-slate-300 text-sm">
                    <div v-for="link in socialLinks" :key="link.id">
                        <a
                            :href="link.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="flex items-center gap-3 p-3 rounded-lg bg-space-800/40 border border-white/5 hover:border-primary-500/40 hover:bg-space-800/60 transition-colors"
                        >
                            <Icon :name="link.icon ?? link.platform" :size="20" class="text-primary-300" />
                            <span class="font-medium capitalize">{{ link.platform }}</span>
                        </a>
                    </div>
                </aside>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import SectionHeading from '@/Components/Shared/SectionHeading.vue';
import ContactForm from '@/Components/Shared/ContactForm.vue';
import Icon from '@/Components/Shared/Icon.vue';
import { useI18n } from '@/i18n';
import { useSharedProfile } from '@/Composables/useSharedProfile';

const { t } = useI18n();
const { socialLinks } = useSharedProfile();
</script>
