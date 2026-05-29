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
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import Button from './Button.vue';
import Icon from './Icon.vue';
import { useI18n } from '@/i18n';
import { useSiteMode } from '@/Composables/useSiteMode';
import { useFlash } from '@/Composables/useFlash';
import { submitContact } from '@/Composables/useContact';
import { locale } from '@/Composables/useLocale';

const props = defineProps<{ packageSlug?: string | null }>();
const { t } = useI18n();
const { siteMode } = useSiteMode();
const router = useRouter();
const { success } = useFlash();

// Plain reactive form that keeps the `.errors` / `.processing` shape the
// template relied on under Inertia's useForm — markup stays untouched.
const form = reactive({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    package_slug: props.packageSlug ?? '',
    website: '',
    errors: {} as Record<string, string>,
    processing: false,
});

watch(() => props.packageSlug, (slug) => {
    form.package_slug = slug ?? '';
});

// Client-side mirror of StoreContactRequest. Real enforcement still belongs in
// the DB / an Edge Function — this is just UX feedback.
function validate(): boolean {
    const th = locale.value === 'th';
    form.errors = {};

    if (!form.name.trim()) {
        form.errors.name = th ? 'กรุณากรอกชื่อ' : 'Name is required.';
    }
    const email = form.email.trim();
    if (!email) {
        form.errors.email = th ? 'กรุณากรอกอีเมล' : 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        form.errors.email = th ? 'รูปแบบอีเมลไม่ถูกต้อง' : 'Enter a valid email address.';
    }
    if (form.message.trim().length < 10) {
        form.errors.message = th
            ? 'ข้อความต้องมีอย่างน้อย 10 ตัวอักษร'
            : 'Message must be at least 10 characters.';
    }

    return Object.keys(form.errors).length === 0;
}

async function submit() {
    // Honeypot — bots fill the hidden "website" field. Drop silently.
    if (form.website) return;
    if (!validate()) return;

    form.processing = true;
    const { error } = await submitContact({
        mode: siteMode.value,
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
        package_slug: siteMode.value === 'freelance' ? form.package_slug || null : null,
        locale: locale.value,
    });
    form.processing = false;

    if (error) {
        form.errors.message = error;
        return;
    }

    form.name = '';
    form.email = '';
    form.phone = '';
    form.subject = '';
    form.message = '';
    form.package_slug = props.packageSlug ?? '';

    // Navigate first, then raise the flash so the Toast on the thank-you page
    // (a fresh layout instance) is the one that displays it.
    await router.push('/contact/thank-you');
    success(t('contact.success'));
}
</script>
