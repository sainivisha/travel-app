"use client";

import { useState } from "react";
import { PAYMENT_METHODS, PaymentMethodId } from "@/lib/payment/paymentMethods";
import { CheckCircle } from "lucide-react";

interface Props {
  total: number;
  bookingId: string;
}

export default function PaymentSection({ total, bookingId }: Props) {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodId>("paypal");
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    try {
      setLoading(true);

      // 🔥 STEP 1: Create payment
      const createRes = await fetch("/api/payments/paypal/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId }),
      });

      const payment = await createRes.json();

      if (!createRes.ok || !payment?.id) {
        throw new Error("Payment creation failed");
      }

      console.log("✅ Payment created:", payment);

      // 🔥 STEP 2: Authorize payment
      const authRes = await fetch(
        `/api/payments/paypal/${payment.id}/authorize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            authorizedAmount: total,
            message: "Customer approved payment",
          }),
        },
      );

      const authData = await authRes.json();

      if (!authRes.ok) {
        throw new Error(authData?.message || "Authorization failed");
      }

      console.log("✅ Authorized:", authData);

      // 🔥 STEP 3: Redirect to PayPal (KEY CHANGE)
      if (authData?.nextActionUrl) {
        window.location.href = authData.nextActionUrl;
        return;
      }

      throw new Error("No PayPal redirect URL");
    } catch (err) {
      console.error(err);
      alert("Payment failed ❌");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      {/* 💳 PAYMENT METHODS */}
      <div className="rounded-3xl p-5 bg-white/70 backdrop-blur-xl border shadow">
        <h3 className="font-semibold mb-4">Payment Method</h3>

        {PAYMENT_METHODS.map((method) => {
          const isActive = selectedMethod === method.id;

          return (
            <div
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`p-4 border rounded-xl cursor-pointer mb-2 ${
                isActive ? "border-sky-500 bg-sky-50" : ""
              }`}
            >
              {method.label}
            </div>
          );
        })}
      </div>

      {/* 💰 TOTAL */}
      <div className="flex justify-between">
        <span>Total</span>
        <span className="font-semibold">₹{total}</span>
      </div>

      <p className="text-xs text-center text-gray-400">
        You will be redirected to PayPal securely
      </p>

      <button
        onClick={handlePay}
        disabled={loading}
        className={`
    w-full h-14 rounded-2xl text-white font-semibold transition
    ${
      loading
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-lg"
    }
  `}
      >
        {loading ? "Redirecting to PayPal..." : `Pay ₹${total} via PayPal`}
      </button>

      {/* 🔒 TRUST */}
      <div className="flex justify-center gap-2 text-xs text-gray-500">
        <CheckCircle className="w-4 h-4 text-green-500" />
        Secure payment via PayPal
      </div>
    </div>
  );
}
