export type PaymentMethodId = "paypal" | "cash";

export interface PaymentMethod {
  id: PaymentMethodId;
  label: string;
  description: string;
  icon: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "paypal",
    label: "Pay Online",
    description: "UPI, Cards, Netbanking",
    icon: "💳",
  },
];
