import { onUnmounted } from 'vue';
import { useReducedMotion } from './useReducedMotion';

interface ScrollAnimOptions {
    threshold?: number;
    once?: boolean;
}

export function useScrollAnim(options: ScrollAnimOptions = {}) {
    const { threshold = 0.12, once = true } = options;
    const { prefersReducedMotion } = useReducedMotion();
    const observers: IntersectionObserver[] = [];

    function observe(el: Element | null, delay = 0) {
        if (!el) return;

        if (prefersReducedMotion.value) {
            el.classList.add('is-visible');
            return;
        }

        el.classList.add('anim-on-scroll');

        if (delay > 0) {
            (el as HTMLElement).style.transitionDelay = `${delay}ms`;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        if (once) observer.unobserve(entry.target);
                    } else if (!once) {
                        entry.target.classList.remove('is-visible');
                    }
                });
            },
            { threshold },
        );

        observer.observe(el);
        observers.push(observer);
    }

    onUnmounted(() => {
        observers.forEach((o) => o.disconnect());
    });

    return { observe };
}
