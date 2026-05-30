import AdminLayout from '@/Layouts/AdminLayout.vue';
import ResourceManager from '@/Components/Admin/ResourceManager.vue';
const listColumns = [
    { key: 'thumbnail_path', label: 'รูป', type: 'image' },
    { key: 'title_en', label: 'ชื่อ (EN)' },
    { key: 'type', label: 'ประเภท' },
    { key: 'is_featured', label: 'เด่น', type: 'bool' },
    { key: 'sort_order', label: 'ลำดับ' },
];
const fields = [
    { key: 'slug', label: 'Slug (URL)', type: 'text', required: true, placeholder: 'my-project', wide: true },
    { key: 'title_th', label: 'ชื่อ (TH)', type: 'text', required: true },
    { key: 'title_en', label: 'ชื่อ (EN)', type: 'text', required: true },
    { key: 'description_th', label: 'รายละเอียด (TH)', type: 'textarea', required: true },
    { key: 'description_en', label: 'รายละเอียด (EN)', type: 'textarea', required: true },
    { key: 'role_th', label: 'บทบาท (TH)', type: 'text' },
    { key: 'role_en', label: 'บทบาท (EN)', type: 'text' },
    {
        key: 'type',
        label: 'ประเภท',
        type: 'select',
        options: [
            { value: 'web', label: 'Web' },
            { value: 'mobile', label: 'Mobile' },
            { value: 'api', label: 'API / Backend' },
            { value: 'design', label: 'Design' },
            { value: 'other', label: 'อื่นๆ' },
        ],
    },
    { key: 'thumbnail_path', label: 'รูปย่อ (thumbnail)', type: 'image', folder: 'projects' },
    { key: 'cover_path', label: 'รูปปก (cover)', type: 'image', folder: 'projects' },
    { key: 'url', label: 'ลิงก์เว็บไซต์', type: 'text', placeholder: 'https://…' },
    { key: 'repo_url', label: 'ลิงก์ repo', type: 'text', placeholder: 'https://github.com/…' },
    { key: 'tech_stack', label: 'Tech stack', type: 'tags', help: 'คั่นด้วยจุลภาค เช่น vue, typescript, supabase', wide: true },
    { key: 'gallery', label: 'แกลเลอรีรูป', type: 'gallery' },
    { key: 'is_featured', label: 'แสดงเป็นผลงานเด่น', type: 'checkbox' },
    { key: 'show_in_freelance', label: 'แสดงในหน้า Freelance', type: 'checkbox' },
    { key: 'sort_order', label: 'ลำดับการแสดง', type: 'number' },
    { key: 'completed_at', label: 'วันที่ทำเสร็จ', type: 'date' },
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
    title: "ผลงาน",
    subtitle: "Projects ที่แสดงในหน้า Portfolio และ Freelance",
    table: "projects",
    listColumns: (__VLS_ctx.listColumns),
    fields: (__VLS_ctx.fields),
    orderBy: ({ column: 'sort_order', ascending: true }),
}));
const __VLS_9 = __VLS_8({
    title: "ผลงาน",
    subtitle: "Projects ที่แสดงในหน้า Portfolio และ Freelance",
    table: "projects",
    listColumns: (__VLS_ctx.listColumns),
    fields: (__VLS_ctx.fields),
    orderBy: ({ column: 'sort_order', ascending: true }),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
// @ts-ignore
[listColumns, fields,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=Projects.vue.js.map