<template>
    <div class="flex min-h-screen items-center justify-center bg-space-950 p-4 text-slate-100">
        <div class="w-full max-w-sm rounded-2xl border border-white/10 bg-space-900 p-7 shadow-2xl">
            <div class="mb-6 flex items-center gap-2">
                <Icon name="zap" :size="22" class="text-primary-400" />
                <h1 class="font-display text-xl font-semibold text-white">DevFolio Admin</h1>
            </div>

            <form class="space-y-4" @submit.prevent="submit">
                <div class="space-y-1.5">
                    <label class="block text-sm font-medium text-slate-300">อีเมล</label>
                    <input v-model="email" type="email" autocomplete="email" required class="admin-input" />
                </div>
                <div class="space-y-1.5">
                    <label class="block text-sm font-medium text-slate-300">รหัสผ่าน</label>
                    <input
                        v-model="password"
                        type="password"
                        autocomplete="current-password"
                        required
                        class="admin-input"
                    />
                </div>

                <p v-if="error" class="text-sm text-rose-400">{{ error }}</p>

                <Button type="submit" :disabled="loading" class="w-full">
                    {{ loading ? 'กำลังเข้าสู่ระบบ…' : 'เข้าสู่ระบบ' }}
                </Button>
            </form>

            <p class="mt-5 text-center text-xs text-slate-500">
                สร้างบัญชี admin ใน Supabase Dashboard → Authentication → Users
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from '@/Components/Shared/Button.vue';
import Icon from '@/Components/Shared/Icon.vue';
import { useAuth } from '@/Composables/useAuth';

const route = useRoute();
const router = useRouter();
const { signIn } = useAuth();

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref<string | null>(null);

async function submit() {
    loading.value = true;
    error.value = null;
    const { error: e } = await signIn(email.value, password.value);
    loading.value = false;

    if (e) {
        error.value = e === 'Invalid login credentials' ? 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' : e;
        return;
    }
    const redirect = (route.query.redirect as string) || '/admin';
    router.replace(redirect);
}
</script>
