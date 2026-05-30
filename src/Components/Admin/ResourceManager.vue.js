import { onMounted, reactive, ref } from 'vue';
import Button from '@/Components/Shared/Button.vue';
import Icon from '@/Components/Shared/Icon.vue';
import ImageUploader from '@/Components/Admin/ImageUploader.vue';
import GalleryEditor from '@/Components/Admin/GalleryEditor.vue';
import { useAdminResource } from '@/Composables/useAdminResource';
import { useSupabaseImage } from '@/Composables/useSupabaseImage';
import { supabase } from '@/lib/supabase';
const props = defineProps();
const resource = useAdminResource(props.table);
const { getPublicUrl } = useSupabaseImage();
const rows = ref([]);
const loading = ref(true);
const error = ref(null);
const showForm = ref(false);
const editing = ref(null);
const form = reactive({});
const formError = ref(null);
const saving = ref(false);
const relationOptions = ref({});
function display(v) {
    if (v === null || v === undefined || v === '')
        return '—';
    if (Array.isArray(v))
        return v.length ? `${v.length} รายการ` : '—';
    if (typeof v === 'object')
        return JSON.stringify(v).slice(0, 40);
    return String(v);
}
function fieldSpan(field) {
    return field.wide || ['textarea', 'gallery', 'image'].includes(field.type);
}
async function load() {
    loading.value = true;
    const { data, error: e } = await resource.list({ orderBy: props.orderBy });
    rows.value = data;
    error.value = e;
    loading.value = false;
}
async function loadRelations() {
    for (const field of props.fields) {
        if (field.type !== 'relation' || !field.relation)
            continue;
        const { table, valueColumn = 'id', labelColumns } = field.relation;
        const { data } = await supabase.from(table).select([valueColumn, ...labelColumns].join(', '));
        relationOptions.value[field.key] = (data ?? []).map((r) => ({
            value: r[valueColumn],
            label: labelColumns.map((c) => r[c]).filter(Boolean).join(' — ') || `#${r[valueColumn]}`,
        }));
    }
}
function blankForm() {
    const base = { ...(props.defaults ?? {}) };
    for (const field of props.fields) {
        if (field.key in base)
            continue;
        if (field.type === 'checkbox')
            base[field.key] = false;
        else if (field.type === 'tags' || field.type === 'gallery')
            base[field.key] = [];
        else if (field.type === 'number')
            base[field.key] = 0;
        else
            base[field.key] = field.nullable ? null : '';
    }
    return base;
}
function openCreate() {
    editing.value = null;
    formError.value = null;
    Object.assign(form, blankForm());
    showForm.value = true;
}
function openEdit(row) {
    editing.value = row;
    formError.value = null;
    const next = blankForm();
    for (const field of props.fields) {
        if (row[field.key] !== undefined && row[field.key] !== null)
            next[field.key] = row[field.key];
    }
    Object.assign(form, next);
    showForm.value = true;
}
function closeForm() {
    showForm.value = false;
}
function setTags(key, value) {
    form[key] = value
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
}
function onImageMeta(field, meta) {
    if (field.detectInto)
        form[field.detectInto] = meta.orientation;
}
function buildPayload() {
    const payload = {};
    for (const field of props.fields) {
        let value = form[field.key];
        if (field.type === 'number')
            value = value === '' || value === null ? null : Number(value);
        if (!field.required && (value === '' || value === undefined))
            value = null;
        payload[field.key] = value;
    }
    return payload;
}
async function save() {
    formError.value = null;
    for (const field of props.fields) {
        if (field.required && (form[field.key] === '' || form[field.key] === null || form[field.key] === undefined)) {
            formError.value = `กรุณากรอก "${field.label}"`;
            return;
        }
    }
    saving.value = true;
    const payload = buildPayload();
    let result;
    if (editing.value) {
        payload.updated_at = new Date().toISOString();
        result = await resource.update(editing.value.id, payload);
    }
    else {
        result = await resource.insert(payload);
    }
    saving.value = false;
    if (result.error) {
        formError.value = result.error;
        return;
    }
    showForm.value = false;
    await load();
}
async function confirmRemove(row) {
    if (!window.confirm('ลบรายการนี้? การลบไม่สามารถย้อนกลับได้'))
        return;
    const { error: e } = await resource.remove(row.id);
    if (e) {
        error.value = e;
        return;
    }
    await load();
}
onMounted(async () => {
    await Promise.all([load(), loadRelations()]);
});
const __VLS_exposed = { load };
defineExpose(__VLS_exposed);
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "space-y-5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "flex items-center justify-between gap-4" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "font-display text-2xl text-white" },
});
/** @type {__VLS_StyleScopedClasses['font-display']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
(__VLS_ctx.title);
if (__VLS_ctx.subtitle) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-sm text-slate-400" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
    (__VLS_ctx.subtitle);
}
const __VLS_0 = Button || Button;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    size: "sm",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ click: {} },
    { onClick: (__VLS_ctx.openCreate) });
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[title, subtitle, subtitle, openCreate,];
var __VLS_3;
var __VLS_4;
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "rounded-lg bg-rose-500/10 px-4 py-2 text-sm text-rose-300" },
    });
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-rose-500/10']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-rose-300']} */ ;
    (__VLS_ctx.error);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "overflow-x-auto rounded-2xl border border-white/10 bg-space-800/40" },
});
/** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-space-800/40']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.table, __VLS_intrinsics.table)({
    ...{ class: "w-full text-left text-sm" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.thead, __VLS_intrinsics.thead)({
    ...{ class: "border-b border-white/10 text-xs uppercase tracking-wide text-slate-400" },
});
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-wide']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({});
for (const [col] of __VLS_vFor((__VLS_ctx.listColumns))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({
        key: (col.key),
        ...{ class: "px-4 py-3 font-medium" },
    });
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    (col.label);
    // @ts-ignore
    [error, error, listColumns,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({
    ...{ class: "px-4 py-3 text-right font-medium" },
});
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.tbody, __VLS_intrinsics.tbody)({});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({
        colspan: (__VLS_ctx.listColumns.length + 1),
        ...{ class: "px-4 py-8 text-center text-slate-400" },
    });
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
}
else if (__VLS_ctx.rows.length === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({
        colspan: (__VLS_ctx.listColumns.length + 1),
        ...{ class: "px-4 py-8 text-center text-slate-500" },
    });
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-500']} */ ;
}
for (const [row] of __VLS_vFor((__VLS_ctx.rows))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
        key: (row.id),
        ...{ class: "border-b border-white/5 last:border-0 hover:bg-white/[0.02]" },
    });
    /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-white/5']} */ ;
    /** @type {__VLS_StyleScopedClasses['last:border-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-white/[0.02]']} */ ;
    for (const [col] of __VLS_vFor((__VLS_ctx.listColumns))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({
            key: (col.key),
            ...{ class: "px-4 py-3 align-middle" },
        });
        /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['align-middle']} */ ;
        if (col.type === 'bool') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: (row[col.key]
                        ? 'bg-emerald-500/15 text-emerald-300'
                        : 'bg-slate-500/15 text-slate-400') },
                ...{ class: "rounded-full px-2 py-0.5 text-xs" },
            });
            /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
            /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            (row[col.key] ? 'ใช่' : 'ไม่');
        }
        else if (col.type === 'image') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
                src: (__VLS_ctx.getPublicUrl(row[col.key]) ?? ''),
                alt: "",
                ...{ class: "h-10 w-10 rounded object-cover bg-space-700" },
            });
            /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
            /** @type {__VLS_StyleScopedClasses['w-10']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
            /** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
            /** @type {__VLS_StyleScopedClasses['bg-space-700']} */ ;
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-slate-200" },
            });
            /** @type {__VLS_StyleScopedClasses['text-slate-200']} */ ;
            (__VLS_ctx.display(row[col.key]));
        }
        // @ts-ignore
        [listColumns, listColumns, listColumns, loading, rows, rows, getPublicUrl, display,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({
        ...{ class: "px-4 py-3 text-right" },
    });
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "inline-flex gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.openEdit(row);
                // @ts-ignore
                [openEdit,];
            } },
        ...{ class: "rounded-lg px-2.5 py-1.5 text-xs text-primary-300 hover:bg-primary-500/10" },
    });
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-300']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-primary-500/10']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.confirmRemove(row);
                // @ts-ignore
                [confirmRemove,];
            } },
        ...{ class: "rounded-lg px-2.5 py-1.5 text-xs text-rose-300 hover:bg-rose-500/10" },
    });
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-rose-300']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-rose-500/10']} */ ;
    // @ts-ignore
    [];
}
if (__VLS_ctx.showForm) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (__VLS_ctx.closeForm) },
        ...{ class: "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 py-10" },
    });
    /** @type {__VLS_StyleScopedClasses['fixed']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-start']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-black/70']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-10']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full max-w-2xl rounded-2xl border border-white/10 bg-space-900 p-6 shadow-2xl" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-w-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-space-900']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-2xl']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mb-5 flex items-center justify-between" },
    });
    /** @type {__VLS_StyleScopedClasses['mb-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "font-display text-xl text-white" },
    });
    /** @type {__VLS_StyleScopedClasses['font-display']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
    (__VLS_ctx.editing ? 'แก้ไข' : 'เพิ่ม');
    (__VLS_ctx.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.closeForm) },
        ...{ class: "text-slate-400 hover:text-white" },
    });
    /** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-white']} */ ;
    const __VLS_8 = Icon;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
        name: "x",
        size: (20),
    }));
    const __VLS_10 = __VLS_9({
        name: "x",
        size: (20),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
        ...{ onSubmit: (__VLS_ctx.save) },
        ...{ class: "space-y-4" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-1 gap-4 sm:grid-cols-2" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
    for (const [field] of __VLS_vFor((__VLS_ctx.fields))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (field.key),
            ...{ class: (__VLS_ctx.fieldSpan(field) ? 'sm:col-span-2' : '') },
            ...{ class: "space-y-1.5" },
        });
        /** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
            ...{ class: "block text-sm font-medium text-slate-300" },
        });
        /** @type {__VLS_StyleScopedClasses['block']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-slate-300']} */ ;
        (field.label);
        if (field.required) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-rose-400" },
            });
            /** @type {__VLS_StyleScopedClasses['text-rose-400']} */ ;
        }
        if (field.type === 'textarea') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.textarea)({
                value: (__VLS_ctx.form[field.key]),
                rows: "3",
                placeholder: (field.placeholder),
                ...{ class: "admin-input" },
            });
            /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
        }
        else if (field.type === 'number') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
                type: "number",
                step: (field.step ?? 1),
                placeholder: (field.placeholder),
                ...{ class: "admin-input" },
            });
            (__VLS_ctx.form[field.key]);
            /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
        }
        else if (field.type === 'checkbox') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
                ...{ class: "flex cursor-pointer items-center gap-2 text-sm text-slate-300" },
            });
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-slate-300']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
                type: "checkbox",
                ...{ class: "h-4 w-4 rounded" },
            });
            (__VLS_ctx.form[field.key]);
            /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
            /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
        }
        else if (field.type === 'date') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
                type: "date",
                ...{ class: "admin-input" },
            });
            (__VLS_ctx.form[field.key]);
            /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
        }
        else if (field.type === 'select') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.select, __VLS_intrinsics.select)({
                value: (__VLS_ctx.form[field.key]),
                ...{ class: "admin-input" },
            });
            /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
            if (field.nullable) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
                    value: (null),
                });
            }
            for (const [opt] of __VLS_vFor((field.options))) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
                    key: (String(opt.value)),
                    value: (opt.value),
                });
                (opt.label);
                // @ts-ignore
                [title, showForm, closeForm, closeForm, editing, save, fields, fieldSpan, form, form, form, form, form,];
            }
        }
        else if (field.type === 'relation') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.select, __VLS_intrinsics.select)({
                value: (__VLS_ctx.form[field.key]),
                ...{ class: "admin-input" },
            });
            /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
            if (field.nullable) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
                    value: (null),
                });
            }
            for (const [opt] of __VLS_vFor((__VLS_ctx.relationOptions[field.key] ?? []))) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
                    key: (String(opt.value)),
                    value: (opt.value),
                });
                (opt.label);
                // @ts-ignore
                [form, relationOptions,];
            }
        }
        else if (field.type === 'image') {
            const __VLS_13 = ImageUploader;
            // @ts-ignore
            const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
                ...{ 'onMeta': {} },
                modelValue: (__VLS_ctx.form[field.key]),
                folder: (field.folder ?? 'uploads'),
            }));
            const __VLS_15 = __VLS_14({
                ...{ 'onMeta': {} },
                modelValue: (__VLS_ctx.form[field.key]),
                folder: (field.folder ?? 'uploads'),
            }, ...__VLS_functionalComponentArgsRest(__VLS_14));
            let __VLS_18;
            const __VLS_19 = ({ meta: {} },
                { onMeta: ((m) => __VLS_ctx.onImageMeta(field, m)) });
            var __VLS_16;
            var __VLS_17;
        }
        else if (field.type === 'tags') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
                ...{ onInput: (...[$event]) => {
                        if (!(__VLS_ctx.showForm))
                            return;
                        if (!!(field.type === 'textarea'))
                            return;
                        if (!!(field.type === 'number'))
                            return;
                        if (!!(field.type === 'checkbox'))
                            return;
                        if (!!(field.type === 'date'))
                            return;
                        if (!!(field.type === 'select'))
                            return;
                        if (!!(field.type === 'relation'))
                            return;
                        if (!!(field.type === 'image'))
                            return;
                        if (!(field.type === 'tags'))
                            return;
                        __VLS_ctx.setTags(field.key, $event.target.value);
                        // @ts-ignore
                        [form, onImageMeta, setTags,];
                    } },
                value: ((__VLS_ctx.form[field.key] ?? []).join(', ')),
                placeholder: (field.placeholder ?? 'vue, typescript, …'),
                ...{ class: "admin-input" },
            });
            /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
        }
        else if (field.type === 'gallery') {
            const __VLS_20 = GalleryEditor;
            // @ts-ignore
            const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
                modelValue: (__VLS_ctx.form[field.key]),
            }));
            const __VLS_22 = __VLS_21({
                modelValue: (__VLS_ctx.form[field.key]),
            }, ...__VLS_functionalComponentArgsRest(__VLS_21));
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
                value: (__VLS_ctx.form[field.key]),
                type: "text",
                placeholder: (field.placeholder),
                ...{ class: "admin-input" },
            });
            /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
        }
        if (field.help) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                ...{ class: "text-xs text-slate-500" },
            });
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-slate-500']} */ ;
            (field.help);
        }
        // @ts-ignore
        [form, form, form,];
    }
    if (__VLS_ctx.formError) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-sm text-rose-400" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-rose-400']} */ ;
        (__VLS_ctx.formError);
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex justify-end gap-2 pt-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['pt-2']} */ ;
    const __VLS_25 = Button || Button;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
        ...{ 'onClick': {} },
        variant: "ghost",
        type: "button",
    }));
    const __VLS_27 = __VLS_26({
        ...{ 'onClick': {} },
        variant: "ghost",
        type: "button",
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    let __VLS_30;
    const __VLS_31 = ({ click: {} },
        { onClick: (__VLS_ctx.closeForm) });
    const { default: __VLS_32 } = __VLS_28.slots;
    // @ts-ignore
    [closeForm, formError, formError,];
    var __VLS_28;
    var __VLS_29;
    const __VLS_33 = Button || Button;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({
        type: "submit",
        disabled: (__VLS_ctx.saving),
    }));
    const __VLS_35 = __VLS_34({
        type: "submit",
        disabled: (__VLS_ctx.saving),
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    const { default: __VLS_38 } = __VLS_36.slots;
    (__VLS_ctx.saving ? 'กำลังบันทึก…' : 'บันทึก');
    // @ts-ignore
    [saving, saving,];
    var __VLS_36;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => __VLS_exposed,
    __typeProps: {},
});
export default {};
//# sourceMappingURL=ResourceManager.vue.js.map