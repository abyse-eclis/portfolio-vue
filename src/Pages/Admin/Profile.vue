<template>
    <AdminLayout>
        <div class="w-full">
            <h1 class="font-display text-2xl text-white">โปรไฟล์</h1>
            <p class="mt-1 text-sm text-slate-400">ข้อมูลเจ้าของเว็บ (มีได้แถวเดียว)</p>

            <p v-if="loading" class="mt-6 text-slate-400">กำลังโหลด…</p>

            <form v-else class="mt-6 space-y-6" @submit.prevent="save">
                <div class="rounded-2xl border border-white/10 bg-space-800/40 p-5">
                    <h2 class="mb-4 font-display text-lg text-white">ทั่วไป</h2>
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field label="ชื่อ (TH)" required><input v-model="form.name_th" class="admin-input" /></Field>
                        <Field label="ชื่อ (EN)" required><input v-model="form.name_en" class="admin-input" /></Field>
                        <Field label="ปีประสบการณ์">
                            <input v-model.number="form.years_experience" type="number" class="admin-input" />
                        </Field>
                        <Field label="อีเมล"><input v-model="form.email" type="email" class="admin-input" /></Field>
                        <Field label="โทรศัพท์"><input v-model="form.phone" class="admin-input" /></Field>
                        <Field label="รูปโปรไฟล์" wide>
                            <ImageUploader v-model="form.avatar_path" folder="profile" />
                        </Field>
                        <Field label="Resume (object key ใน Storage)" wide>
                            <input v-model="form.resume_path" class="admin-input" placeholder="profile/resume.pdf" />
                        </Field>
                    </div>
                </div>

                <div role="tablist" class="flex gap-2 border-b border-white/10">
                    <button
                        v-for="tab in tabs"
                        :key="tab.key"
                        type="button"
                        role="tab"
                        :aria-selected="activeTab === tab.key"
                        class="-mb-px rounded-t-lg border-b-2 px-4 py-2.5 text-sm font-medium transition"
                        :class="activeTab === tab.key
                            ? 'border-primary-400 text-white'
                            : 'border-transparent text-slate-400 hover:text-slate-200'"
                        @click="activeTab = tab.key"
                    >
                        {{ tab.label }}
                    </button>
                </div>

                <div v-show="activeTab === 'portfolio'" class="space-y-6">
                    <div class="rounded-2xl border border-white/10 bg-space-800/40 p-5">
                        <h2 class="font-display text-lg text-white">ส่วน Hero</h2>
                        <p class="mb-4 mt-1 text-xs text-slate-400">หัวข้อใหญ่และคำอธิบายที่แสดงด้านบนสุดของหน้า Portfolio</p>
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field label="หัวข้อ Hero (TH)" required><input v-model="form.headline_th" class="admin-input" /></Field>
                            <Field label="หัวข้อ Hero (EN)" required><input v-model="form.headline_en" class="admin-input" /></Field>
                            <Field label="คำอธิบาย Hero (TH)" required wide><textarea v-model="form.bio_th" rows="3" class="admin-input" /></Field>
                            <Field label="คำอธิบาย Hero (EN)" required wide><textarea v-model="form.bio_en" rows="3" class="admin-input" /></Field>
                        </div>
                    </div>

                    <div class="rounded-2xl border border-white/10 bg-space-800/40 p-5">
                        <h2 class="font-display text-lg text-white">ส่วน About me</h2>
                        <p class="mb-4 mt-1 text-xs text-slate-400">หัวข้อและเนื้อหาของส่วนแนะนำตัว แยกจาก Hero</p>
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field label="หัวข้อ About (TH)" hint="เว้นว่างได้ — จะใช้หัวข้อ Hero แทน"><input v-model="form.about_heading_th" class="admin-input" /></Field>
                            <Field label="หัวข้อ About (EN)" hint="เว้นว่างได้ — จะใช้หัวข้อ Hero แทน"><input v-model="form.about_heading_en" class="admin-input" /></Field>
                            <Field label="เนื้อหา About (TH)" hint="เว้นว่างได้ — จะใช้คำอธิบาย Hero แทน" wide><textarea v-model="form.about_bio_th" rows="4" class="admin-input" /></Field>
                            <Field label="เนื้อหา About (EN)" hint="เว้นว่างได้ — จะใช้คำอธิบาย Hero แทน" wide><textarea v-model="form.about_bio_en" rows="4" class="admin-input" /></Field>
                        </div>
                    </div>
                </div>

                <div v-show="activeTab === 'freelance'" class="space-y-6">
                    <div class="rounded-2xl border border-white/10 bg-space-800/40 p-5">
                        <h2 class="font-display text-lg text-white">ส่วน Hero (Freelance)</h2>
                        <p class="mb-4 mt-1 text-xs text-slate-400">หัวข้อและคำอธิบายที่แสดงบนหน้า Freelance</p>
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field label="Tagline (TH)"><input v-model="form.freelance_tagline_th" class="admin-input" /></Field>
                            <Field label="Tagline (EN)"><input v-model="form.freelance_tagline_en" class="admin-input" /></Field>
                            <Field label="คำอธิบาย (TH)" wide><textarea v-model="form.freelance_bio_th" rows="4" class="admin-input" /></Field>
                            <Field label="คำอธิบาย (EN)" wide><textarea v-model="form.freelance_bio_en" rows="4" class="admin-input" /></Field>
                        </div>
                    </div>
                </div>

                <p v-if="message" :class="message.ok ? 'text-emerald-400' : 'text-rose-400'" class="text-sm">
                    {{ message.text }}
                </p>

                <div class="flex justify-end">
                    <Button type="submit" :disabled="saving">{{ saving ? 'กำลังบันทึก…' : 'บันทึก' }}</Button>
                </div>
            </form>
        </div>
    </AdminLayout>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import Button from '@/Components/Shared/Button.vue';
