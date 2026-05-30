// Supabase Edge Function: submit-contact
// -----------------------------------------------------------------------------
// Replaces the old Laravel POST /contact flow that the browser can't do safely:
//   1. Per-IP rate limit (the old `throttle:contact`).
//   2. Insert with the service_role key (bypasses RLS, future-proofs locking
//      down direct inserts).
//   3. Notification email via Resend.
//
// Deploy:
//   supabase functions deploy submit-contact --no-verify-jwt
//
// Required secrets (supabase secrets set ...):
//   SUPABASE_URL                — provided automatically in the runtime
//   SUPABASE_SERVICE_ROLE_KEY   — provided automatically in the runtime
//   RESEND_API_KEY              — optional; omit to skip the email
//   CONTACT_NOTIFY_TO           — optional; recipient for the notification
//   CONTACT_NOTIFY_FROM         — optional; verified Resend sender
//   ALLOWED_ORIGIN              — optional; CORS origin (default "*")
// -----------------------------------------------------------------------------
import { createClient } from 'jsr:@supabase/supabase-js@2';

interface ContactBody {
    mode?: string;
    name?: string;
    email?: string;
    phone?: string | null;
    subject?: string | null;
    message?: string;
    package_slug?: string | null;
    locale?: string;
}

const ALLOWED_ORIGIN = Deno.env.get('ALLOWED_ORIGIN') ?? '*';
const RATE_LIMIT_MAX = 3; // submissions...
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // ...per IP per hour

const corsHeaders = {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clientIp(req: Request): string {
    const fwd = req.headers.get('x-forwarded-for');
    if (fwd) return fwd.split(',')[0].trim();
    return req.headers.get('x-real-ip') ?? 'unknown';
}

async function sendEmail(row: ContactBody): Promise<void> {
    const apiKey = Deno.env.get('RESEND_API_KEY');
    const to = Deno.env.get('CONTACT_NOTIFY_TO');
    const from = Deno.env.get('CONTACT_NOTIFY_FROM');
    if (!apiKey || !to || !from) return; // email is optional

    const lines = [
        `Mode: ${row.mode}`,
        `Name: ${row.name}`,
        `Email: ${row.email}`,
        row.phone ? `Phone: ${row.phone}` : null,
        row.subject ? `Subject: ${row.subject}` : null,
        row.package_slug ? `Package: ${row.package_slug}` : null,
        '',
        row.message,
    ]
        .filter((l) => l !== null)
        .join('\n');

    await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            from,
            to,
            reply_to: row.email,
            subject: `New contact (${row.mode}): ${row.subject ?? row.name}`,
            text: lines,
        }),
    });
}

Deno.serve(async (req: Request) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
    if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

    let body: ContactBody;
    try {
        body = await req.json();
    } catch {
        return json({ error: 'Invalid JSON' }, 400);
    }

    // --- Validation -----------------------------------------------------------
    const name = (body.name ?? '').trim();
    const email = (body.email ?? '').trim();
    const message = (body.message ?? '').trim();
    const mode = body.mode === 'freelance' ? 'freelance' : 'portfolio';

    if (!name || !email || !message) {
        return json({ error: 'name, email and message are required' }, 422);
    }
    if (!EMAIL_RE.test(email)) {
        return json({ error: 'Invalid email address' }, 422);
    }
    if (message.length > 5000) {
        return json({ error: 'Message too long' }, 422);
    }

    const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // --- Per-IP rate limit ----------------------------------------------------
    const ip = clientIp(req);
    const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const { count, error: countError } = await supabase
        .from('contact_submissions')
        .select('id', { count: 'exact', head: true })
        .eq('metadata->>ip', ip)
        .gte('created_at', since);

    if (!countError && (count ?? 0) >= RATE_LIMIT_MAX) {
        return json({ error: 'Too many requests. Please try again later.' }, 429);
    }

    // --- Insert ---------------------------------------------------------------
    const { error: insertError } = await supabase.from('contact_submissions').insert({
        mode,
        name,
        email,
        phone: body.phone || null,
        subject: body.subject || null,
        message,
        metadata: {
            locale: body.locale ?? null,
            package_slug: body.package_slug || null,
            ip,
            user_agent: req.headers.get('user-agent'),
            referrer: req.headers.get('referer'),
        },
    });

    if (insertError) {
        return json({ error: insertError.message }, 500);
    }

    // Email is best-effort — a failure here must not fail the submission.
    try {
        await sendEmail({ ...body, name, email, message, mode });
    } catch (err) {
        console.error('[submit-contact] email failed:', err);
    }

    return json({ ok: true });
});
