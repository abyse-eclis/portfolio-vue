import { useI18n } from '@/i18n';

export function useFormatPrice() {
    const { locale } = useI18n();

    function format(amount: number, currency = 'THB'): string {
        try {
            return new Intl.NumberFormat(locale.value === 'th' ? 'th-TH' : 'en-US', {
                style: 'currency',
                currency,
                maximumFractionDigits: 0,
            }).format(amount);
        } catch {
            return `${currency} ${amount.toLocaleString()}`;
        }
    }

    return { format };
}
