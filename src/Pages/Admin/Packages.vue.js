import AdminLayout from '@/Layouts/AdminLayout.vue';
import ResourceManager from '@/Components/Admin/ResourceManager.vue';
const packageColumns = [
    { key: 'name_en', label: 'ชื่อ (EN)' },
    { key: 'price', label: 'ราคา' },
    { key: 'currency', label: 'สกุล' },
    { key: 'is_recommended', label: 'แนะนำ', type: 'bool' },
];
const packageFields = [
    { key: 'slug', label: 'Slug', type: 'text', required: true, placeholder: 'starter' },
    { key: 'name_th', label: 'ชื่อ (TH)', type: 'text', required: true },
    { key: 'name_en', label: 'ชื่อ (EN)', type: 'text', required: true },
    { key: 'tagline_th', label: 'คำโปรย (TH)', type: 'text' },
    { key: 'tagline_en', label: 'คำโปรย (EN)', type: 'text' },
    { key: 'description_th', label: 'รายละเอียด (TH)', type: 'textarea' },
    { key: 'description_en', label: 'รายละเอียด (EN)', type: 'textarea' },
    { key: 'price', label: 'ราคา', type: 'number', step: 0.01, required: true },
    { key: 'currency', label: 'สกุลเงิน', type: 'text', placeholder: 'THB' },
    { key: 'is_recommended', label: 'แพ็กเกจแนะนำ (highlight)', type: 'checkbox' },
    { key: 'sort_order', label: 'ลำดับการแสดง', type: 'number' },
];
const featureColumns = [
    { key: 'feature_en', label: 'รายการ (EN)' },
    { key: 'included', label: 'รวมอยู่', type: 'bool' },
    { key: 'sort_order', label: 'ลำดับ' },
];
const featureFields = [
    {
        key: 'package_id',
        label: 'แพ็กเกจ',
        type: 'relation',
        required: true,
        relation: { table: 'packages', labelColumns: ['name_en'] },
    },
    { key: 'feature_th', label: 'รายการ (TH)', type: 'text', required: true },
    { key: 'feature_en', label: 'รายการ (EN)', type: 'text', required: true },
    { key: 'included', label: 'รวมอยู่ในแพ็กเกจ (ไม่ติ๊ก = ขีดฆ่า)', type: 'checkbox' },
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
    title: "แพ็กเกจ",
    subtitle: "Packages ในหน้า Freelance",
    table: "packages",
    listColumns: (__VLS_ctx.packageColumns),
    fields: (__VLS_ctx.packageFields),
    orderBy: ({ column: 'sort_order', ascending: true }),
    defaults: ({ currency: 'THB' }),
}));
const __VLS_9 = __VLS_8({
    title: "แพ็กเกจ",
    subtitle: "Packages ในหน้า Freelance",
    table: "packages",
    listColumns: (__VLS_ctx.packageColumns),
    fields: (__VLS_ctx.packageFields),
    orderBy: ({ column: 'sort_order', ascending: true }),
    defaults: ({ currency: 'THB' }),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const __VLS_12 = ResourceManager;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    title: "รายการในแพ็กเกจ",
    subtitle: "Package features — แต่ละรายการต้องเลือกแพ็กเกจ",
    table: "package_features",
    listColumns: (__VLS_ctx.featureColumns),
    fields: (__VLS_ctx.featureFields),
    orderBy: ({ column: 'sort_order', ascending: true }),
    defaults: ({ included: true }),
}));
const __VLS_14 = __VLS_13({
    title: "รายการในแพ็กเกจ",
    subtitle: "Package features — แต่ละรายการต้องเลือกแพ็กเกจ",
    table: "package_features",
    listColumns: (__VLS_ctx.featureColumns),
    fields: (__VLS_ctx.featureFields),
    orderBy: ({ column: 'sort_order', ascending: true }),
    defaults: ({ included: true }),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
// @ts-ignore
[packageColumns, packageFields, featureColumns, featureFields,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=Packages.vue.js.map