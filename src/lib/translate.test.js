import { describe, it, expect } from 'vitest';
import { tField } from './translate';
describe('tField', () => {
    const row = {
        title_th: 'หัวข้อ',
        title_en: 'Title',
        role_en: 'Developer',
        role_th: '',
        empty_th: '',
        empty_en: '',
    };
    it('returns the active locale value when present', () => {
        expect(tField(row, 'title', 'th')).toBe('หัวข้อ');
        expect(tField(row, 'title', 'en')).toBe('Title');
    });
    it('falls back to English when the active locale is empty', () => {
        expect(tField(row, 'role', 'th')).toBe('Developer');
    });
    it('returns null when both translations are empty', () => {
        expect(tField(row, 'empty', 'th')).toBeNull();
        expect(tField(row, 'empty', 'en')).toBeNull();
    });
    it('returns null for a missing field', () => {
        expect(tField(row, 'nope', 'en')).toBeNull();
    });
    it('returns null for a null/undefined row', () => {
        expect(tField(null, 'title', 'en')).toBeNull();
        expect(tField(undefined, 'title', 'en')).toBeNull();
    });
    it('ignores non-string values', () => {
        expect(tField({ n_en: 42 }, 'n', 'en')).toBeNull();
    });
});
//# sourceMappingURL=translate.test.js.map