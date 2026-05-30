import AdminLayout from '@/Layouts/AdminLayout.vue';
import ResourceManager from '@/Components/Admin/ResourceManager.vue';
const listColumns = [
    { key: 'avatar_path', label: 'รูป', type: 'image' },
    { key: 'client_name', label: 'ชื่อลูกค้า' },
    { key: 'rating', label: 'คะแนน' },
    { key: 'is_published', label: 'เผยแพร่', type: 'bool' },
];
const fields = [
    { key: 'client_name', label: 'ชื่อลูกค้า', type: 'text', required: true },
    { key: 'client_company', label: 'บริษัท', type: 'text' },
    { key: 'client_role_th', label: 'ตำแหน่ง (TH)', type: 'text' },
    { key: 'client_role_en', label: 'ตำแหน่ง (EN)', type: 'text' },
    { key: 'content_th', label: 'ข้อความรีวิว (TH)', type: 'textarea', required: true },
    { key: 'content_en', label: 'ข้อความรีวิว (EN)', type: 'textarea', required: true },
    { key: 'avatar_path', label: 'รูปลูกค้า', type: 'image', folder: 'testimonials' },
    {
        key: 'project_id',
        label: 'ผูกกับผลงาน',
        type: 'relation',
        nullable: true,
        relation: { table: 'projects', labelColumns: ['title_en'] },
    },
    { key: 'rating', label: 'คะแนน (1-5)', type: 'number' },
    { key: 'is_published', label: 'เผยแพร่บนเว็บไซต์', type: 'checkbox' },
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
    title: "รีวิวลูกค้า",
    subtitle: "Testimonials (เฉพาะที่ติ๊ก 'เผยแพร่' จะแสดงบนเว็บ)",
    table: "testimonials",
    listColumns: (__VLS_ctx.listColumns),
    fields: (__VLS_ctx.fields),
    orderBy: ({ column: 'sort_order', ascending: true }),
    defaults: ({ rating: 5, is_published: true }),
}));
const __VLS_9 = __VLS_8({
    title: "รีวิวลูกค้า",
    subtitle: "Testimonials (เฉพาะที่ติ๊ก 'เผยแพร่' จะแสดงบนเว็บ)",
    table: "testimonials",
    listColumns: (__VLS_ctx.listColumns),
    fields: (__VLS_ctx.fields),
    orderBy: ({ column: 'sort_order', ascending: true }),
    defaults: ({ rating: 5, is_published: true }),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
// @ts-ignore
[listColumns, fields,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=Testimonials.vue.js.map