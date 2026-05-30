import AdminLayout from '@/Layouts/AdminLayout.vue';
import ResourceManager from '@/Components/Admin/ResourceManager.vue';
const categoryColumns = [
    { key: 'name_en', label: 'ชื่อ (EN)' },
    { key: 'slug', label: 'Slug' },
    { key: 'icon', label: 'ไอคอน' },
    { key: 'sort_order', label: 'ลำดับ' },
];
const categoryFields = [
    { key: 'slug', label: 'Slug', type: 'text', required: true, placeholder: 'frontend' },
    { key: 'name_th', label: 'ชื่อ (TH)', type: 'text', required: true },
    { key: 'name_en', label: 'ชื่อ (EN)', type: 'text', required: true },
    { key: 'icon', label: 'ไอคอน', type: 'text', placeholder: 'code, server, palette, …' },
    { key: 'sort_order', label: 'ลำดับการแสดง', type: 'number' },
];
const skillColumns = [
    { key: 'icon_path', label: 'ไอคอน', type: 'image' },
    { key: 'name', label: 'ชื่อ' },
    { key: 'proficiency', label: 'ระดับ' },
    { key: 'sort_order', label: 'ลำดับ' },
];
const skillFields = [
    {
        key: 'skill_category_id',
        label: 'หมวดหมู่',
        type: 'relation',
        required: true,
        relation: { table: 'skill_categories', labelColumns: ['name_en'] },
    },
    { key: 'name', label: 'ชื่อทักษะ', type: 'text', required: true, placeholder: 'Vue.js' },
    {
        key: 'proficiency',
        label: 'ระดับความชำนาญ',
        type: 'select',
        required: true,
        options: [
            { value: 'basic', label: 'พื้นฐาน' },
            { value: 'intermediate', label: 'ปานกลาง' },
            { value: 'advanced', label: 'ดี' },
            { value: 'expert', label: 'เชี่ยวชาญ' },
        ],
        help: 'แสดงเป็นป้ายระดับบนหน้าเว็บ',
    },
    { key: 'icon_path', label: 'ไอคอน (รูป)', type: 'image', folder: 'skills' },
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-10" },
});
/** @type {__VLS_StyleScopedClasses['space-y-10']} */ ;
const __VLS_7 = ResourceManager;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    title: "หมวดหมู่ทักษะ",
    subtitle: "Skill categories — กลุ่มของทักษะ",
    table: "skill_categories",
    listColumns: (__VLS_ctx.categoryColumns),
    fields: (__VLS_ctx.categoryFields),
    orderBy: ({ column: 'sort_order', ascending: true }),
}));
const __VLS_9 = __VLS_8({
    title: "หมวดหมู่ทักษะ",
    subtitle: "Skill categories — กลุ่มของทักษะ",
    table: "skill_categories",
    listColumns: (__VLS_ctx.categoryColumns),
    fields: (__VLS_ctx.categoryFields),
    orderBy: ({ column: 'sort_order', ascending: true }),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const __VLS_12 = ResourceManager;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    title: "ทักษะ",
    subtitle: "Skills — แต่ละรายการต้องเลือกหมวดหมู่",
    table: "skills",
    listColumns: (__VLS_ctx.skillColumns),
    fields: (__VLS_ctx.skillFields),
    orderBy: ({ column: 'sort_order', ascending: true }),
    defaults: ({ proficiency: 'intermediate' }),
}));
const __VLS_14 = __VLS_13({
    title: "ทักษะ",
    subtitle: "Skills — แต่ละรายการต้องเลือกหมวดหมู่",
    table: "skills",
    listColumns: (__VLS_ctx.skillColumns),
    fields: (__VLS_ctx.skillFields),
    orderBy: ({ column: 'sort_order', ascending: true }),
    defaults: ({ proficiency: 'intermediate' }),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
// @ts-ignore
[categoryColumns, categoryFields, skillColumns, skillFields,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=Skills.vue.js.map