<template>
    <section id="certificates" class="py-20 md:py-28 bg-space-950/40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading :eyebrow="t('sections.certificates.eyebrow')">
                {{ t('sections.certificates.title') }}
            </SectionHeading>

            <div v-if="certificates.length" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <CertificateCard v-for="cert in certificates" :key="cert.id" :cert="cert" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import SectionHeading from '@/Components/Shared/SectionHeading.vue';
import CertificateCard from './CertificateCard.vue';
import { useI18n } from '@/i18n';
import type { CertificateCardData } from '@/types/pages';

defineProps<{ certificates: CertificateCardData[] }>();
const { t } = useI18n();
</script>
