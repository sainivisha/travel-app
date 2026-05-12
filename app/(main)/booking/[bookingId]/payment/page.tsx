import BookingSteps from "@/components/booking/BookingSteps";
import BookingTimer from "@/components/booking/BookingTimer";
import PaymentSection from "@/components/booking/PaymentSection";

export default async function Page({ params }: any) {
  const { bookingId } = await params;

  const res = await fetch(`http://localhost:3000/api/bookings/${bookingId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch booking");
  }

  const booking = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      {/* 🔥 HEADER (FULL WIDTH) */}
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-4">
        <BookingSteps currentStep={2} />

        <h1 className="text-3xl font-bold text-gray-900 mt-4">
          Complete Your Payment 💳
        </h1>
        <p className="text-gray-500 mt-1">
          Secure your booking before it expires
        </p>
      </div>

      {/* ⏱️ TIMER */}
      <div className="max-w-5xl mx-auto px-4 mb-6">
        <BookingTimer initialSeconds={30 * 60} />
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="max-w-5xl mx-auto px-4 pb-10 grid md:grid-cols-2 gap-6">
        {/* 🔥 LEFT — BOOKING SUMMARY */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.1)] border space-y-5">
          {/* TITLE */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {booking.bookableName}
            </h2>
            <p className="text-sm text-gray-500">
              Ref: {booking.bookingReference}
            </p>
          </div>

          {/* STATUS */}
          <div className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            {booking.status.replace("_", " ")}
          </div>

          {/* DETAILS */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Dates</span>
              <span className="font-medium text-gray-900">
                {booking.serviceStartDate} → {booking.serviceEndDate}
              </span>
            </div>

            <div className="flex justify-between text-gray-500">
              <span>Guests</span>
              <span className="font-medium text-gray-900">
                {booking.unitsReserved}
              </span>
            </div>
          </div>

          {/* PARTICIPANT */}
          <div className="border-t pt-4">
            <p className="text-xs text-gray-400 mb-2">Primary Traveller</p>
            <p className="text-sm font-medium text-gray-900">
              {booking.participants?.[0]?.fullName}
            </p>
            <p className="text-xs text-gray-500">
              {booking.participants?.[0]?.email}
            </p>
          </div>

          {/* PRICE */}
          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>₹{booking.pricing.subtotal}</span>
            </div>

            <div className="flex justify-between text-gray-500">
              <span>Taxes</span>
              <span>₹{booking.pricing.taxAmount}</span>
            </div>

            <div className="flex justify-between text-gray-500">
              <span>Discount</span>
              <span>-₹{booking.pricing.discountAmount}</span>
            </div>

            <div className="border-t pt-3 flex justify-between items-center">
              <span className="text-gray-700 font-medium">Total</span>
              <span className="text-2xl font-bold text-sky-600">
                ₹{booking.pricing.grandTotal}
              </span>
            </div>
          </div>

          {/* TRUST */}
          <div className="text-xs text-gray-500 flex justify-between border-t pt-4">
            <span>🔒 Secure</span>
            <span>⚡ Instant Confirm</span>
            <span>📞 Support</span>
          </div>
        </div>

        {/* 💳 RIGHT — PAYMENT */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.1)] border">
          <PaymentSection
            total={booking.pricing.grandTotal}
            bookingId={booking.id}
          />
        </div>
      </div>
    </div>
  );
}
