import AdminLayout from '@/Layouts/AdminLayout.vue';
import ResourceManager from '@/Components/Admin/ResourceManager.vue';
const listColumns = [
    { key: 'image_path', label: 'รูป', type: 'image' },
    { key: 'title_en', label: 'ชื่อ (EN)' },
    { key: 'issuer', label: 'ผู้ออก' },
    { key: 'orientation', label: 'แนว' },
    { key: 'issued_at', label: 'วันที่ออก' },
];
const fields = [
    { key: 'title_th', label: 'ชื่อ (TH)', type: 'text', required: true },
    { key: 'title_en', label: 'ชื่อ (EN)', type: 'text', required: true },
    { key: 'issuer', label: 'ผู้ออกใบรับรอง', type: 'text', required: true },
    {
        key: 'image_path',
        label: 'รูปใบรับรอง',
        type: 'image',
        folder: 'certificates',
        detectInto: 'orientation',
        help: 'ระบบจะตั้งแนวอัตโนมัติจากสัดส่วนรูป ปรับแก้ได้ด้านล่าง',
    },
    {
        key: 'orientation',
        label: 'แนวการแสดงผล',
        type: 'select',
        options: [
            { value: 'landscape', label: 'แนวนอน (Landscape)' },
            { value: 'portrait', label: 'แนวตั้ง (Portrait)' },
        ],
    },
    { key: 'credential_url', label: 'ลิงก์ตรวจสอบ', type: 'text', placeholder: 'https://…' },
    { key: 'issued_at', label: 'วันที่ออก', type: 'date', required: true },
    { key: 'expires_at', label: 'วันหมดอายุ', type: 'date' },
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
    title: "ใบรับรอง",
    subtitle: "รองรับทั้งแนวนอนและแนวตั้ง (ระบบตรวจจับอัตโนมัติตอนอัปโหลด ปรับแก้ได้)",
    table: "certificates",
    listColumns: (__VLS_ctx.listColumns),
    fields: (__VLS_ctx.fields),
    orderBy: ({ column: 'issued_at', ascending: false }),
    defaults: ({ orientation: 'landscape' }),
}));
const __VLS_9 = __VLS_8({
    title: "ใบรับรอง",
    subtitle: "รองรับทั้งแนวนอนและแนวตั้ง (ระบบตรวจจับอัตโนมัติตอนอัปโหลด ปรับแก้ได้)",
    table: "certificates",
    listColumns: (__VLS_ctx.listColumns),
    fields: (__VLS_ctx.fields),
    orderBy: ({ column: 'issued_at', ascending: false }),
    defaults: ({ orientation: 'landscape' }),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
// @ts-ignore
[listColumns, fields,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=Certificates.vue.js.map