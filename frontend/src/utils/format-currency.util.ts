export function formatCurrency(amount: number, currency = "VND") {
    if (isNaN(amount)) return `0 ${currency}`;

    return Intl.NumberFormat("vi-VN").format(amount) + ` ${currency}`;
}
