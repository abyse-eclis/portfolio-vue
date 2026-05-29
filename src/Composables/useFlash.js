import { reactive } from 'vue';
// Module-level reactive flash store — replaces Inertia's shared `flash` prop.
// ContactForm writes here on submit; Toast (mounted in every layout) reads it.
const flash = reactive({});
export function useFlash() {
    function success(message) {
        flash.error = undefined;
        flash.success = message;
    }
    function error(message) {
        flash.success = undefined;
        flash.error = message;
    }
    function clear() {
        flash.success = undefined;
        flash.error = undefined;
    }
    return { flash, success, error, clear };
}
//# sourceMappingURL=useFlash.js.map