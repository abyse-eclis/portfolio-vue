import { ref } from 'vue';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

// Module-level singletons: one auth state shared across the app. The admin
// panel is gated on `session`; the public site never touches this.
const session = ref<Session | null>(null);
const user = ref<User | null>(null);
const ready = ref(false);

let initPromise: Promise<void> | null = null;

/** Resolve the current session once and keep it in sync with auth changes. */
function init(): Promise<void> {
    if (initPromise) return initPromise;

    initPromise = supabase.auth.getSession().then(({ data }) => {
        session.value = data.session;
        user.value = data.session?.user ?? null;
        ready.value = true;

        supabase.auth.onAuthStateChange((_event, newSession) => {
            session.value = newSession;
            user.value = newSession?.user ?? null;
        });
    });

    return initPromise;
}

export function useAuth() {
    async function signIn(email: string, password: string): Promise<{ error: string | null }> {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error: error ? error.message : null };
    }

    async function signOut(): Promise<void> {
        await supabase.auth.signOut();
        session.value = null;
        user.value = null;
    }

    return { session, user, ready, init, signIn, signOut };
}

export { session, user, ready, init as initAuth };
