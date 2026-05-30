<template>
    <AdminLayout>
        <ResourceManager
            title="ขั้นตอนการทำงาน"
            subtitle="Process timeline ในหน้า Freelance"
            table="process_steps"
            :list-columns="listColumns"
            :fields="fields"
            :order-by="{ column: 'step_number', ascending: true }"
        />
    </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import ResourceManager from '@/Components/Admin/ResourceManager.vue';
import type { FieldDef, ListColumn } from '@/types/admin';

const listColumns: ListColumn[] = [
    { key: 'step_number', label: 'ลำดับ' },
    { key: 'title_en', label: 'หัวข้อ (EN)' },
    { key: 'icon', label: 'ไอคอน' },
];

const fields: FieldDef[] = [
    { key: 'step_number', label: 'ลำดับขั้นตอน', type: 'number', required: true },
    { key: 'title_th', label: 'หัวข้อ (TH)', type: 'text', required: true },
    { key: 'title_en', label: 'หัวข้อ (EN)', type: 'text', required: true },
    { key: 'description_th', label: 'รายละเอียด (TH)', type: 'textarea', required: true },
    { key: 'description_en', label: 'รายละเอียด (EN)', type: 'textarea', required: true },
    { key: 'icon', label: 'ไอคอน', type: 'text', placeholder: 'เช่น zap, code, wrench', help: 'ชื่อไอคอนจากชุด Icon' },
];
</script>
