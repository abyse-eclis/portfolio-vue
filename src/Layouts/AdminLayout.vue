<template>
    <div class="min-h-screen bg-space-950 text-slate-100">
        <div class="flex">
            <!-- Sidebar -->
            <aside
                class="fixed inset-y-0 left-0 z-40 w-60 -translate-x-full border-r border-white/10 bg-space-900 transition-transform lg:translate-x-0"
                :class="{ 'translate-x-0': mobileOpen }"
            >
                <div class="flex h-16 items-center gap-2 border-b border-white/10 px-5">
                    <Icon name="zap" :size="20" class="text-primary-400" />
                    <span class="font-display text-lg font-semibold text-white">DevFolio Admin</span>
                </div>
                <nav class="space-y-0.5 p-3">
                    <RouterLink
                        v-for="item in nav"
                        :key="item.to"
                        :to="item.to"
                        class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                        active-class="bg-primary-500/15 text-primary-300"
                        @click="mobileOpen = false"
                    >
                        <Icon :name="item.icon" :size="16" />
                        {{ item.label }}
                    </RouterLink>
                </nav>
            </aside>

            <!-- Backdrop (mobile) -->
            <div
                v-if="mobileOpen"
                class="fixed inset-0 z-30 bg-black/60 lg:hidden"
                @click="mobileOpen = false"
            />

            <!-- Main -->
            <div class="flex min-h-screen flex-1 flex-col lg:pl-60">
                <header
                    class="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-space-900/80 px-4 backdrop-blur sm:px-6"
                >
                    <button class="text-slate-300 lg:hidden" @click="mobileOpen = true">
                        <Icon name="menu" :size="22" />
                    </button>
                    <div class="ml-auto flex items-center gap-3">
                        <a
                            href="/"
                            target="_blank"
                            class="hidden items-center gap-1.5 text-sm text-slate-400 hover:text-primary-300 sm:inline-flex"
                        >
                            <Icon name="external-link" :size="14" /> ดูเว็บไซต์
                        </a>
                        <span class="hidden text-sm text-slate-400 sm:inline">{{ user?.email }}</span>
                        <button
                            class="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-300 hover:bg-white/5"
                            @click="logout"
                        >
                            ออกจากระบบ
                        </button>
                    </div>
                </header>

                <main class="flex-1 p-4 sm:p-6 lg:p-8">
                    <slot />
                </main>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import Icon from '@/Components/Shared/Icon.vue';
import { useAuth } from '@/Composables/useAuth';

const router = useRouter();
const { user, signOut } = useAuth();
const mobileOpen = ref(false);

const nav = [
    { to: '/admin', label: 'แดชบอร์ด', icon: 'layers' },
    { to: '/admin/profile', label: 'โปรไฟล์', icon: 'user' },
    { to: '/admin/projects', label: 'ผลงาน', icon: 'briefcase' },
    { to: '/admin/certificates', label: 'ใบรับรอง', icon: 'award' },
    { to: '/admin/skills', label: 'ทักษะ', icon: 'zap' },
    { to: '/admin/packages', label: 'แพ็กเกจ', icon: 'cube' },
    { to: '/admin/process-steps', label: 'ขั้นตอนงาน', icon: 'clock' },
    { to: '/admin/testimonials', label: 'รีวิวลูกค้า', icon: 'star' },
    { to: '/admin/social-links', label: 'โซเชียล', icon: 'globe' },
    { to: '/admin/contacts', label: 'ข้อความติดต่อ', icon: 'mail' },
] as const;

async function logout() {
    await signOut();
    router.replace('/admin/login');
}
</script>
