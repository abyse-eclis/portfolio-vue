<template>
    <form @submit.prevent="submit" class="space-y-5">
        <!-- Honeypot field — ต้องเว้นว่าง ถ้ามีค่าจะ block by validation -->
        <div class="sr-only" aria-hidden="true">
            <label>Website
                <input v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
            </label>
        </div>

        <input v-if="packageSlug" v-model="form.package_slug" type="hidden" />

        <div class="grid sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm text-slate-300 mb-1.5" for="contact-name">
                    {{ t('contact.name') }} <span class="text-red-400">*</span>
                </label>
                <input
                    id="contact-name"
                    v-model="form.name"
                    type="text"
                    required
                    :aria-invalid="!!form.errors.name"
                    :aria-describedby="form.errors.name ? 'err-name' : undefined"
                    class="w-full rounded-lg bg-space-800/60 border border-white/10 px-4 py-2.5 text-white placeholder-slate-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                />
                <p v-if="form.errors.name" id="err-name" class="text-sm text-red-400 mt-1">{{ form.errors.name }}</p>
            </div>

            <div>
                <label class="block text-sm text-slate-300 mb-1.5" for="contact-email">
                    {{ t('contact.email') }} <span class="text-red-400">*</span>
                </label>
                <input
                    id="contact-email"
                    v-model="form.email"
                    type="email"
                    required
                    :aria-invalid="!!form.errors.email"
                    :aria-describedby="form.errors.email ? 'err-email' : undefined"
                    class="w-full rounded-lg bg-space-800/60 border border-white/10 px-4 py-2.5 text-white placeholder-slate-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                />
                <p v-if="form.errors.email" id="err-email" class="text-sm text-red-400 mt-1">{{ form.errors.email }}</p>
            </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm text-slate-300 mb-1.5" for="contact-phone">{{ t('contact.phone') }}</label>
                <input
                    id="contact-phone"
                    v-model="form.phone"
                    type="tel"
                    class="w-full rounded-lg bg-space-800/60 border border-white/10 px-4 py-2.5 text-white placeholder-slate-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                />
            </div>
            <div>
                <label class="block text-sm text-slate-300 mb-1.5" for="contact-subject">{{ t('contact.subject') }}</label>
                <input
                    id="contact-subject"
                    v-model="form.subject"
                    type="text"
                    class="w-full rounded-lg bg-space-800/60 border border-white/10 px-4 py-2.5 text-white placeholder-slate-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                />
            </div>
        </div>

        <div>
            <label class="block text-sm text-slate-300 mb-1.5" for="contact-message">
                {{ t('contact.message') }} <span class="text-red-400">*</span>
            </label>
            <textarea
                id="contact-message"
                v-model="form.message"
                rows="5"
                required
                :aria-invalid="!!form.errors.message"
                :aria-describedby="form.errors.message ? 'err-message' : undefined"
                class="w-full rounded-lg bg-space-800/60 border border-white/10 px-4 py-2.5 text-white placeholder-slate-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 resize-none"
            />
            <p v-if="form.errors.message" id="err-message" class="text-sm text-red-400 mt-1">{{ form.errors.message }}</p>
        </div>

        <Button type="submit" variant="primary" size="lg" :disabled="form.processing" class="w-full sm:w-auto">
            <Icon v-if="form.processing" name="loader" :size="18" class="animate-spin" />
            <Icon v-else name="send" :size="18" />
            {{ form.processing ? t('contact.sending') : t('contact.submit') }}
        </Button>
    </form>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import Button from './Button.vue';
import Icon from './Icon.vue';
import { useI18n } from '@/i18n';
import { useSiteMode } from '@/Composables/useSiteMode';

const props = defineProps<{ packageSlug?: string | null }>();
const { t } = useI18n();
const { isFreelance } = useSiteMode();

const form = useForm({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    package_slug: props.packageSlug ?? '',
    website: '',
});

watch(() => props.packageSlug, (slug) => {
    form.package_slug = slug ?? '';
});

function submit() {
    const url = isFreelance.value ? '/freelance/contact' : '/contact';
    form.post(url, {
        preserveScroll: true,
        onSuccess: () => form.reset(),
    });
}
</script>
