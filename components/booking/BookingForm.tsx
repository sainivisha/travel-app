"use client";

import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useSearchParams, useRouter } from "next/navigation";

export default function BookingForm({ trip }: any) {
  const router = useRouter();
  const params = useSearchParams();

  const guests = Number(params.get("pax") || 1);
  const selectedStartParam = params.get("start");

  const selectedStart = selectedStartParam
    ? new Date(selectedStartParam).toISOString().split("T")[0]
    : null;

  const selectedDeparture =
    trip?.dates?.fixedDepartures?.find(
      (d: any) => d.startDate === selectedStart,
    ) || trip?.dates?.fixedDepartures?.[0];

  const [form, setForm] = useState({ name: "", email: "" });
  const [phone, setPhone] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const isValid = form.name?.trim() && form.email?.trim() && phone;

  const bookingPayload = selectedDeparture && {
    bookableType: "TRIP",
    bookableId: trip.id,
    bookableCode: trip.tripCode,
    bookableName: trip.title,
    businessLine: "TRAVEL",
    salesChannel: "WEB",
    serviceStartDate: selectedDeparture.startDate,
    serviceEndDate: selectedDeparture.endDate,
    unitsReserved: guests,
    pricing: {
      currency: "USD",
      subtotal: 150,
    },
    participants: [
      {
        participantId: "PAX-1",
        fullName: form.name,
        email: form.email,
        category: "ADULT",
      },
    ],
  };

  const handleContinue = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error("Booking failed");

      router.push(`/booking/${data.id}/payment`);
    } catch (err) {
      alert("Booking failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Traveller Details
        </h2>
        <p className="text-sm text-gray-500">
          Enter your details to secure your booking
        </p>
      </div>

      {/* FORM GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* NAME */}
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Full Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="John Doe"
            className="
              w-full px-4 py-3 rounded-xl border border-gray-200
              focus:outline-none focus:ring-2 focus:ring-sky-500
              transition-all duration-200
              bg-white/80 backdrop-blur
            "
          />
        </div>

        {/* EMAIL */}
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Email Address</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="john@email.com"
            className="
              w-full px-4 py-3 rounded-xl border border-gray-200
              focus:outline-none focus:ring-2 focus:ring-sky-500
              transition-all duration-200
              bg-white/80 backdrop-blur
            "
          />
        </div>
      </div>

      {/* PHONE */}
      <div className="space-y-1">
        <label className="text-sm text-gray-600">Phone Number</label>
        <div className="rounded-xl border border-gray-200 px-4 py-3 bg-white/80 backdrop-blur focus-within:ring-2 focus-within:ring-sky-500 transition">
          <PhoneInput
            international
            defaultCountry="IN"
            value={phone}
            onChange={setPhone}
            className="w-full outline-none"
          />
        </div>
      </div>

      {/* TRUST BAR */}
      <div className="flex items-center justify-between text-xs text-gray-500 bg-gray-50 px-4 py-3 rounded-xl">
        <span>🔒 Secure booking</span>
        <span>⚡ Instant confirmation</span>
        <span>📞 24/7 support</span>
      </div>

      {/* CTA */}
      <button
        onClick={handleContinue}
        disabled={!isValid || loading}
        className={`
    w-full h-14 rounded-2xl font-semibold text-lg
    transition-all duration-300
    ${
      isValid
        ? "bg-sky-500 text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-lg hover:shadow-xl active:scale-[0.98]"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }
  `}
      >
        {loading ? "Processing..." : "Continue to Payment →"}
      </button>

      {/* FOOTNOTE */}
      <p className="text-xs text-center text-gray-400">
        By continuing, you agree to our Terms & Privacy Policy
      </p>
    </div>
  );
}
