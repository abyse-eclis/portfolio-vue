<template>
    <AdminLayout>
        <div class="space-y-10">
            <ResourceManager
                title="หมวดหมู่ทักษะ"
                subtitle="Skill categories — กลุ่มของทักษะ"
                table="skill_categories"
                :list-columns="categoryColumns"
                :fields="categoryFields"
                :order-by="{ column: 'sort_order', ascending: true }"
            />

            <ResourceManager
                title="ทักษะ"
                subtitle="Skills — แต่ละรายการต้องเลือกหมวดหมู่"
                table="skills"
                :list-columns="skillColumns"
                :fields="skillFields"
                :order-by="{ column: 'sort_order', ascending: true }"
                :defaults="{ level: 80 }"
            />
        </div>
    </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import ResourceManager from '@/Components/Admin/ResourceManager.vue';
import type { FieldDef, ListColumn } from '@/types/admin';

const categoryColumns: ListColumn[] = [
    { key: 'name_en', label: 'ชื่อ (EN)' },
    { key: 'slug', label: 'Slug' },
    { key: 'icon', label: 'ไอคอน' },
    { key: 'sort_order', label: 'ลำดับ' },
];

const categoryFields: FieldDef[] = [
    { key: 'slug', label: 'Slug', type: 'text', required: true, placeholder: 'frontend' },
    { key: 'name_th', label: 'ชื่อ (TH)', type: 'text', required: true },
    { key: 'name_en', label: 'ชื่อ (EN)', type: 'text', required: true },
    { key: 'icon', label: 'ไอคอน', type: 'text', placeholder: 'code, server, palette, …' },
    { key: 'sort_order', label: 'ลำดับการแสดง', type: 'number' },
];

const skillColumns: ListColumn[] = [
    { key: 'icon_path', label: 'ไอคอน', type: 'image' },
    { key: 'name', label: 'ชื่อ' },
    { key: 'level', label: 'ระดับ' },
    { key: 'sort_order', label: 'ลำดับ' },
];

const skillFields: FieldDef[] = [
    {
        key: 'skill_category_id',
        label: 'หมวดหมู่',
        type: 'relation',
        required: true,
        relation: { table: 'skill_categories', labelColumns: ['name_en'] },
    },
    { key: 'name', label: 'ชื่อทักษะ', type: 'text', required: true, placeholder: 'Vue.js' },
    { key: 'level', label: 'ระดับ (0-100)', type: 'number', help: 'ใช้แสดงความยาวแถบทักษะ' },
    { key: 'icon_path', label: 'ไอคอน (รูป)', type: 'image', folder: 'skills' },
    { key: 'sort_order', label: 'ลำดับการแสดง', type: 'number' },
];
</script>
