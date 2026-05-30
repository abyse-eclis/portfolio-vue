import { supabase } from '@/lib/supabase';
/**
 * Thin CRUD wrapper over a Supabase table for the admin panel. Writes require
 * an authenticated session (see supabase/004_admin.sql RLS policies).
 */
export function useAdminResource(table) {
    async function list(opts = {}) {
        let query = supabase.from(table).select(opts.columns ?? '*');
        if (opts.orderBy) {
            query = query.order(opts.orderBy.column, { ascending: opts.orderBy.ascending ?? true });
        }
        const { data, error } = await query;
        return { data: data ?? [], error: error ? error.message : null };
    }
    async function getSingle(opts = {}) {
        const { data, error } = await supabase
            .from(table)
            .select(opts.columns ?? '*')
            .limit(1)
            .maybeSingle();
        return { data: data ?? null, error: error ? error.message : null };
    }
    async function insert(row) {
        const { data, error } = await supabase.from(table).insert(row).select().maybeSingle();
        return { data: data ?? null, error: error ? error.message : null };
    }
    async function update(id, row) {
        const { error } = await supabase.from(table).update(row).eq('id', id);
        return { error: error ? error.message : null };
    }
    async function remove(id) {
        const { error } = await supabase.from(table).delete().eq('id', id);
        return { error: error ? error.message : null };
    }
    return { list, getSingle, insert, update, remove };
}
//# sourceMappingURL=useAdminResource.js.map