import { supabase } from '@/lib/supabase';
const BUCKET = import.meta.env.VITE_SUPABASE_PUBLIC_BUCKET ?? 'devfolio-public';
/** Read an image File's pixel dimensions in the browser (before upload). */
function readDimensions(file) {
    return new Promise((resolve) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve({ width: img.naturalWidth, height: img.naturalHeight });
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            resolve({ width: 0, height: 0 });
        };
        img.src = url;
    });
}
function slugifyName(name) {
    const dot = name.lastIndexOf('.');
    const base = (dot >= 0 ? name.slice(0, dot) : name)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 48) || 'file';
    const ext = dot >= 0 ? name.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, '') : 'bin';
    return `${base}.${ext}`;
}
export function useImageUpload() {
    /**
     * Upload a file to `folder/` inside the public bucket and return its object
     * key (what the `*_path` columns store). Also detects orientation so the
     * caller can pre-fill a portrait/landscape toggle.
     */
    async function uploadFile(file, folder) {
        const { width, height } = await readDimensions(file);
        const orientation = height > width ? 'portrait' : 'landscape';
        const path = `${folder}/${Date.now()}-${slugifyName(file.name)}`;
        const { error } = await supabase.storage
            .from(BUCKET)
            .upload(path, file, { cacheControl: '3600', upsert: true });
        if (error) {
            return { path: null, orientation, width, height, error: error.message };
        }
        return { path, orientation, width, height, error: null };
    }
    /** Remove an object by its stored key (best-effort). */
    async function removeFile(path) {
        if (!path)
            return;
        await supabase.storage.from(BUCKET).remove([path]);
    }
    return { uploadFile, removeFile };
}
//# sourceMappingURL=useImageUpload.js.map