import ImageUploader from '@/Components/Admin/ImageUploader.vue';
import Field from '@/Components/Admin/AdminField.vue';
import { useAdminResource } from '@/Composables/useAdminResource';

const resource = useAdminResource('profiles');
const loading = ref(true);
const saving = ref(false);
const message = ref<{ ok: boolean; text: string } | null>(null);
const existingId = ref<number | null>(null);

type TabKey = 'portfolio' | 'freelance';
const tabs: { key: TabKey; label: string }[] = [
    { key: 'portfolio', label: 'Portfolio' },
    { key: 'freelance', label: 'Freelance' },
];
const activeTab = ref<TabKey>('portfolio');

const form = reactive<Record<string, any>>({
    name_th: '',
    name_en: '',
    email: '',
    phone: '',
    avatar_path: null,
    resume_path: '',
    headline_th: '',
    headline_en: '',
    about_heading_th: '',
    about_heading_en: '',
    bio_th: '',
    bio_en: '',
    about_bio_th: '',
    about_bio_en: '',
    freelance_tagline_th: '',
    freelance_tagline_en: '',
    freelance_bio_th: '',
    freelance_bio_en: '',
    years_experience: 0,
});

onMounted(async () => {
    const { data } = await resource.getSingle();
    if (data) {
        existingId.value = data.id;
        for (const key of Object.keys(form)) {
            if (data[key] !== undefined && data[key] !== null) form[key] = data[key];
        }
    }
    loading.value = false;
});

async function save() {
    if (!form.name_th || !form.name_en || !form.headline_th || !form.headline_en || !form.bio_th || !form.bio_en) {
        activeTab.value = 'portfolio';
        message.value = { ok: false, text: 'กรุณากรอกช่องที่มีเครื่องหมาย *' };
        return;
    }
    saving.value = true;
    message.value = null;

    const payload = { ...form };
    let error: string | null;
    if (existingId.value) {
        payload.updated_at = new Date().toISOString();
        ({ error } = await resource.update(existingId.value, payload));
    } else {
        const res = await resource.insert(payload);
        error = res.error;
        if (res.data) existingId.value = res.data.id;
    }
    saving.value = false;
    message.value = error ? { ok: false, text: error } : { ok: true, text: 'บันทึกเรียบร้อย' };
}
</script>
