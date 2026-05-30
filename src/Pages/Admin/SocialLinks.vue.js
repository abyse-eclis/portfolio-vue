import AdminLayout from '@/Layouts/AdminLayout.vue';
import ResourceManager from '@/Components/Admin/ResourceManager.vue';
const listColumns = [
    { key: 'platform', label: 'แพลตฟอร์ม' },
    { key: 'url', label: 'URL' },
    { key: 'icon', label: 'ไอคอน' },
    { key: 'sort_order', label: 'ลำดับ' },
];
const fields = [
    {
        key: 'profile_id',
        label: 'โปรไฟล์',
        type: 'relation',
        required: true,
        relation: { table: 'profiles', labelColumns: ['name'] },
    },
    { key: 'platform', label: 'แพลตฟอร์ม', type: 'text', required: true, placeholder: 'GitHub, LinkedIn, …' },
    { key: 'url', label: 'URL', type: 'text', required: true, placeholder: 'https://…', wide: true },
    { key: 'icon', label: 'ไอคอน', type: 'text', required: true, placeholder: 'github, linkedin, twitter, …', help: 'ชื่อไอคอนจากชุด Icon' },
    { key: 'show_in_portfolio', label: 'แสดงในหน้า Portfolio', type: 'checkbox' },
    { key: 'show_in_freelance', label: 'แสดงในหน้า Freelance', type: 'checkbox' },
    { key: 'sort_order', label: 'ลำดับการแสดง', type: 'number' },
];
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
const __VLS_7 = ResourceManager;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    title: "ลิงก์โซเชียล",
    subtitle: "Social links ที่แสดงใน navbar / footer",
    table: "social_links",
    listColumns: (__VLS_ctx.listColumns),
    fields: (__VLS_ctx.fields),
    orderBy: ({ column: 'sort_order', ascending: true }),
    defaults: ({ show_in_portfolio: true, show_in_freelance: true }),
}));
const __VLS_9 = __VLS_8({
    title: "ลิงก์โซเชียล",
    subtitle: "Social links ที่แสดงใน navbar / footer",
    table: "social_links",
    listColumns: (__VLS_ctx.listColumns),
    fields: (__VLS_ctx.fields),
    orderBy: ({ column: 'sort_order', ascending: true }),
    defaults: ({ show_in_portfolio: true, show_in_freelance: true }),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
// @ts-ignore
[listColumns, fields,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=SocialLinks.vue.js.map