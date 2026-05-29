<template>
    <canvas ref="canvasEl" class="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { useReducedMotion } from '@/Composables/useReducedMotion';

const props = withDefaults(defineProps<{
    starCount?: number;
    speed?: number;
    color?: string;
}>(), {
    starCount: 800,
    speed: 0.0004,
    color: '#a78bfa',
});

const canvasEl = ref<HTMLCanvasElement | null>(null);
const { prefersReducedMotion } = useReducedMotion();

let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let stars: THREE.Points | null = null;
let rafId = 0;
let resizeObserver: ResizeObserver | null = null;
let visibilityHandler: (() => void) | null = null;
let paused = false;

function init() {
    if (!canvasEl.value) return;

    const canvas = canvasEl.value;
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 3;

    const positions = new Float32Array(props.starCount * 3);
    for (let i = 0; i < props.starCount; i++) {
        const r = Math.cbrt(Math.random()) * 4;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: new THREE.Color(props.color),
        size: 0.015,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
    });

    stars = new THREE.Points(geometry, material);
    scene.add(stars);

    resize();
}

function resize() {
    if (!renderer || !camera || !canvasEl.value) return;
    const w = canvasEl.value.clientWidth;
    const h = canvasEl.value.clientHeight;
    if (w === 0 || h === 0) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
}

function animate() {
    if (!renderer || !scene || !camera || !stars) return;
    if (paused) {
        rafId = requestAnimationFrame(animate);
        return;
    }
    stars.rotation.y += props.speed;
    stars.rotation.x += props.speed * 0.4;
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(animate);
}

onMounted(() => {
    if (prefersReducedMotion.value) {
        return;
    }
    init();
    animate();

    if (canvasEl.value) {
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvasEl.value);
    }

    visibilityHandler = () => {
        paused = document.hidden;
    };
    document.addEventListener('visibilitychange', visibilityHandler);
});

onBeforeUnmount(() => {
    cancelAnimationFrame(rafId);
    resizeObserver?.disconnect();
    if (visibilityHandler) document.removeEventListener('visibilitychange', visibilityHandler);
    renderer?.dispose();
    stars?.geometry.dispose();
    (stars?.material as THREE.Material | undefined)?.dispose();
});
</script>
