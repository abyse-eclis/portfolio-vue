import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import Icon from '@/Components/Shared/Icon.vue';
import { supabase } from '@/lib/supabase';
const cards = [
    { table: 'projects', to: '/admin/projects', label: 'ผลงาน', icon: 'briefcase' },
    { table: 'certificates', to: '/admin/certificates', label: 'ใบรับรอง', icon: 'award' },
    { table: 'skills', to: '/admin/skills', label: 'ทักษะ', icon: 'zap' },
    { table: 'packages', to: '/admin/packages', label: 'แพ็กเกจ', icon: 'cube' },
    { table: 'testimonials', to: '/admin/testimonials', label: 'รีวิวลูกค้า', icon: 'star' },
    { table: 'process_steps', to: '/admin/process-steps', label: 'ขั้นตอนงาน', icon: 'clock' },
    { table: 'social_links', to: '/admin/social-links', label: 'โซเชียล', icon: 'globe' },
    { table: 'contact_submissions', to: '/admin/contacts', label: 'ข้อความติดต่อ', icon: 'mail' },
];
const counts = ref({});
const unread = ref(0);
async function countTable(table) {
    const { count } = await supabase.from(table).select('id', { count: 'exact', head: true });
    return count ?? 0;
}
onMounted(async () => {
    await Promise.all(cards.map(async (c) => {
        counts.value[c.table] = await countTable(c.table);
    }));
    const { count } = await supabase
        .from('contact_submissions')
        .select('id', { count: 'exact', head: true })
        .eq('is_read', false);
    unread.value = count ?? 0;
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
const __VLS_0 = AdminLayout || AdminLayout;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "font-display text-2xl text-white" },
});
/** @type {__VLS_StyleScopedClasses['font-display']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mt-1 text-sm text-slate-400" },
});
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" },
});
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-4']} */ ;
for (const [card] of __VLS_vFor((__VLS_ctx.cards))) {
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
    RouterLink;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        key: (card.to),
        to: (card.to),
        ...{ class: "group rounded-2xl border border-white/10 bg-space-800/40 p-5 transition-colors hover:border-primary-500/40" },
    }));
    const __VLS_9 = __VLS_8({
        key: (card.to),
        to: (card.to),
        ...{ class: "group rounded-2xl border border-white/10 bg-space-800/40 p-5 transition-colors hover:border-primary-500/40" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    /** @type {__VLS_StyleScopedClasses['group']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-space-800/40']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:border-primary-500/40']} */ ;
    const { default: __VLS_12 } = __VLS_10.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    const __VLS_13 = Icon;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
        name: (card.icon),
        size: (20),
        ...{ class: "text-primary-400" },
    }));
    const __VLS_15 = __VLS_14({
        name: (card.icon),
        size: (20),
        ...{ class: "text-primary-400" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    /** @type {__VLS_StyleScopedClasses['text-primary-400']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-display text-2xl text-white" },
    });
    /** @type {__VLS_StyleScopedClasses['font-display']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
    (__VLS_ctx.counts[card.table] ?? '—');
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "mt-3 text-sm text-slate-300 group-hover:text-white" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-300']} */ ;
    /** @type {__VLS_StyleScopedClasses['group-hover:text-white']} */ ;
    (card.label);
    // @ts-ignore
    [cards, counts,];
    var __VLS_10;
    // @ts-ignore
    [];
}
if (__VLS_ctx.unread > 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mt-6 flex items-center gap-3 rounded-xl border border-primary-500/30 bg-primary-500/10 px-4 py-3" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-500/30']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary-500/10']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    const __VLS_18 = Icon;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
        name: "mail",
        size: (18),
        ...{ class: "text-primary-300" },
    }));
    const __VLS_20 = __VLS_19({
        name: "mail",
        size: (18),
        ...{ class: "text-primary-300" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    /** @type {__VLS_StyleScopedClasses['text-primary-300']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm text-primary-200" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-200']} */ ;
    (__VLS_ctx.unread);
    let __VLS_23;
    /** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
    RouterLink;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
        to: "/admin/contacts",
        ...{ class: "ml-auto text-sm font-medium text-primary-300 hover:underline" },
    }));
    const __VLS_25 = __VLS_24({
        to: "/admin/contacts",
        ...{ class: "ml-auto text-sm font-medium text-primary-300 hover:underline" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    /** @type {__VLS_StyleScopedClasses['ml-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-300']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
    const { default: __VLS_28 } = __VLS_26.slots;
    // @ts-ignore
    [unread, unread,];
    var __VLS_26;
}
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=Dashboard.vue.js.map