import { ref, onMounted, onUnmounted } from 'vue';
export function useReducedMotion() {
    const prefersReducedMotion = ref(false);
    let mediaQuery = null;
    function onchange(e) {
        prefersReducedMotion.value = e.matches;
    }
    onMounted(() => {
        mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        prefersReducedMotion.value = mediaQuery.matches;
        mediaQuery.addEventListener('change', onchange);
    });
    onUnmounted(() => {
        mediaQuery?.removeEventListener('change', onchange);
    });
    return { prefersReducedMotion };
}
//# sourceMappingURL=useReducedMotion.js.map