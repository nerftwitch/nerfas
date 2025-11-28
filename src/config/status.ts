export const ORDER_STATUS = ['pending', 'in_production', 'ready', 'delivered', 'canceled'] as const;
export const PAYMENT_STATUS = ['unpaid', 'partial', 'paid'] as const;

export type OrderStatus = (typeof ORDER_STATUS)[number];
export type PaymentStatus = (typeof PAYMENT_STATUS)[number];
