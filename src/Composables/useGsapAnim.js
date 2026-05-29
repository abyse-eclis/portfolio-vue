import { onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';
gsap.registerPlugin(ScrollTrigger);
/**
 * GSAP scroll-triggered fade-up animation for child elements.
 * Respects prefers-reduced-motion (skips animation entirely).
 */
export function useGsapAnim() {
    const { prefersReducedMotion } = useReducedMotion();
    const triggers = [];
    function fadeUp(container, options) {
        if (!container || prefersReducedMotion.value)
            return;
        const targets = container.querySelectorAll(options.selector);
        if (!targets.length)
            return;
        gsap.from(targets, {
            opacity: 0,
            y: options.y ?? 32,
            duration: options.duration ?? 0.7,
            ease: 'power3.out',
            stagger: options.stagger ?? 0.08,
            delay: options.delay ?? 0,
            scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                once: true,
            },
        });
    }
    onMounted(() => {
        if (prefersReducedMotion.value)
            return;
        ScrollTrigger.refresh();
    });
    onBeforeUnmount(() => {
        triggers.forEach((trigger) => trigger.kill());
        ScrollTrigger.getAll().forEach((t) => t.kill());
    });
    return { fadeUp };
}
//# sourceMappingURL=useGsapAnim.js.map