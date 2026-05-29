<template>
    <article class="group rounded-2xl overflow-hidden bg-space-800/40 border border-white/5 hover:border-primary-500/40 transition-colors">
        <div class="aspect-[4/3] bg-space-700 relative">
            <LazyImage
                v-if="cert.image_url"
                :src="cert.image_url"
                :alt="cert.title ?? ''"
                container-class="w-full h-full"
            />
            <div v-else class="absolute inset-0 flex items-center justify-center text-slate-500 text-sm p-4 text-center">
                {{ cert.title }}
            </div>
        </div>
        <div class="p-5 space-y-2">
            <h3 class="font-display text-lg text-white">{{ cert.title }}</h3>
            <p class="text-sm text-slate-400">{{ cert.issuer }}</p>
            <p v-if="cert.issued_at" class="text-xs text-slate-500">{{ formatDate(cert.issued_at) }}</p>
            <a
                v-if="cert.credential_url"
                :href="cert.credential_url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-sm text-primary-400 hover:text-primary-300 mt-2"
            >
                {{ t('button.viewCertificate') }}
                <Icon name="external-link" :size="14" />
            </a>
        </div>
    </article>
</template>

<script setup lang="ts">
import LazyImage from '@/Components/Shared/LazyImage.vue';
import Icon from '@/Components/Shared/Icon.vue';
import { useI18n } from '@/i18n';
import type { CertificateCardData } from '@/types/pages';

defineProps<{ cert: CertificateCardData }>();
const { t, locale } = useI18n();

function formatDate(iso: string) {
    try {
        return new Intl.DateTimeFormat(locale.value === 'th' ? 'th-TH' : 'en-US', {
            year: 'numeric',
            month: 'short',
        }).format(new Date(iso));
    } catch {
        return iso;
    }
}
</script>
