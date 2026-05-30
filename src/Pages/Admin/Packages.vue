<template>
    <AdminLayout>
        <div class="space-y-10">
            <ResourceManager
                title="แพ็กเกจ"
                subtitle="Packages ในหน้า Freelance"
                table="packages"
                :list-columns="packageColumns"
                :fields="packageFields"
                :order-by="{ column: 'sort_order', ascending: true }"
                :defaults="{ currency: 'THB' }"
            />

            <ResourceManager
                title="รายการในแพ็กเกจ"
                subtitle="Package features — แต่ละรายการต้องเลือกแพ็กเกจ"
                table="package_features"
                :list-columns="featureColumns"
                :fields="featureFields"
                :order-by="{ column: 'sort_order', ascending: true }"
                :defaults="{ included: true }"
            />
        </div>
    </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import ResourceManager from '@/Components/Admin/ResourceManager.vue';
import type { FieldDef, ListColumn } from '@/types/admin';

const packageColumns: ListColumn[] = [
    { key: 'name_en', label: 'ชื่อ (EN)' },
    { key: 'price', label: 'ราคา' },
    { key: 'currency', label: 'สกุล' },
    { key: 'is_recommended', label: 'แนะนำ', type: 'bool' },
];

const packageFields: FieldDef[] = [
    { key: 'slug', label: 'Slug', type: 'text', required: true, placeholder: 'starter' },
    { key: 'name_th', label: 'ชื่อ (TH)', type: 'text', required: true },
    { key: 'name_en', label: 'ชื่อ (EN)', type: 'text', required: true },
    { key: 'tagline_th', label: 'คำโปรย (TH)', type: 'text' },
    { key: 'tagline_en', label: 'คำโปรย (EN)', type: 'text' },
    { key: 'description_th', label: 'รายละเอียด (TH)', type: 'textarea' },
    { key: 'description_en', label: 'รายละเอียด (EN)', type: 'textarea' },
    { key: 'price', label: 'ราคา', type: 'number', step: 0.01, required: true },
    { key: 'currency', label: 'สกุลเงิน', type: 'text', placeholder: 'THB' },
    { key: 'is_recommended', label: 'แพ็กเกจแนะนำ (highlight)', type: 'checkbox' },
    { key: 'sort_order', label: 'ลำดับการแสดง', type: 'number' },
];

const featureColumns: ListColumn[] = [
    { key: 'feature_en', label: 'รายการ (EN)' },
    { key: 'included', label: 'รวมอยู่', type: 'bool' },
    { key: 'sort_order', label: 'ลำดับ' },
];

const featureFields: FieldDef[] = [
    {
        key: 'package_id',
        label: 'แพ็กเกจ',
        type: 'relation',
        required: true,
        relation: { table: 'packages', labelColumns: ['name_en'] },
    },
    { key: 'feature_th', label: 'รายการ (TH)', type: 'text', required: true },
    { key: 'feature_en', label: 'รายการ (EN)', type: 'text', required: true },
    { key: 'included', label: 'รวมอยู่ในแพ็กเกจ (ไม่ติ๊ก = ขีดฆ่า)', type: 'checkbox' },
    { key: 'sort_order', label: 'ลำดับการแสดง', type: 'number' },
];
</script>
