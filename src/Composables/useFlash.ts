import { reactive } from 'vue';

export interface FlashState {
    success?: string;
    error?: string;
}

// Module-level reactive flash store — replaces Inertia's shared `flash` prop.
// ContactForm writes here on submit; Toast (mounted in every layout) reads it.
const flash = reactive<FlashState>({});

export function useFlash() {
    function success(message: string) {
        flash.error = undefined;
        flash.success = message;
    }

    function error(message: string) {
        flash.success = undefined;
        flash.error = message;
    }

    function clear() {
        flash.success = undefined;
        flash.error = undefined;
    }

    return { flash, success, error, clear };
}
