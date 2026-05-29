import { supabase } from '@/lib/supabase';
/**
 * Insert a contact submission. Replaces the Laravel POST /contact endpoint.
 *
 * NOTE: this only writes the row. Notification email + rate limiting (the old
 * `throttle:contact` + Mailable) must live in a Supabase Edge Function — they
 * can't be done safely from the browser. See the RLS/Edge-Function summary.
 */
export async function submitContact(payload) {
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
//# sourceMappingURL=useContact.js.map