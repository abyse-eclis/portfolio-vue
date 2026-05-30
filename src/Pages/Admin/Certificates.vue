<template>
    <AdminLayout>
        <ResourceManager
            title="ใบรับรอง"
            subtitle="รองรับทั้งแนวนอนและแนวตั้ง (ระบบตรวจจับอัตโนมัติตอนอัปโหลด ปรับแก้ได้)"
            table="certificates"
            :list-columns="listColumns"
            :fields="fields"
            :order-by="{ column: 'issued_at', ascending: false }"
            :defaults="{ orientation: 'landscape' }"
        />
    </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import ResourceManager from '@/Components/Admin/ResourceManager.vue';
import type { FieldDef, ListColumn } from '@/types/admin';

const listColumns: ListColumn[] = [
    { key: 'image_path', label: 'รูป', type: 'image' },
    { key: 'title_en', label: 'ชื่อ (EN)' },
    { key: 'issuer', label: 'ผู้ออก' },
    { key: 'orientation', label: 'แนว' },
    { key: 'issued_at', label: 'วันที่ออก' },
];

const fields: FieldDef[] = [
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
</script>
