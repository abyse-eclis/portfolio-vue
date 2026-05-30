import { supabase } from '@/lib/supabase';
// Opt-in: set VITE_USE_CONTACT_FN=true once the `submit-contact` Edge Function
// is deployed. It adds notification email + per-IP rate limiting (the old
// Laravel `throttle:contact` + Mailable) that can't be done from the browser.
// When false/unset we fall back to a direct insert (works as long as the
// contact_submissions insert RLS policy stays open).
const USE_EDGE_FN = import.meta.env.VITE_USE_CONTACT_FN === 'true';
async function submitViaEdgeFunction(payload) {
    const { error, data } = await supabase.functions.invoke('submit-contact', {
        body: {
            mode: payload.mode,
            name: payload.name,
            email: payload.email,
            phone: payload.phone || null,
            subject: payload.subject || null,
            message: payload.message,
            package_slug: payload.package_slug || null,
            locale: payload.locale,
        },
    });
    if (error) {
        // supabase-js wraps non-2xx responses; surface the function's message.
        const fnMessage = data?.error;
        return { error: fnMessage || error.message };
    }
    return { error: null };
}
async function submitViaDirectInsert(payload) {
    const { mode, name, email, phone, subject, message, package_slug, locale } = payload;
    const { error } = await supabase.from('contact_submissions').insert({
        mode,
        name,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
        metadata: {
            locale,
            package_slug: package_slug || null,
            user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
            referrer: typeof document !== 'undefined' ? document.referrer || null : null,
        },
    });
    return { error: error ? error.message : null };
}
/**
 * Insert a contact submission. Replaces the Laravel POST /contact endpoint.
 * Routes through the `submit-contact` Edge Function when VITE_USE_CONTACT_FN
 * is enabled, otherwise inserts directly from the browser.
 */
export async function submitContact(payload) {
    return USE_EDGE_FN ? submitViaEdgeFunction(payload) : submitViaDirectInsert(payload);
}
//# sourceMappingURL=useContact.js.map