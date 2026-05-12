"use client";

import { useRouter } from "next/navigation";

interface MobileBookingBarProps {
  slug: string;
  basePrice: number;
}

export default function MobileBookingBar({ slug, basePrice }: MobileBookingBarProps) {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-white/30 p-4 flex justify-between md:hidden">
      <span className="font-semibold">₹{basePrice}</span>
      <button
        onClick={() => router.push(`/booking?trip=${slug}`)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Book Now
      </button>
    </div>
  );
}
