import LazyImage from '@/Components/Shared/LazyImage.vue';
import Icon from '@/Components/Shared/Icon.vue';
import { useI18n } from '@/i18n';
const __VLS_props = defineProps();
const { t, locale } = useI18n();
function formatDate(iso) {
    try {
        return new Intl.DateTimeFormat(locale.value === 'th' ? 'th-TH' : 'en-US', {
            year: 'numeric',
            month: 'short',
        }).format(new Date(iso));
    }
    catch {
        return iso;
    }
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
__VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
    ...{ class: "group rounded-2xl overflow-hidden bg-space-800/40 border border-white/5 hover:border-primary-500/40 transition-colors" },
});
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-space-800/40']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/5']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border-primary-500/40']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.cert.orientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]') },
    ...{ class: "bg-space-700 relative" },
});
/** @type {__VLS_StyleScopedClasses['bg-space-700']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
if (__VLS_ctx.cert.image_url) {
    const __VLS_0 = LazyImage;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        src: (__VLS_ctx.cert.image_url),
        alt: (__VLS_ctx.cert.title ?? ''),
        containerClass: "w-full h-full",
    }));
    const __VLS_2 = __VLS_1({
        src: (__VLS_ctx.cert.image_url),
        alt: (__VLS_ctx.cert.title ?? ''),
        containerClass: "w-full h-full",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute inset-0 flex items-center justify-center text-slate-500 text-sm p-4 text-center" },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-500']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    (__VLS_ctx.cert.title);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "p-5 space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "font-display text-lg text-white" },
});
/** @type {__VLS_StyleScopedClasses['font-display']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
(__VLS_ctx.cert.title);
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-sm text-slate-400" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
(__VLS_ctx.cert.issuer);
if (__VLS_ctx.cert.issued_at) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-xs text-slate-500" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-500']} */ ;
    (__VLS_ctx.formatDate(__VLS_ctx.cert.issued_at));
}
if (__VLS_ctx.cert.credential_url) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        href: (__VLS_ctx.cert.credential_url),
        target: "_blank",
        rel: "noopener noreferrer",
        ...{ class: "inline-flex items-center gap-1.5 text-sm text-primary-400 hover:text-primary-300 mt-2" },
    });
    /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-400']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-primary-300']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
    (__VLS_ctx.t('button.viewCertificate'));
    const __VLS_5 = Icon;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
        name: "external-link",
        size: (14),
    }));
    const __VLS_7 = __VLS_6({
        name: "external-link",
        size: (14),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
}
// @ts-ignore
[cert, cert, cert, cert, cert, cert, cert, cert, cert, cert, cert, formatDate, t,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=CertificateCard.vue.js.map