<template>
    <AdminLayout>
        <ResourceManager
            title="รีวิวลูกค้า"
            subtitle="Testimonials (เฉพาะที่ติ๊ก 'เผยแพร่' จะแสดงบนเว็บ)"
            table="testimonials"
            :list-columns="listColumns"
            :fields="fields"
            :order-by="{ column: 'sort_order', ascending: true }"
            :defaults="{ rating: 5, is_published: true }"
        />
    </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import ResourceManager from '@/Components/Admin/ResourceManager.vue';
import type { FieldDef, ListColumn } from '@/types/admin';

const listColumns: ListColumn[] = [
    { key: 'avatar_path', label: 'รูป', type: 'image' },
    { key: 'client_name', label: 'ชื่อลูกค้า' },
    { key: 'rating', label: 'คะแนน' },
    { key: 'is_published', label: 'เผยแพร่', type: 'bool' },
];

const fields: FieldDef[] = [
    { key: 'client_name', label: 'ชื่อลูกค้า', type: 'text', required: true },
    { key: 'client_company', label: 'บริษัท', type: 'text' },
    { key: 'client_role_th', label: 'ตำแหน่ง (TH)', type: 'text' },
    { key: 'client_role_en', label: 'ตำแหน่ง (EN)', type: 'text' },
    { key: 'content_th', label: 'ข้อความรีวิว (TH)', type: 'textarea', required: true },
    { key: 'content_en', label: 'ข้อความรีวิว (EN)', type: 'textarea', required: true },
    { key: 'avatar_path', label: 'รูปลูกค้า', type: 'image', folder: 'testimonials' },
    {
        key: 'project_id',
        label: 'ผูกกับผลงาน',
        type: 'relation',
        nullable: true,
        relation: { table: 'projects', labelColumns: ['title_en'] },
    },
    { key: 'rating', label: 'คะแนน (1-5)', type: 'number' },
    { key: 'is_published', label: 'เผยแพร่บนเว็บไซต์', type: 'checkbox' },
    { key: 'sort_order', label: 'ลำดับการแสดง', type: 'number' },
];
</script>
