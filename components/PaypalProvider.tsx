"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PaypalProvider({ children }: any) {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AestH6X5-jYR1IJPNYanCsWwV5U0qxXzz2WvcX_PUMtVcc5g42z5XzUygsZGALc1zfgi_KjVrme0-eAO",
        currency: "USD",
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
}
