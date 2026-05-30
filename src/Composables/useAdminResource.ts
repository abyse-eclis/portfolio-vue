import { supabase } from '@/lib/supabase';

export interface ListOptions {
    columns?: string;
    orderBy?: { column: string; ascending?: boolean };
}

type Row = Record<string, any>;

/**
 * Thin CRUD wrapper over a Supabase table for the admin panel. Writes require
 * an authenticated session (see supabase/004_admin.sql RLS policies).
 */
export function useAdminResource(table: string) {
    async function list(opts: ListOptions = {}): Promise<{ data: Row[]; error: string | null }> {
        let query = supabase.from(table).select(opts.columns ?? '*');
        if (opts.orderBy) {
            query = query.order(opts.orderBy.column, { ascending: opts.orderBy.ascending ?? true });
        }
        const { data, error } = await query;
        return { data: (data as Row[]) ?? [], error: error ? error.message : null };
    }

    async function getSingle(opts: ListOptions = {}): Promise<{ data: Row | null; error: string | null }> {
        const { data, error } = await supabase
            .from(table)
            .select(opts.columns ?? '*')
            .limit(1)
            .maybeSingle();
        return { data: (data as Row) ?? null, error: error ? error.message : null };
    }

    async function insert(row: Row): Promise<{ data: Row | null; error: string | null }> {
        const { data, error } = await supabase.from(table).insert(row).select().maybeSingle();
        return { data: (data as Row) ?? null, error: error ? error.message : null };
    }

    async function update(id: number | string, row: Row): Promise<{ error: string | null }> {
        const { error } = await supabase.from(table).update(row).eq('id', id);
        return { error: error ? error.message : null };
    }

    async function remove(id: number | string): Promise<{ error: string | null }> {
        const { error } = await supabase.from(table).delete().eq('id', id);
        return { error: error ? error.message : null };
    }

    return { list, getSingle, insert, update, remove };
}
