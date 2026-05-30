<template>
    <AdminLayout>
        <ResourceManager
            title="ผลงาน"
            subtitle="Projects ที่แสดงในหน้า Portfolio และ Freelance"
            table="projects"
            :list-columns="listColumns"
            :fields="fields"
            :order-by="{ column: 'sort_order', ascending: true }"
        />
    </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import ResourceManager from '@/Components/Admin/ResourceManager.vue';
import type { FieldDef, ListColumn } from '@/types/admin';

const listColumns: ListColumn[] = [
    { key: 'thumbnail_path', label: 'รูป', type: 'image' },
    { key: 'title_en', label: 'ชื่อ (EN)' },
    { key: 'type', label: 'ประเภท' },
    { key: 'is_featured', label: 'เด่น', type: 'bool' },
    { key: 'sort_order', label: 'ลำดับ' },
];

const fields: FieldDef[] = [
    { key: 'slug', label: 'Slug (URL)', type: 'text', required: true, placeholder: 'my-project', wide: true },
    { key: 'title_th', label: 'ชื่อ (TH)', type: 'text', required: true },
    { key: 'title_en', label: 'ชื่อ (EN)', type: 'text', required: true },
    { key: 'description_th', label: 'รายละเอียด (TH)', type: 'textarea', required: true },
    { key: 'description_en', label: 'รายละเอียด (EN)', type: 'textarea', required: true },
    { key: 'role_th', label: 'บทบาท (TH)', type: 'text' },
    { key: 'role_en', label: 'บทบาท (EN)', type: 'text' },
    {
        key: 'type',
        label: 'ประเภท',
        type: 'select',
        options: [
            { value: 'web', label: 'Web' },
            { value: 'mobile', label: 'Mobile' },
            { value: 'api', label: 'API / Backend' },
            { value: 'design', label: 'Design' },
            { value: 'other', label: 'อื่นๆ' },
        ],
    },
    { key: 'thumbnail_path', label: 'รูปย่อ (thumbnail)', type: 'image', folder: 'projects' },
    { key: 'cover_path', label: 'รูปปก (cover)', type: 'image', folder: 'projects' },
    { key: 'url', label: 'ลิงก์เว็บไซต์', type: 'text', placeholder: 'https://…' },
    { key: 'repo_url', label: 'ลิงก์ repo', type: 'text', placeholder: 'https://github.com/…' },
    { key: 'tech_stack', label: 'Tech stack', type: 'tags', help: 'คั่นด้วยจุลภาค เช่น vue, typescript, supabase', wide: true },
    { key: 'gallery', label: 'แกลเลอรีรูป', type: 'gallery' },
    { key: 'is_featured', label: 'แสดงเป็นผลงานเด่น', type: 'checkbox' },
    { key: 'show_in_freelance', label: 'แสดงในหน้า Freelance', type: 'checkbox' },
    { key: 'sort_order', label: 'ลำดับการแสดง', type: 'number' },
    { key: 'completed_at', label: 'วันที่ทำเสร็จ', type: 'date' },
];
</script>
