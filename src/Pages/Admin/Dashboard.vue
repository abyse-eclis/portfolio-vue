<template>
    <AdminLayout>
        <h1 class="font-display text-2xl text-white">แดชบอร์ด</h1>
        <p class="mt-1 text-sm text-slate-400">ภาพรวมเนื้อหาในเว็บไซต์</p>

        <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <RouterLink
                v-for="card in cards"
                :key="card.to"
                :to="card.to"
                class="group rounded-2xl border border-white/10 bg-space-800/40 p-5 transition-colors hover:border-primary-500/40"
            >
                <div class="flex items-center justify-between">
                    <Icon :name="card.icon" :size="20" class="text-primary-400" />
                    <span class="font-display text-2xl text-white">
                        {{ counts[card.table] ?? '—' }}
                    </span>
                </div>
                <p class="mt-3 text-sm text-slate-300 group-hover:text-white">{{ card.label }}</p>
            </RouterLink>
        </div>

        <div
            v-if="unread > 0"
            class="mt-6 flex items-center gap-3 rounded-xl border border-primary-500/30 bg-primary-500/10 px-4 py-3"
        >
            <Icon name="mail" :size="18" class="text-primary-300" />
            <span class="text-sm text-primary-200">
                มีข้อความติดต่อใหม่ {{ unread }} รายการ
            </span>
            <RouterLink to="/admin/contacts" class="ml-auto text-sm font-medium text-primary-300 hover:underline">
                ดูทั้งหมด →
            </RouterLink>
        </div>
    </AdminLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import Icon from '@/Components/Shared/Icon.vue';
import { supabase } from '@/lib/supabase';

const cards = [
    { table: 'projects', to: '/admin/projects', label: 'ผลงาน', icon: 'briefcase' },
    { table: 'certificates', to: '/admin/certificates', label: 'ใบรับรอง', icon: 'award' },
    { table: 'skills', to: '/admin/skills', label: 'ทักษะ', icon: 'zap' },
    { table: 'packages', to: '/admin/packages', label: 'แพ็กเกจ', icon: 'cube' },
    { table: 'testimonials', to: '/admin/testimonials', label: 'รีวิวลูกค้า', icon: 'star' },
    { table: 'process_steps', to: '/admin/process-steps', label: 'ขั้นตอนงาน', icon: 'clock' },
    { table: 'social_links', to: '/admin/social-links', label: 'โซเชียล', icon: 'globe' },
    { table: 'contact_submissions', to: '/admin/contacts', label: 'ข้อความติดต่อ', icon: 'mail' },
] as const;

const counts = ref<Record<string, number>>({});
const unread = ref(0);

async function countTable(table: string): Promise<number> {
    const { count } = await supabase.from(table).select('id', { count: 'exact', head: true });
    return count ?? 0;
}

onMounted(async () => {
    await Promise.all(
        cards.map(async (c) => {
            counts.value[c.table] = await countTable(c.table);
        }),
    );
    const { count } = await supabase
        .from('contact_submissions')
        .select('id', { count: 'exact', head: true })
        .eq('is_read', false);
    unread.value = count ?? 0;
});
</script>
