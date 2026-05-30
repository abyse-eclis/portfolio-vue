<template>
    <AdminLayout>
        <header class="mb-5">
            <h1 class="font-display text-2xl text-white">ข้อความติดต่อ</h1>
            <p class="mt-1 text-sm text-slate-400">Contact submissions จากฟอร์มบนเว็บ</p>
        </header>

        <p v-if="error" class="rounded-lg bg-rose-500/10 px-4 py-2 text-sm text-rose-300">{{ error }}</p>
        <p v-if="loading" class="text-slate-400">กำลังโหลด…</p>
        <p v-else-if="rows.length === 0" class="text-slate-500">ยังไม่มีข้อความ</p>

        <div v-else class="space-y-3">
            <article
                v-for="row in rows"
                :key="row.id"
                class="rounded-2xl border bg-space-800/40 p-4"
                :class="row.is_read ? 'border-white/10' : 'border-primary-500/40'"
            >
                <div class="flex flex-wrap items-center gap-2">
                    <span class="font-medium text-white">{{ row.name }}</span>
                    <a :href="`mailto:${row.email}`" class="text-sm text-primary-300 hover:underline">{{ row.email }}</a>
                    <span
                        class="rounded-full px-2 py-0.5 text-xs"
                        :class="row.mode === 'freelance' ? 'bg-accent-500/15 text-accent-300' : 'bg-primary-500/15 text-primary-300'"
                    >
                        {{ row.mode }}
                    </span>
                    <span v-if="!row.is_read" class="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-300">
                        ใหม่
                    </span>
                    <span class="ml-auto text-xs text-slate-500">{{ formatDate(row.created_at) }}</span>
                </div>

                <p v-if="row.subject" class="mt-2 text-sm font-medium text-slate-200">{{ row.subject }}</p>
                <p class="mt-1 whitespace-pre-wrap text-sm text-slate-300">{{ row.message }}</p>

                <div class="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                    <span v-if="row.phone">โทร: {{ row.phone }}</span>
                    <span v-if="row.metadata?.package_slug">แพ็กเกจ: {{ row.metadata.package_slug }}</span>
                    <span v-if="row.metadata?.locale">ภาษา: {{ row.metadata.locale }}</span>
                </div>

                <div class="mt-3 flex gap-2">
                    <button
                        class="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/5"
                        @click="toggleRead(row)"
                    >
                        {{ row.is_read ? 'ทำเป็นยังไม่อ่าน' : 'ทำเป็นอ่านแล้ว' }}
                    </button>
                    <button
                        class="rounded-lg px-3 py-1.5 text-xs text-rose-300 hover:bg-rose-500/10"
                        @click="remove(row)"
                    >
                        ลบ
                    </button>
                </div>
            </article>
        </div>
    </AdminLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { supabase } from '@/lib/supabase';

interface Submission {
    id: number;
    mode: string;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    metadata: Record<string, any> | null;
    is_read: boolean;
    created_at: string;
}

const rows = ref<Submission[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

function formatDate(iso: string) {
    try {
        return new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso));
    } catch {
        return iso;
    }
}

async function load() {
    loading.value = true;
    const { data, error: e } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
    rows.value = (data as Submission[]) ?? [];
    error.value = e ? e.message : null;
    loading.value = false;
}

async function toggleRead(row: Submission) {
    const next = !row.is_read;
    const { error: e } = await supabase.from('contact_submissions').update({ is_read: next }).eq('id', row.id);
    if (!e) row.is_read = next;
    else error.value = e.message;
}

async function remove(row: Submission) {
    if (!window.confirm('ลบข้อความนี้?')) return;
    const { error: e } = await supabase.from('contact_submissions').delete().eq('id', row.id);
    if (e) error.value = e.message;
    else rows.value = rows.value.filter((r) => r.id !== row.id);
}

onMounted(load);
</script>
