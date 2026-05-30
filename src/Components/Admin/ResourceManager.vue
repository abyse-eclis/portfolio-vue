<template>
    <section class="space-y-5">
        <header class="flex items-center justify-between gap-4">
            <div>
                <h1 class="font-display text-2xl text-white">{{ title }}</h1>
                <p v-if="subtitle" class="text-sm text-slate-400">{{ subtitle }}</p>
            </div>
            <Button size="sm" @click="openCreate">+ เพิ่มรายการ</Button>
        </header>

        <p v-if="error" class="rounded-lg bg-rose-500/10 px-4 py-2 text-sm text-rose-300">
            {{ error }}
        </p>

        <div class="overflow-x-auto rounded-2xl border border-white/10 bg-space-800/40">
            <table class="w-full text-left text-sm">
                <thead class="border-b border-white/10 text-xs uppercase tracking-wide text-slate-400">
                    <tr>
                        <th v-for="col in listColumns" :key="col.key" class="px-4 py-3 font-medium">
                            {{ col.label }}
                        </th>
                        <th class="px-4 py-3 text-right font-medium">จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="loading">
                        <td :colspan="listColumns.length + 1" class="px-4 py-8 text-center text-slate-400">
                            กำลังโหลด…
                        </td>
                    </tr>
                    <tr v-else-if="rows.length === 0">
                        <td :colspan="listColumns.length + 1" class="px-4 py-8 text-center text-slate-500">
                            ยังไม่มีข้อมูล
                        </td>
                    </tr>
                    <tr
                        v-for="row in rows"
                        :key="row.id"
                        class="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                    >
                        <td v-for="col in listColumns" :key="col.key" class="px-4 py-3 align-middle">
                            <span v-if="col.type === 'bool'">
                                <span
                                    :class="row[col.key]
                                        ? 'bg-emerald-500/15 text-emerald-300'
                                        : 'bg-slate-500/15 text-slate-400'"
                                    class="rounded-full px-2 py-0.5 text-xs"
                                >
                                    {{ row[col.key] ? 'ใช่' : 'ไม่' }}
                                </span>
                            </span>
                            <img
                                v-else-if="col.type === 'image'"
                                :src="getPublicUrl(row[col.key]) ?? ''"
                                alt=""
                                class="h-10 w-10 rounded object-cover bg-space-700"
                            />
                            <span v-else class="text-slate-200">{{ display(row[col.key]) }}</span>
                        </td>
                        <td class="px-4 py-3 text-right">
                            <div class="inline-flex gap-1">
                                <button
                                    class="rounded-lg px-2.5 py-1.5 text-xs text-primary-300 hover:bg-primary-500/10"
                                    @click="openEdit(row)"
                                >
                                    แก้ไข
                                </button>
                                <button
                                    class="rounded-lg px-2.5 py-1.5 text-xs text-rose-300 hover:bg-rose-500/10"
                                    @click="confirmRemove(row)"
                                >
                                    ลบ
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Form modal -->
        <div
            v-if="showForm"
            class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 py-10"
            @click.self="closeForm"
        >
            <div class="w-full max-w-2xl rounded-2xl border border-white/10 bg-space-900 p-6 shadow-2xl">
                <div class="mb-5 flex items-center justify-between">
                    <h2 class="font-display text-xl text-white">
                        {{ editing ? 'แก้ไข' : 'เพิ่ม' }} {{ title }}
                    </h2>
                    <button class="text-slate-400 hover:text-white" @click="closeForm">
                        <Icon name="x" :size="20" />
                    </button>
                </div>

                <form class="space-y-4" @submit.prevent="save">
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div
                            v-for="field in fields"
                            :key="field.key"
                            :class="fieldSpan(field) ? 'sm:col-span-2' : ''"
                            class="space-y-1.5"
                        >
                            <label class="block text-sm font-medium text-slate-300">
                                {{ field.label }}
                                <span v-if="field.required" class="text-rose-400">*</span>
                            </label>

                            <!-- textarea -->
                            <textarea
                                v-if="field.type === 'textarea'"
                                v-model="form[field.key]"
                                rows="3"
                                :placeholder="field.placeholder"
                                class="admin-input"
                            />

                            <!-- number -->
                            <input
                                v-else-if="field.type === 'number'"
                                v-model.number="form[field.key]"
                                type="number"
                                :step="field.step ?? 1"
                                :placeholder="field.placeholder"
                                class="admin-input"
                            />

                            <!-- checkbox -->
                            <label
                                v-else-if="field.type === 'checkbox'"
                                class="flex cursor-pointer items-center gap-2 text-sm text-slate-300"
                            >
                                <input v-model="form[field.key]" type="checkbox" class="h-4 w-4 rounded" />
                                เปิดใช้งาน
                            </label>

                            <!-- date -->
                            <input
                                v-else-if="field.type === 'date'"
                                v-model="form[field.key]"
                                type="date"
                                class="admin-input"
                            />

                            <!-- select -->
                            <select
                                v-else-if="field.type === 'select'"
                                v-model="form[field.key]"
                                class="admin-input"
                            >
                                <option v-if="field.nullable" :value="null">—</option>
                                <option v-for="opt in field.options" :key="String(opt.value)" :value="opt.value">
                                    {{ opt.label }}
                                </option>
                            </select>

                            <!-- relation -->
                            <select
                                v-else-if="field.type === 'relation'"
                                v-model="form[field.key]"
                                class="admin-input"
                            >
                                <option v-if="field.nullable" :value="null">—</option>
                                <option
                                    v-for="opt in relationOptions[field.key] ?? []"
                                    :key="String(opt.value)"
                                    :value="opt.value"
                                >
                                    {{ opt.label }}
                                </option>
                            </select>

                            <!-- image -->
                            <ImageUploader
                                v-else-if="field.type === 'image'"
                                v-model="form[field.key]"
                                :folder="field.folder ?? 'uploads'"
                                @meta="(m) => onImageMeta(field, m)"
                            />

                            <!-- tags (string[]) -->
                            <input
                                v-else-if="field.type === 'tags'"
                                :value="(form[field.key] ?? []).join(', ')"
                                :placeholder="field.placeholder ?? 'vue, typescript, …'"
                                class="admin-input"
                                @input="setTags(field.key, ($event.target as HTMLInputElement).value)"
                            />

                            <!-- gallery -->
                            <GalleryEditor
                                v-else-if="field.type === 'gallery'"
                                v-model="form[field.key]"
                            />

                            <!-- text (default) -->
                            <input
                                v-else
                                v-model="form[field.key]"
                                type="text"
                                :placeholder="field.placeholder"
                                class="admin-input"
                            />

                            <p v-if="field.help" class="text-xs text-slate-500">{{ field.help }}</p>
                        </div>
                    </div>

                    <p v-if="formError" class="text-sm text-rose-400">{{ formError }}</p>

                    <div class="flex justify-end gap-2 pt-2">
                        <Button variant="ghost" type="button" @click="closeForm">ยกเลิก</Button>
                        <Button type="submit" :disabled="saving">
                            {{ saving ? 'กำลังบันทึก…' : 'บันทึก' }}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import Button from '@/Components/Shared/Button.vue';
