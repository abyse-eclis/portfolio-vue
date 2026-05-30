<template>
    <AdminLayout>
        <ResourceManager
            title="ลิงก์โซเชียล"
            subtitle="Social links ที่แสดงใน navbar / footer"
            table="social_links"
            :list-columns="listColumns"
            :fields="fields"
            :order-by="{ column: 'sort_order', ascending: true }"
            :defaults="{ show_in_portfolio: true, show_in_freelance: true }"
        />
    </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import ResourceManager from '@/Components/Admin/ResourceManager.vue';
import type { FieldDef, ListColumn } from '@/types/admin';

const listColumns: ListColumn[] = [
    { key: 'platform', label: 'แพลตฟอร์ม' },
    { key: 'url', label: 'URL' },
    { key: 'icon', label: 'ไอคอน' },
    { key: 'sort_order', label: 'ลำดับ' },
];

const fields: FieldDef[] = [
    {
        key: 'profile_id',
        label: 'โปรไฟล์',
        type: 'relation',
        required: true,
        relation: { table: 'profiles', labelColumns: ['name'] },
    },
    { key: 'platform', label: 'แพลตฟอร์ม', type: 'text', required: true, placeholder: 'GitHub, LinkedIn, …' },
    { key: 'url', label: 'URL', type: 'text', required: true, placeholder: 'https://…', wide: true },
    { key: 'icon', label: 'ไอคอน', type: 'text', required: true, placeholder: 'github, linkedin, twitter, …', help: 'ชื่อไอคอนจากชุด Icon' },
    { key: 'show_in_portfolio', label: 'แสดงในหน้า Portfolio', type: 'checkbox' },
    { key: 'show_in_freelance', label: 'แสดงในหน้า Freelance', type: 'checkbox' },
    { key: 'sort_order', label: 'ลำดับการแสดง', type: 'number' },
];
</script>
