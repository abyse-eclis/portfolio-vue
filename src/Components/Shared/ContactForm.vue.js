import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import Button from './Button.vue';
import Icon from './Icon.vue';
import { useI18n } from '@/i18n';
import { useSiteMode } from '@/Composables/useSiteMode';
import { useFlash } from '@/Composables/useFlash';
import { submitContact } from '@/Composables/useContact';
import { locale } from '@/Composables/useLocale';
const props = defineProps();
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
    errors: {},
    processing: false,
});
watch(() => props.packageSlug, (slug) => {
    form.package_slug = slug ?? '';
});
// Client-side mirror of StoreContactRequest. Real enforcement still belongs in
// the DB / an Edge Function — this is just UX feedback.
function validate() {
    const th = locale.value === 'th';
    form.errors = {};
    if (!form.name.trim()) {
        form.errors.name = th ? 'กรุณากรอกชื่อ' : 'Name is required.';
    }
    const email = form.email.trim();
    if (!email) {
        form.errors.email = th ? 'กรุณากรอกอีเมล' : 'Email is required.';
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
    if (form.website)
        return;
    if (!validate())
        return;
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
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
    ...{ onSubmit: (__VLS_ctx.submit) },
    ...{ class: "space-y-5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "sr-only" },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    value: (__VLS_ctx.form.website),
    type: "text",
    tabindex: "-1",
    autocomplete: "off",
});
if (__VLS_ctx.packageSlug) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        type: "hidden",
    });
    (__VLS_ctx.form.package_slug);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid sm:grid-cols-2 gap-4" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "block text-sm text-slate-300 mb-1.5" },
    for: "contact-name",
});
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1.5']} */ ;
(__VLS_ctx.t('contact.name'));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-red-400" },
});
/** @type {__VLS_StyleScopedClasses['text-red-400']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    id: "contact-name",
    value: (__VLS_ctx.form.name),
    type: "text",
    required: true,
    'aria-invalid': (!!__VLS_ctx.form.errors.name),
    'aria-describedby': (__VLS_ctx.form.errors.name ? 'err-name' : undefined),
    ...{ class: "w-full rounded-lg bg-space-800/60 border border-white/10 px-4 py-2.5 text-white placeholder-slate-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-space-800/60']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder-slate-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-primary-400']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-primary-500/30']} */ ;
if (__VLS_ctx.form.errors.name) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        id: "err-name",
        ...{ class: "text-sm text-red-400 mt-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-red-400']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    (__VLS_ctx.form.errors.name);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "block text-sm text-slate-300 mb-1.5" },
    for: "contact-email",
});
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1.5']} */ ;
(__VLS_ctx.t('contact.email'));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-red-400" },
});
/** @type {__VLS_StyleScopedClasses['text-red-400']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    id: "contact-email",
    type: "email",
    required: true,
    'aria-invalid': (!!__VLS_ctx.form.errors.email),
    'aria-describedby': (__VLS_ctx.form.errors.email ? 'err-email' : undefined),
    ...{ class: "w-full rounded-lg bg-space-800/60 border border-white/10 px-4 py-2.5 text-white placeholder-slate-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30" },
});
(__VLS_ctx.form.email);
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-space-800/60']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder-slate-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-primary-400']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-primary-500/30']} */ ;
if (__VLS_ctx.form.errors.email) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        id: "err-email",
        ...{ class: "text-sm text-red-400 mt-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-red-400']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    (__VLS_ctx.form.errors.email);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid sm:grid-cols-2 gap-4" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "block text-sm text-slate-300 mb-1.5" },
    for: "contact-phone",
});
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1.5']} */ ;
(__VLS_ctx.t('contact.phone'));
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    id: "contact-phone",
    type: "tel",
    ...{ class: "w-full rounded-lg bg-space-800/60 border border-white/10 px-4 py-2.5 text-white placeholder-slate-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30" },
});
(__VLS_ctx.form.phone);
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-space-800/60']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder-slate-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-primary-400']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-primary-500/30']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "block text-sm text-slate-300 mb-1.5" },
    for: "contact-subject",
});
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1.5']} */ ;
(__VLS_ctx.t('contact.subject'));
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    id: "contact-subject",
    value: (__VLS_ctx.form.subject),
    type: "text",
    ...{ class: "w-full rounded-lg bg-space-800/60 border border-white/10 px-4 py-2.5 text-white placeholder-slate-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-space-800/60']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder-slate-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-primary-400']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-primary-500/30']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "block text-sm text-slate-300 mb-1.5" },
    for: "contact-message",
});
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1.5']} */ ;
(__VLS_ctx.t('contact.message'));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-red-400" },
});
/** @type {__VLS_StyleScopedClasses['text-red-400']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.textarea)({
    id: "contact-message",
    value: (__VLS_ctx.form.message),
    rows: "5",
    required: true,
    'aria-invalid': (!!__VLS_ctx.form.errors.message),
    'aria-describedby': (__VLS_ctx.form.errors.message ? 'err-message' : undefined),
    ...{ class: "w-full rounded-lg bg-space-800/60 border border-white/10 px-4 py-2.5 text-white placeholder-slate-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 resize-none" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-space-800/60']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder-slate-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-primary-400']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-primary-500/30']} */ ;
/** @type {__VLS_StyleScopedClasses['resize-none']} */ ;
if (__VLS_ctx.form.errors.message) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        id: "err-message",
        ...{ class: "text-sm text-red-400 mt-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-red-400']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    (__VLS_ctx.form.errors.message);
}
const __VLS_0 = Button || Button;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    type: "submit",
    variant: "primary",
    size: "lg",
    disabled: (__VLS_ctx.form.processing),
    ...{ class: "w-full sm:w-auto" },
}));
const __VLS_2 = __VLS_1({
    type: "submit",
    variant: "primary",
    size: "lg",
    disabled: (__VLS_ctx.form.processing),
    ...{ class: "w-full sm:w-auto" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:w-auto']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
if (__VLS_ctx.form.processing) {
    const __VLS_6 = Icon;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        name: "loader",
        size: (18),
        ...{ class: "animate-spin" },
    }));
    const __VLS_8 = __VLS_7({
        name: "loader",
        size: (18),
        ...{ class: "animate-spin" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    /** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
}
else {
    const __VLS_11 = Icon;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
        name: "send",
        size: (18),
    }));
    const __VLS_13 = __VLS_12({
        name: "send",
        size: (18),
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
}
(__VLS_ctx.form.processing ? __VLS_ctx.t('contact.sending') : __VLS_ctx.t('contact.submit'));
// @ts-ignore
[submit, form, form, form, form, form, form, form, form, form, form, form, form, form, form, form, form, form, form, form, form, form, form, packageSlug, t, t, t, t, t, t, t,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=ContactForm.vue.js.map