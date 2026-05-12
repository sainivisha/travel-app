import BookingForm from "./BookingForm";
import BookingSteps from "./BookingSteps";
import BookingSummary from "./BookingSummary";

export default function BookingLayout({ trip, searchParams }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-10">
        {/* 🔥 STEP INDICATOR */}
        <BookingSteps currentStep={1} />

        <h1 className="text-3xl font-bold text-gray-900">
          Complete Your Booking ✨
        </h1>
        <p className="text-gray-500 mt-1">
          Just a few steps away from your trip
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <BookingSummary trip={trip} searchParams={searchParams} />

        <div className="md:col-span-2">
          <div className="rounded-3xl p-8 bg-white/70 backdrop-blur-xl border shadow">
            <BookingForm trip={trip} searchParams={searchParams} />
          </div>
        </div>
      </div>
    </div>
  );
}
