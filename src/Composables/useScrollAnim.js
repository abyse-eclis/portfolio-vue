import { onUnmounted } from 'vue';
import { useReducedMotion } from './useReducedMotion';
export function useScrollAnim(options = {}) {
    const { threshold = 0.12, once = true } = options;
    const { prefersReducedMotion } = useReducedMotion();
    const observers = [];
    function observe(el, delay = 0) {
        if (!el)
            return;
        if (prefersReducedMotion.value) {
            el.classList.add('is-visible');
            return;
        }
        el.classList.add('anim-on-scroll');
        if (delay > 0) {
            el.style.transitionDelay = `${delay}ms`;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    if (once)
                        observer.unobserve(entry.target);
                }
                else if (!once) {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, { threshold });
        observer.observe(el);
        observers.push(observer);
    }
    onUnmounted(() => {
        observers.forEach((o) => o.disconnect());
    });
    return { observe };
}
//# sourceMappingURL=useScrollAnim.js.map