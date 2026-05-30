import AdminLayout from '@/Layouts/AdminLayout.vue';
import ResourceManager from '@/Components/Admin/ResourceManager.vue';
const listColumns = [
    { key: 'step_number', label: 'ลำดับ' },
    { key: 'title_en', label: 'หัวข้อ (EN)' },
    { key: 'icon', label: 'ไอคอน' },
];
const fields = [
    { key: 'step_number', label: 'ลำดับขั้นตอน', type: 'number', required: true },
    { key: 'title_th', label: 'หัวข้อ (TH)', type: 'text', required: true },
    { key: 'title_en', label: 'หัวข้อ (EN)', type: 'text', required: true },
    { key: 'description_th', label: 'รายละเอียด (TH)', type: 'textarea', required: true },
    { key: 'description_en', label: 'รายละเอียด (EN)', type: 'textarea', required: true },
    { key: 'icon', label: 'ไอคอน', type: 'text', placeholder: 'เช่น zap, code, wrench', help: 'ชื่อไอคอนจากชุด Icon' },
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
    title: "ขั้นตอนการทำงาน",
    subtitle: "Process timeline ในหน้า Freelance",
    table: "process_steps",
    listColumns: (__VLS_ctx.listColumns),
    fields: (__VLS_ctx.fields),
    orderBy: ({ column: 'step_number', ascending: true }),
}));
const __VLS_9 = __VLS_8({
    title: "ขั้นตอนการทำงาน",
    subtitle: "Process timeline ในหน้า Freelance",
    table: "process_steps",
    listColumns: (__VLS_ctx.listColumns),
    fields: (__VLS_ctx.fields),
    orderBy: ({ column: 'step_number', ascending: true }),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
// @ts-ignore
[listColumns, fields,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=ProcessSteps.vue.js.map