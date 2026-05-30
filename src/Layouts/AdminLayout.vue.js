import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import Icon from '@/Components/Shared/Icon.vue';
import { useAuth } from '@/Composables/useAuth';
const router = useRouter();
const { user, signOut } = useAuth();
const mobileOpen = ref(false);
const nav = [
    { to: '/admin', label: 'แดชบอร์ด', icon: 'layers' },
    { to: '/admin/profile', label: 'โปรไฟล์', icon: 'user' },
    { to: '/admin/projects', label: 'ผลงาน', icon: 'briefcase' },
    { to: '/admin/certificates', label: 'ใบรับรอง', icon: 'award' },
    { to: '/admin/skills', label: 'ทักษะ', icon: 'zap' },
    { to: '/admin/packages', label: 'แพ็กเกจ', icon: 'cube' },
    { to: '/admin/process-steps', label: 'ขั้นตอนงาน', icon: 'clock' },
    { to: '/admin/testimonials', label: 'รีวิวลูกค้า', icon: 'star' },
    { to: '/admin/social-links', label: 'โซเชียล', icon: 'globe' },
    { to: '/admin/contacts', label: 'ข้อความติดต่อ', icon: 'mail' },
];
async function logout() {
    await signOut();
    router.replace('/admin/login');
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "min-h-screen bg-space-950 text-slate-100" },
});
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-space-950']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-100']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
    ...{ class: "fixed inset-y-0 left-0 z-40 w-60 -translate-x-full border-r border-white/10 bg-space-900 transition-transform lg:translate-x-0" },
    ...{ class: ({ 'translate-x-0': __VLS_ctx.mobileOpen }) },
});
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-y-0']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-40']} */ ;
/** @type {__VLS_StyleScopedClasses['w-60']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-x-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border-r']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-space-900']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:translate-x-0']} */ ;
/** @type {__VLS_StyleScopedClasses['translate-x-0']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex h-16 items-center gap-2 border-b border-white/10 px-5" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
/** @type {__VLS_StyleScopedClasses['px-5']} */ ;
const __VLS_0 = Icon;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    name: "zap",
    size: (20),
    ...{ class: "text-primary-400" },
}));
const __VLS_2 = __VLS_1({
    name: "zap",
    size: (20),
    ...{ class: "text-primary-400" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['text-primary-400']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "font-display text-lg font-semibold text-white" },
});
/** @type {__VLS_StyleScopedClasses['font-display']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: "space-y-0.5 p-3" },
});
/** @type {__VLS_StyleScopedClasses['space-y-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
for (const [item] of __VLS_vFor((__VLS_ctx.nav))) {
    let __VLS_5;
    /** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
    RouterLink;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
        ...{ 'onClick': {} },
        key: (item.to),
        to: (item.to),
        ...{ class: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white" },
        activeClass: "bg-primary-500/15 text-primary-300",
    }));
    const __VLS_7 = __VLS_6({
        ...{ 'onClick': {} },
        key: (item.to),
        to: (item.to),
        ...{ class: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white" },
        activeClass: "bg-primary-500/15 text-primary-300",
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    let __VLS_10;
    const __VLS_11 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.mobileOpen = false;
                // @ts-ignore
                [mobileOpen, mobileOpen, nav,];
            } });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-300']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-white/5']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-white']} */ ;
    const { default: __VLS_12 } = __VLS_8.slots;
    const __VLS_13 = Icon;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
        name: (item.icon),
        size: (16),
    }));
    const __VLS_15 = __VLS_14({
        name: (item.icon),
        size: (16),
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    (item.label);
    // @ts-ignore
    [];
    var __VLS_8;
    var __VLS_9;
    // @ts-ignore
    [];
}
if (__VLS_ctx.mobileOpen) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.mobileOpen))
                    return;
                __VLS_ctx.mobileOpen = false;
                // @ts-ignore
                [mobileOpen, mobileOpen,];
            } },
        ...{ class: "fixed inset-0 z-30 bg-black/60 lg:hidden" },
    });
    /** @type {__VLS_StyleScopedClasses['fixed']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-30']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-black/60']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:hidden']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex min-h-screen flex-1 flex-col lg:pl-60" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:pl-60']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-space-900/80 px-4 backdrop-blur sm:px-6" },
});
/** @type {__VLS_StyleScopedClasses['sticky']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-20']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-space-900/80']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:px-6']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.mobileOpen = true;
            // @ts-ignore
            [mobileOpen,];
        } },
    ...{ class: "text-slate-300 lg:hidden" },
});
/** @type {__VLS_StyleScopedClasses['text-slate-300']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:hidden']} */ ;
const __VLS_18 = Icon;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    name: "menu",
    size: (22),
}));
const __VLS_20 = __VLS_19({
    name: "menu",
    size: (22),
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ml-auto flex items-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['ml-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "/",
    target: "_blank",
    ...{ class: "hidden items-center gap-1.5 text-sm text-slate-400 hover:text-primary-300 sm:inline-flex" },
});
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary-300']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:inline-flex']} */ ;
const __VLS_23 = Icon;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
    name: "external-link",
    size: (14),
}));
const __VLS_25 = __VLS_24({
    name: "external-link",
    size: (14),
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "hidden text-sm text-slate-400 sm:inline" },
});
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:inline']} */ ;
(__VLS_ctx.user?.email);
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.logout) },
    ...{ class: "rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-300 hover:bg-white/5" },
});
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-300']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-white/5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.main, __VLS_intrinsics.main)({
    ...{ class: "flex-1 p-4 sm:p-6 lg:p-8" },
});
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:p-8']} */ ;
var __VLS_28 = {};
// @ts-ignore
var __VLS_29 = __VLS_28;
// @ts-ignore
[user, logout,];
const __VLS_base = (await import('vue')).defineComponent({});
const __VLS_export = {};
export default {};
//# sourceMappingURL=AdminLayout.vue.js.map