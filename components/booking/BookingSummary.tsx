"use client";

import { format } from "date-fns";
import { useSearchParams } from "next/navigation";

type Props = {
  trip: any;
};

export default function BookingSummary({ trip }: Props) {
  const params = useSearchParams();

  const start = params.get("start");
  const end = params.get("end"); // optional if you want range
  const guests = Number(params.get("pax") || 1);

  const startDate = start ? new Date(start) : null;
  const endDate = end ? new Date(end) : null;

  const price =
    trip?.price?.priceCategories?.[0]?.salePrice ||
    trip?.price?.priceCategories?.[0]?.price ||
    0;

  const total = price * guests;

  const image =
    trip?.gallery?.images?.[0]?.url ||
    "https://images.unsplash.com/photo-1605538883669-8254c1d0a6b0";

  return (
    <div className="md:col-span-1">
      <div className="sticky top-24 space-y-6">
        <div className="rounded-3xl overflow-hidden bg-white/70 backdrop-blur-xl border border-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
          {/* IMAGE */}
          <div className="h-52 overflow-hidden">
            <img src={image} className="w-full h-full object-cover" />
          </div>

          {/* CONTENT */}
          <div className="p-5 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {trip?.title}
            </h2>

            <div className="space-y-3 text-sm">
              {/* DATE */}
              <div className="flex justify-between text-gray-500">
                <span>Date</span>
                <span className="font-medium text-gray-900">
                  {startDate ? format(startDate, "MMM d, yyyy") : "-"}
                </span>
              </div>

              {/* OPTIONAL RANGE */}
              {endDate && (
                <div className="flex justify-between text-gray-500">
                  <span>End</span>
                  <span className="font-medium text-gray-900">
                    {format(endDate, "MMM d, yyyy")}
                  </span>
                </div>
              )}

              {/* GUESTS */}
              <div className="flex justify-between text-gray-500">
                <span>Guests</span>
                <span className="font-medium text-gray-900">{guests}</span>
              </div>
            </div>

            {/* TOTAL */}
            <div className="border-t pt-4 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-sky-600">₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
