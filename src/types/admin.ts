export type FieldType =
    | 'text'
    | 'textarea'
    | 'number'
    | 'checkbox'
    | 'date'
    | 'select'
    | 'image'
    | 'tags'
    | 'gallery'
    | 'relation';

export interface FieldDef {
    key: string;
    label: string;
    type: FieldType;
    required?: boolean;
    /** Allow an empty value for select/relation (stored as null). */
    nullable?: boolean;
    /** Options for `select`. */
    options?: { value: string | number; label: string }[];
    /** For `relation`: build a dropdown from another table. */
    relation?: { table: string; valueColumn?: string; labelColumns: string[] };
    /** Storage subfolder for `image`. */
    folder?: string;
    /** For `image`: write the detected orientation into this field key. */
    detectInto?: string;
    placeholder?: string;
    help?: string;
    /** Numeric step for `number`. */
    step?: number;
    /** Span two columns in the form grid. */
    wide?: boolean;
}

export interface ListColumn {
    key: string;
    label: string;
    /** Render hint: 'bool' shows a badge, 'image' shows a thumbnail. */
    type?: 'text' | 'bool' | 'image';
}
