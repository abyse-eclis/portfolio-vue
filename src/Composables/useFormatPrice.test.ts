import { describe, it, expect, afterEach } from 'vitest';
import { useFormatPrice } from './useFormatPrice';
import { locale } from './useLocale';

describe('useFormatPrice', () => {
    afterEach(() => {
        locale.value = 'en';
    });

    it('formats THB as a whole-baht currency string (th locale)', () => {
        locale.value = 'th';
        const { format } = useFormatPrice();
        const out = format(15000);
        // th-TH uses the ฿ symbol and no decimals here.
        expect(out).toContain('15,000');
        expect(out).toContain('฿');
    });

    it('formats with the en locale', () => {
        locale.value = 'en';
        const { format } = useFormatPrice();
        const out = format(15000);
        expect(out).toContain('15,000');
    });

    it('omits fraction digits', () => {
        locale.value = 'en';
        const { format } = useFormatPrice();
        expect(format(1999.5)).not.toContain('.5');
    });

    it('supports overriding the currency', () => {
        locale.value = 'en';
        const { format } = useFormatPrice();
        const out = format(100, 'USD');
        expect(out).toContain('100');
        expect(out).toMatch(/\$|USD/);
    });
});
