"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();

  const token = params.get("token"); // PayPal token
  const payerId = params.get("PayerID");
  console.log(token, payerId);
  // 🔥 IMPORTANT: fallback from localStorage (since PayPal doesn't return paymentId)
  const paymentId =
    params.get("paymentId") || localStorage.getItem("paymentId");

  const authorizedAmount = localStorage.getItem("authorizedAmount");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  const [message, setMessage] = useState("Processing payment...");

  useEffect(() => {
    const capturePayment = async () => {
      try {
        if (!paymentId) {
          throw new Error("Missing paymentId");
        }

        if (!token) {
          throw new Error("Missing PayPal token");
        }

        console.log("💰 Capturing payment:", {
          paymentId,
          token,
          payerId,
        });

        const res = await fetch(`/api/payments/paypal/${paymentId}/capture`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            authorizedAmount: Number(authorizedAmount || 0),
            providerTransactionReference: token,
            message: "Customer approved payment, capture created",
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Capture failed");
        }

        console.log("✅ Capture success:", data);

        setStatus("success");

        // 🔥 Clean storage
        localStorage.removeItem("paymentId");
        localStorage.removeItem("authorizedAmount");
      } catch (err: any) {
        console.error("❌ Capture error:", err);

        setStatus("error");
        setMessage(err.message || "Payment failed");
      }
    };

    capturePayment();
  }, [paymentId, token, payerId, authorizedAmount]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
      <div className="bg-white p-8 rounded-3xl shadow-lg text-center w-full max-w-md">
        {/* 🔄 LOADING */}
        {status === "loading" && (
          <>
            <div className="text-4xl mb-3 animate-spin">⏳</div>
            <h2 className="text-lg font-semibold text-gray-800">
              Processing your payment...
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Please wait while we confirm your booking
            </p>
          </>
        )}

        {/* ✅ SUCCESS */}
        {status === "success" && (
          <>
            <div className="text-5xl mb-3">🎉</div>
            <h1 className="text-2xl font-bold text-green-600">
              Payment Successful
            </h1>

            <p className="text-gray-500 mt-2">Your booking is confirmed</p>

            <div className="mt-4 text-sm text-gray-600 space-y-1">
              <p>Payment ID: {paymentId}</p>
              <p>Reference: {token}</p>
            </div>

            <button
              onClick={() => (window.location.href = "/")}
              className="mt-6 w-full bg-green-500 text-white h-12 rounded-xl"
            >
              Go to Home
            </button>
          </>
        )}

        {/* ❌ ERROR */}
        {status === "error" && (
          <>
            <div className="text-5xl mb-3">❌</div>
            <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>

            <p className="text-gray-500 mt-2">{message}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 w-full bg-red-500 text-white h-12 rounded-xl"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
