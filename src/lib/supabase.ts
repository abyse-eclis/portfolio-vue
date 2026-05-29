import { createClient } from '@supabase/supabase-js';

// Public anon key — safe for the browser ONLY when Row Level Security (RLS)
// is enabled on every table. Never put the service_role key here.
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
    console.warn('[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set. Copy .env.example to .env.');
}

export const supabase = createClient(url ?? '', anonKey ?? '');
