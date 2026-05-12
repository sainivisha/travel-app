"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();

  // PayPal usually sends token; your system also needs paymentId
  const paymentId = params.get("paymentId");
  const token = params.get("token"); // PayPal token (optional depending on backend)

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"success" | "error">("success");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const capture = async () => {
      try {
        if (!paymentId) {
          throw new Error("Missing paymentId");
        }

        const res = await fetch(`/api/payments/paypal/${paymentId}/capture`, {
          method: "POST",
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result?.message || "Capture failed");
        }

        console.log("✅ Capture success:", result);
        setData(result);
        setStatus("success");
      } catch (err) {
        console.error(err);
        setStatus("error");
      } finally {
        setLoading(false);
      }
    };

    capture();
  }, [paymentId, token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
      <div className="bg-white p-8 rounded-3xl shadow-lg text-center max-w-md w-full">
        {loading && <p>Processing payment...</p>}

        {!loading && status === "success" && (
          <>
            <h1 className="text-2xl font-bold text-green-600">
              Payment Successful 🎉
            </h1>
            <p className="text-gray-500 mt-2">Your booking is confirmed.</p>

            <div className="mt-4 text-sm text-gray-600">
              <p>Payment ID: {paymentId}</p>
              <p>Amount: {data?.capturedAmount}</p>
            </div>
          </>
        )}

        {!loading && status === "error" && (
          <>
            <h1 className="text-2xl font-bold text-red-600">
              Payment Failed ❌
            </h1>
            <p className="text-gray-500 mt-2">
              Something went wrong. Please try again.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