import Icon from '@/Components/Shared/Icon.vue';
import ImageUploader from '@/Components/Admin/ImageUploader.vue';
import GalleryEditor from '@/Components/Admin/GalleryEditor.vue';
import { useAdminResource } from '@/Composables/useAdminResource';
import { useSupabaseImage } from '@/Composables/useSupabaseImage';
import { supabase } from '@/lib/supabase';
import type { FieldDef, ListColumn } from '@/types/admin';

const props = defineProps<{
    title: string;
    subtitle?: string;
    table: string;
    listColumns: ListColumn[];
    fields: FieldDef[];
    orderBy?: { column: string; ascending?: boolean };
    defaults?: Record<string, any>;
}>();

const resource = useAdminResource(props.table);
const { getPublicUrl } = useSupabaseImage();

const rows = ref<Record<string, any>[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const showForm = ref(false);
const editing = ref<Record<string, any> | null>(null);
const form = reactive<Record<string, any>>({});
const formError = ref<string | null>(null);
const saving = ref(false);

const relationOptions = ref<Record<string, { value: any; label: string }[]>>({});

function display(v: unknown): string {
    if (v === null || v === undefined || v === '') return '—';
    if (Array.isArray(v)) return v.length ? `${v.length} รายการ` : '—';
    if (typeof v === 'object') return JSON.stringify(v).slice(0, 40);
    return String(v);
}

function fieldSpan(field: FieldDef): boolean {
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
        if (field.type !== 'relation' || !field.relation) continue;
        const { table, valueColumn = 'id', labelColumns } = field.relation;
        const { data } = await supabase.from(table).select([valueColumn, ...labelColumns].join(', '));
        relationOptions.value[field.key] = ((data as Record<string, any>[]) ?? []).map((r) => ({
            value: r[valueColumn],
            label: labelColumns.map((c) => r[c]).filter(Boolean).join(' — ') || `#${r[valueColumn]}`,
        }));
    }
}

function blankForm(): Record<string, any> {
    const base: Record<string, any> = { ...(props.defaults ?? {}) };
    for (const field of props.fields) {
        if (field.key in base) continue;
        if (field.type === 'checkbox') base[field.key] = false;
        else if (field.type === 'tags' || field.type === 'gallery') base[field.key] = [];
        else if (field.type === 'number') base[field.key] = 0;
        else base[field.key] = field.nullable ? null : '';
    }
    return base;
}

function openCreate() {
    editing.value = null;
    formError.value = null;
    Object.assign(form, blankForm());
    showForm.value = true;
}

function openEdit(row: Record<string, any>) {
    editing.value = row;
    formError.value = null;
    const next = blankForm();
    for (const field of props.fields) {
        if (row[field.key] !== undefined && row[field.key] !== null) next[field.key] = row[field.key];
    }
    Object.assign(form, next);
    showForm.value = true;
}

function closeForm() {
    showForm.value = false;
}

function setTags(key: string, value: string) {
    form[key] = value
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
}

function onImageMeta(field: FieldDef, meta: { orientation: string }) {
    if (field.detectInto) form[field.detectInto] = meta.orientation;
}

function buildPayload(): Record<string, any> {
    const payload: Record<string, any> = {};
    for (const field of props.fields) {
        let value = form[field.key];
        if (field.type === 'number') value = value === '' || value === null ? null : Number(value);
        if (!field.required && (value === '' || value === undefined)) value = null;
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
    let result: { error: string | null };
    if (editing.value) {
        payload.updated_at = new Date().toISOString();
        result = await resource.update(editing.value.id, payload);
    } else {
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

async function confirmRemove(row: Record<string, any>) {
    if (!window.confirm('ลบรายการนี้? การลบไม่สามารถย้อนกลับได้')) return;
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

defineExpose({ load });
</script>
