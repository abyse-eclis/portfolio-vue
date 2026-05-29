<template>
    <div class="min-h-screen text-slate-100 relative">
        <SpaceBackground />

        <a
            href="#main-content"
            class="sr-only focus:not-sr-only fixed top-3 left-3 z-[60] px-3 py-1.5 rounded-md bg-primary-500 text-space-900 text-sm font-semibold"
        >
            Skip to content
        </a>

        <Navbar />
        <main id="main-content" class="pt-16 relative">
            <slot />
        </main>
        <Footer />
        <Toast />
    </div>
</template>

<script setup lang="ts">
import Navbar from '@/Components/Shared/Navbar.vue';
import Footer from '@/Components/Shared/Footer.vue';
import Toast from '@/Components/Shared/Toast.vue';
import SpaceBackground from '@/Components/Three/SpaceBackground.vue';
</script>
