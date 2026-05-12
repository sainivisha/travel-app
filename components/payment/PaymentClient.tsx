"use client";

import { useEffect, useState } from "react";
import BookingTimer from "@/components/BookingTimer";
import PaymentSection from "@/components/PaymentSection";

export default function PaymentClient({ bookingId }: any) {
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/bookings/${bookingId}`)
      .then((res) => res.json())
      .then(setBooking);
  }, [bookingId]);

  if (!booking) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* ⏱️ TIMER */}
      <BookingTimer initialSeconds={30 * 60} />

      {/* 📄 SUMMARY */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-sm text-gray-500">Ref: {booking.bookingReference}</p>

        <h2 className="text-xl font-semibold">{booking.bookableName}</h2>

        <p className="text-gray-500">Total: ₹{booking.pricing.grandTotal}</p>
      </div>

      {/* 💳 PAYMENT */}
      <PaymentSection
        total={booking.pricing.grandTotal}
        bookingId={booking.id}
      />
    </div>
  );
}
